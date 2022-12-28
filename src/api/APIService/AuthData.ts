export type TAuthObject = {
  accessToken: string;
  accessExpiresIn: string; // TODO: check a proper type
}

export interface IAuthData {
  isEmpty: () => boolean;
  set: (value: TAuthObject) => void;
  get: () => TAuthObject;
}

class AuthData implements IAuthData {
  private accessToken: string

  private accessExpiresIn: string

  public isEmpty = () => {
    return !Boolean(this.accessToken)
  }

  public set = ({ accessToken, accessExpiresIn }: TAuthObject) => {
    this.accessToken = accessToken
    this.accessExpiresIn = accessExpiresIn
  }

  get = () => {
    return {
      accessToken: this.accessToken,
      accessExpiresIn: this.accessExpiresIn,
    }
  }
}

export default AuthData