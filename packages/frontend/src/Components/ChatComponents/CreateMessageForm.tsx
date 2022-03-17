import { Button, Card, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNotifications } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import React from 'react';
import { useMutation } from '../../../wunderClient/hooks';
import AppTextInput from '../GeneralComponents/Inputs/TextInput';

const CreateMessageForm = () => {
  const { mutate: createMessage } = useMutation.CreateMessage({
    refetchMountedQueriesOnSuccess: true,
  });
  const notifications = useNotifications();

  const form = useForm({
    initialValues: {
      message: '',
    },
  });
  async function onSubmit(values: typeof form.values) {
    try {
      await createMessage({
        input: { ...values },
      });
      form.reset();
    } catch (error) {
      notifications.showNotification({
        title: 'Erreur',
        message: 'update failed!',
        color: 'red',
        icon: <Cross1Icon />,
        autoClose: true,
        radius: 'lg',
      });
    }
  }
  return (
    <Card shadow="lg" style={{ marginTop: 10, backgroundColor: '#a3c4f3' }}>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <AppTextInput
          required
          label="Message"
          placeholder="tap something"
          {...form.getInputProps('message')}
        />

        <Group position="right" mt="md">
          <Button type="submit" color="violet">
            Submit
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default CreateMessageForm;
