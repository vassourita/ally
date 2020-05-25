import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import DashboardHeader from '../DashboardHeader';
import DashboardNav from '../DashboardNav';

import * as UserActions from '../../store/modules/user/actions';
import api from '../../services/api';

import { Container, Page } from './styles';

function DashboardMain({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const id = useSelector(state => state.auth.id);

  useEffect(() => {
    if (!user.id)
      (async () => {
        try {
          const { status, data } = await api.get(`/employers/${id}`);

          if (status === 200) {
            dispatch(UserActions.setUser(data.user));
          }
        } catch {
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })();
  }, [dispatch, user, id]);

  return (
    <Container>
      <DashboardHeader />
      <DashboardNav />
      <Page>{children}</Page>
    </Container>
  );
}

export default DashboardMain;
