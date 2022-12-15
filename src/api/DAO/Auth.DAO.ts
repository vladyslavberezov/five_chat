import apiService, { IAPIService } from '../APIService'
import { TLoginReqDTO } from 'src/api/DTO/AuthDTO/Login.req.dto'

export type TAuthDAOQueries = {
  login: (data: TLoginReqDTO) => Promise<void>;
};

class AuthDAO {
  public public: TAuthDAOQueries;

  private prefix = '/v1/auth'

  constructor(private api: IAPIService) {
    this.public = {
      login: async (data: TLoginReqDTO): Promise<void> => {
        // TODO: use DTO instead of any
        const res = await this.api.post<any>(`${this.prefix}/signin`, data, { isPublic: true })
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
