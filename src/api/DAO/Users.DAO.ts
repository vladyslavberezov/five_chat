import apiService, { IAPIService } from '../APIService'

class UsersDAO {
  public public
  prefix = '/v1/users'

  constructor(private api: IAPIService) {
    this.public = {
      getAll: () => this.api.get(`${this.prefix}`),
      getMe: () => this.api.get(`${this.prefix}/me`),
      getUserContacts: (id: string) => this.api.get(`${this.prefix}/${id}/contacts`),
      getUserChats: (id: string) => this.api.get(`${this.prefix}/${id}/chats`)
    }
  }
}

const DAO = new UsersDAO(apiService)

export default DAO.public
