import { useEffect } from "react";
import { UsersDAO } from "src/api/DAO";
import apiService from "src/api/APIService";
import { useSetRecoilState } from "recoil";
import { chatStore, contactStore, userStore } from "src/store";
import { useRouter } from "next/router";

export function useGetData() {
  const router = useRouter()
  const setUser = useSetRecoilState(userStore)
  const setContacts = useSetRecoilState(contactStore)
  const setChats = useSetRecoilState(chatStore)

  useEffect(() => {
    async function fetchData() {
      const usersRes = await UsersDAO.getMe()
      const userData = usersRes?.data?.data;
      if (!userData) {
        // TODO: show toast with error
        return;
      }
      setUser(userData)
      const [contactsRes, chatsRes] = await Promise.all([
        UsersDAO.getUserContacts(userData.id),
        UsersDAO.getUserChats(userData.id),
      ]);
      setContacts(contactsRes.data.data)
      setChats(chatsRes.data.data)
    }

    if (apiService.authData.isEmpty()) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [])
}