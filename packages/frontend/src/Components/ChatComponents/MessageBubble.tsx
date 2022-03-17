import React from 'react';
import { Grid, Paper, Text } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import { GetMessagesResponseData } from '../../../wunderClient/models';
import { User } from '../../../wunderClient/client';

interface ChatComponentProps {
  message: GetMessagesResponseData['usersDb_findManyChat'][number] | null;
  user: User | undefined;
}
const MessageBubble = ({ message, user }: ChatComponentProps): React.ReactElement => (
  <Grid style={{ width: '90%' }}>
    {user?.user_id === message?.User.userId && <Grid.Col sm={4} />}
    <Grid.Col sm={8}>
      <Paper
        m={5}
        radius="lg"
        p={5}
        style={{ backgroundColor: user?.user_id === message?.User.userId ? '#a3c4f3' : '#90dbf4' }}
      >
        <Text size="md">{`${message?.User.firstName} : ${message?.message}`}</Text>
        {message?.createdAt && (
          <Text size="xs">{format(parseISO(message.createdAt), 'dd-MM-yy HH:mm')}</Text>
        )}
      </Paper>
    </Grid.Col>
    {user?.user_id !== message?.User.userId && <Grid.Col sm={4} />}
  </Grid>
);

export default MessageBubble;
