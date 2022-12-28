import { useEffect } from 'react';
import socketIO, { Socket } from 'socket.io-client';

const instances = new Map<string, Socket>();

type TSocketEventHandler = (data: unknown, socket: Socket) => void;

/**
 * connectSocket func
 * @param {string} url - namespace url
 * @param {any} auth
 * @param {(socket: Socket) => void} onConnectionHandler
 * @return socket disconnect function
 */
export function connectSocket(url: string, auth: any, onConnectionHandler?: (socket: Socket) => void) {
  instances.set(url, null);

  if (auth) {
    const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
    const socket = socketIO(`${protocol}://${process.env.API_HOST}${url}`, {
      secure: process.env.NODE_ENV === 'production',
      // auth: {accessToken: auth.accessToken, refreshToken: auth.refreshToken},
      extraHeaders: { authorization: `Bearer ${auth.accessToken}` },
    });
    instances.set(url, socket);

    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('socket:connect');

      if (onConnectionHandler) {
        // rejoin the active chat if connection has lost
        onConnectionHandler(socket);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('connect_error', async (err: any) => {
      // eslint-disable-next-line no-console
      console.error('socket:connect_error:', err);
      // err.data?.needsRefresh
    });
    socket.on('socket_error', (err) => {
      // eslint-disable-next-line no-console
      console.error('socket_error:', err);
    });

    return socket.disconnect;
  }

  return () => null;
}

/**
 * reconnectSockets func - reconnecting sockets when a new refresh token got
 * @param {any} auth
 * @param {(socket: Socket) => void} onConnectionHandler
 */
export function reconnectSockets(auth: any, onConnectionHandler?: (socket: Socket) => void) {
  instances.forEach((socket, key) => {
    if (socket) {
      socket.disconnect();
    }
    connectSocket(key, auth, onConnectionHandler);
  });
}

/**
 * useCreateSocket react hook - connecting to the socket namespace
 * @param {string} url
 * @param {any} auth
 * @param {(socket: Socket) => void} onConnectionHandler
 */
export function useCreateSocket(url: string, auth: any, onConnectionHandler: (socket: Socket) => void) {
  useEffect(() => {
    connectSocket(url, auth, onConnectionHandler);
  }, [auth, url, onConnectionHandler]);
}

/**
 * useSocket react hook
 * @param {string} namespace
 * @return socket instance for specific namespace
 */
export function useSocket(namespace: string) {
  return instances.get(namespace);
}

/**
 * useSocketEvent react hook
 * @param {string} namespace
 * @param {string} event
 * @param {TSocketEventHandler} handler
 * @return socket instance for specific namespace
 */
export function useSocketEvent(
  namespace: string,
  event: string,
  handler: TSocketEventHandler,
) {
  useEffect(() => {
    const socket = instances.get(namespace);
    if (socket) {
      socket.on(event, (data) => handler(data, socket));
      return () => {
        socket.off(event);
      };
    }
    return () => null;
  }, [handler, event, namespace]);
}
