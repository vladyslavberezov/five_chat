class AuthData {
  #accessToken

  #accessExpiresIn

  isEmpty = () => {
    return !Boolean(this.#accessToken)
  }

  set = ({ accessToken, accessExpiresIn }) => {
    console.log(accessToken, accessExpiresIn)
    this.#accessToken = accessToken
    this.#accessExpiresIn = accessExpiresIn
  }

  get = () => {
    return {
      accessToken: this.#accessToken,
      expiresIn: this.#accessExpiresIn,
    }
  }
}

export default AuthData