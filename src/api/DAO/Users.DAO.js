import apiService from '../APIService'

class UsersDAO {
  api
  prefix = '/v1/users'

  constructor(api) {
    this.api = api

    this.public = {
      getAll: () => this.api.get(`${this.prefix}`),
      getMe: () => this.api.get(`${this.prefix}/me`),
    }
  }
}

const DAO = new UsersDAO(apiService)

export default DAO.public
