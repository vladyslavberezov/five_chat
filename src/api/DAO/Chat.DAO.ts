import apiService, { IAPIService } from '../APIService'

class ChatDAO {
  public public
  prefix = '/v1/chat'

  constructor(private api: IAPIService) {
    this.public = {
      create: (data: any) => this.api.post(`${this.prefix}`, data)
    }
  }
}

const DAO = new ChatDAO(apiService)

export default DAO.public
