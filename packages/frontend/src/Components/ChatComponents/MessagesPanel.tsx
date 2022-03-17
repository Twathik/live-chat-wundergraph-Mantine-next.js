import React, { useEffect, useRef, useState } from 'react';
import { Card, ScrollArea } from '@mantine/core';
import { GetMessagesResponseData } from '../../../wunderClient/models';
import { useLiveQuery, useWunderGraph } from '../../../wunderClient/hooks';
import MessageBubble from './MessageBubble';

type Messages = GetMessagesResponseData['usersDb_findManyChat'];

interface ChatComponentProps {
  serverSideMessages: Messages | null;
}
const MessagesPanel = ({ serverSideMessages }: ChatComponentProps): React.ReactElement => {
  const { user } = useWunderGraph();
  const { response: loadMessages } = useLiveQuery.GetMessages({ input: { skip: 0, take: -10 } });
  const [messages, setMessages] = useState<Messages>(
    (user !== undefined && serverSideMessages) || []
  );
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (loadMessages.status === 'ok') {
      setMessages(loadMessages.body.data?.usersDb_findManyChat || []);
      scrollToBottom();
    }
    if (loadMessages.status === 'requiresAuthentication') {
      setMessages([]);
    }
  }, [loadMessages, messages]);
  return (
    <Card shadow="lg" style={{ height: '60vh', backgroundColor: '#cfbaf0' }}>
      <ScrollArea style={{ height: '100%', padding: 20 }} type="auto" viewportRef={viewport}>
        {messages?.map((message) => (
          <MessageBubble key={message.id} message={message} user={user} />
        ))}
      </ScrollArea>
    </Card>
  );
};

export default MessagesPanel;
