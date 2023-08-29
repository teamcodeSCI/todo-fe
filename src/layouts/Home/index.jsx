import React, { useEffect } from 'react';
import style from './home.module.scss';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserAPI } from '@/features/auth/authApi';
import { currentUserSelector, loadedAuthSelector, loadingAuthSelector } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLoading = useSelector(loadingAuthSelector);
  const userLoaded = useSelector(loadedAuthSelector);
  const currentUser = useSelector(currentUserSelector);
  if (currentUser === undefined) {
    localStorage.clear();
  }
  useEffect(() => {
    dispatch(getUserAPI(localStorage.getItem('token')));
  }, [dispatch]);

  return (
    <div className={style['home']}>
      {userLoading && <Loading />}
      {userLoaded && (
        <>
          <Sidebar />
          <main>
            {location.pathname.split('/')[1] === 'table' && <Header />}
            <div className={style['main']}>
              <Outlet />
            </div>
          </main>
        </>
      )}
      {currentUser === undefined && <Navigate to={'/auth'} />}
    </div>
  );
};

export default Home;
