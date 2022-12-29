import apiService, {IAPIService} from '../APIService'
import {TSignUpReqDTO} from "../DTO/UserDTO/SignUp.req.dto";

class UsersDAO {
    public public
    prefix = '/v1/users'

    constructor(private api: IAPIService) {
        this.public = {
            getAll: () => this.api.get(`${this.prefix}`),
            getMe: () => this.api.get(`${this.prefix}/me`),
            getUserContacts: (id: string) => this.api.get(`${this.prefix}/${id}/contacts`),
            getUserChats: (id: string) => this.api.get(`${this.prefix}/${id}/chats`),
            signUp: async (data: TSignUpReqDTO): Promise<void> => {
                const res = await this.api.post<any>(`${this.prefix}/`, data, {isPublic: true})
                if (!res?.data) return
                return res.data;
            },
        }
    }
}

const DAO = new UsersDAO(apiService)

export default DAO.public
