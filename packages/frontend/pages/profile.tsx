import { Container, Paper } from '@mantine/core';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import MyAppShell from '../src/Components/GeneralComponents/MyAppShell';
import UpdateUserForm from '../src/Components/ProfilePage/UpdateUserForm';
import { Client } from '../wunderClient/client';
import { GetUserResponseData } from '../wunderClient/models';

interface ProfileProps {
  userData: GetUserResponseData['usersDb_findUniqueUser'] | null;
}
const Profile = ({ userData }: ProfileProps) => (
  <MyAppShell>
    <Container>
      <Paper style={{ height: '90vh' }}>
        <UpdateUserForm localUser={userData} />
      </Paper>
    </Container>
  </MyAppShell>
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const client = new Client({ extraHeaders: { cookie: req.headers.cookie || '' } });
  const userData = await client.query.GetUser({});
  if (userData.status === 'ok') {
    return {
      props: {
        userData: userData.body.data!.usersDb_findUniqueUser,
      },
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default Profile;
