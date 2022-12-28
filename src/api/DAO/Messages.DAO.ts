import apiService, { IAPIService } from '../APIService'

class MessagesDAO {
  public public
  prefix = '/v1/chat'

  constructor(private api: IAPIService) {
    this.public = {
      getMessages: (id: any) => this.api.get(`${this.prefix}/${id}/messages`),
      // getUserContacts: (id: string) => this.api.get(`${this.prefix}/${id}/contacts`),
      // getUserChats: (id: string) => this.api.get(`${this.prefix}/${id}/chats`)
    }
  }
}

const DAO = new MessagesDAO(apiService)

export default DAO.public
