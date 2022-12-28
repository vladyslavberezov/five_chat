import { atom } from 'recoil'

export const messagesStore = atom({
    key: 'messagesStore',
    default: [],
})
