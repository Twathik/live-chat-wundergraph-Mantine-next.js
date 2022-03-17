/* eslint-disable arrow-body-style */
import React from 'react';
import { Center, Grid } from '@mantine/core';
import { GetMessagesResponseData } from '../../../wunderClient/models';
import MessagesPanel from './MessagesPanel';
import CreateMessageForm from './CreateMessageForm';

interface ChatComponentProps {
  messages: GetMessagesResponseData['usersDb_findManyChat'] | null;
}
const ChatComponent = ({ messages }: ChatComponentProps): React.ReactElement => {
  return (
    <Center>
      <Grid style={{ width: '50vw' }}>
        <Grid.Col md={12}>
          <MessagesPanel serverSideMessages={messages} />
        </Grid.Col>
        <Grid.Col md={12}>
          <CreateMessageForm />
        </Grid.Col>
      </Grid>
    </Center>
  );
};

export default ChatComponent;
