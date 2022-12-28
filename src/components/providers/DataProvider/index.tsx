import * as React from 'react';
import { useRecoilValue } from 'recoil'
import { userStore } from 'src/store';
import { useCreateSocket } from 'src/sockets/socket';
import apiService from 'src/api/APIService';


export default function DataProvider(props) {
  const { children } = props;
  const setUser = useRecoilValue(userStore);

  useCreateSocket('/', apiService.authData.get(), () => null);

  return children;
}
