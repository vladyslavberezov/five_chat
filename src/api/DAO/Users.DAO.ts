import apiService from '../APIService'

class UsersDAO {
  public public
  prefix = '/v1/users'

  constructor(private api) {
    this.public = {
      getAll: () => this.api.get(`${this.prefix}`),
      getMe: () => this.api.get(`${this.prefix}/me`),
    }
  }
}

const DAO = new UsersDAO(apiService)

export default DAO.public
