import { atom } from 'recoil'

export const chatStore = atom({
  key: 'chatStore',
  default: [],
})
export const activeChatStore = atom({
  key: 'activeChatStore',
  default: null,
})
