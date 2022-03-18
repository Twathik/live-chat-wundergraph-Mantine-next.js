import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import ChatComponent from '../src/Components/ChatComponents';
import MyAppShell from '../src/Components/GeneralComponents/MyAppShell';
import { Client } from '../wunderClient/client';
import { GetMessagesResponseData } from '../wunderClient/models';

interface HomePageProps {
  messages: GetMessagesResponseData['usersDb_findManyChat'] | null;
}

const HomePage = ({ messages }: HomePageProps) => (
  <MyAppShell>
    <ChatComponent messages={messages} />
  </MyAppShell>
);
export const getServerSideProps: GetServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const client = new Client({ extraHeaders: { cookie: req.headers.cookie || '' } });
    const messagesData = await client.query.GetMessages({ input: { skip: 0, take: -10 } });
    console.log({ messagesData });

    if (messagesData.status === 'ok') {
      return {
        props: {
          messages: messagesData.body.data!.usersDb_findManyChat,
        },
      };
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {},
    };
  }
};

export default HomePage;
