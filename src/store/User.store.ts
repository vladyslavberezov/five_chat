import { atom } from 'recoil'

export const userStore = atom({
  key: 'userStore',
  default: null,
})
export const contactStore = atom({
  key: 'contactStore',
  default: null,
})
