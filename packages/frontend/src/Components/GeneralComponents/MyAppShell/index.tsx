import { Center, Container, Loader } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { FC, useState } from 'react';
import { useWunderGraph } from '../../../../wunderClient/hooks';
import AppHeader from './Header';
import AuthenticationForm from './Login';
// import DarkThemeToggle from './utils/DarkThemeToggle';
// import toggleMenu from './utils/toggleMenu';

const MyAppShell: FC = ({ children }) => {
  const { user, initialized } = useWunderGraph();
  const links = [
    {
      link: '/',
      label: 'Chat',
    },
    {
      link: '/profile',
      label: user?.name || '',
    },
    {
      link: '/logout',
      label: 'logout',
    },
  ];

  const [init, setInit] = useState(false);
  const [authenticated, setAuth] = useState(false);

  useShallowEffect(() => {
    if (initialized) {
      setInit(true);
      if (user) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  }, [initialized, user]);

  return (
    <>
      {init ? (
        <>
          {authenticated ? (
            <>
              <AppHeader links={links} />
              <Container>{children}</Container>
            </>
          ) : (
            <Center style={{ height: '100vh' }}>
              <AuthenticationForm />
            </Center>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyAppShell;
