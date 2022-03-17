import React from 'react';
import { Text, Paper, Group, PaperProps, Button } from '@mantine/core';
import { useWunderGraph } from '../../../../../wunderClient/hooks';

const AuthenticationForm = (props: PaperProps<'div'>) => {
  const {
    client: { login },
  } = useWunderGraph();

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Live chat, login with
      </Text>

      <Group grow mb="md" mt="md">
        {/*  <GithubButton radius="xl" onClick={() => login.github()}>
          Github
        </GithubButton> */}
        <Button radius="xl" onClick={() => login.keycloak()}>
          Local Auth Server
        </Button>
      </Group>
    </Paper>
  );
};

export default AuthenticationForm;
