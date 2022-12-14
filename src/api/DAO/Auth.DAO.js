import apiService from '../APIService'

class AuthDAO {
  api

  prefix = '/v1/auth'

  constructor(api) {
    this.api = api

    this.public = {
      login: async (data) => {
        const res = await this.api.post(`${this.prefix}/signin`, data, { isPublic: true })
        if (!res?.data) return

        this.api.authData.set({
          accessToken: res.data.data.accessToken,
          accessExpiresIn: res.data.data.expiresIn,
        })
      },
    }
  }
}

const DAO = new AuthDAO(apiService)

export default DAO.public
