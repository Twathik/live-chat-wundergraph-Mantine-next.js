import React from 'react';
import { Avatar, Text, Button, Paper, Box, Group } from '@mantine/core';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { useNotifications } from '@mantine/notifications';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useMutation, useWunderGraph } from '../../../wunderClient/hooks';
import { S3Provider } from '../../../wunderClient/client';
import AppTextInput from '../GeneralComponents/Inputs/TextInput';
import { GetUserResponseData } from '../../../wunderClient/models';

interface UpdateUserFormProps {
  localUser: GetUserResponseData['usersDb_findUniqueUser'] | null;
}

const UpdateUserForm = ({ localUser }: UpdateUserFormProps): React.ReactElement => {
  const {
    user,
    client: { uploadFiles, mutation },
  } = useWunderGraph();

  const { mutate: updateUser } = useMutation.UpdateProfile({});
  const notifications = useNotifications();
  const form = useForm({
    initialValues: {
      firstName: localUser?.firstName || '',
      lastName: localUser?.lastName || '',
    },
  });

  const onDrop = async (files: File[]) => {
    try {
      if (!localUser) throw Error('Not authenticated');
      const formData = new FormData();
      if (!files) return;
      /* for (const key in Object.keys(files)) {
        formData.append('files', files[key]);
      } */
      formData.append('files', files[0]);
      const result = await uploadFiles({ provider: S3Provider.minio, formData });

      if (result.status === 'ok') {
        if (!result.body[0].key) throw Error('Not authenticated');
        await mutation.UpdateAvatarId({
          input: { avatarId: { set: result.body[0].key } },
        });
        notifications.showNotification({
          title: 'Success',
          message: 'The changes will take place on the next login!',
          color: 'green',
          icon: <CheckIcon />,
          autoClose: true,
          radius: 'lg',
        });
      }
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
  };
  const onReject = async () => {
    notifications.showNotification({
      title: 'Info',
      message: 'operation canceled!',
      color: 'blue',
      icon: <Cross1Icon />,
      autoClose: true,
      radius: 'lg',
    });
  };

  async function onSubmit(values: typeof form.values) {
    try {
      await updateUser({
        input: {
          lastName: { set: values.lastName },
          firstName: { set: values.firstName },
        },
      });

      notifications.showNotification({
        title: 'Success',
        message: 'The changes will take place on the next login!',
        color: 'green',
        icon: <CheckIcon />,
        autoClose: true,
        radius: 'lg',
      });
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
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Dropzone
        onDrop={onDrop}
        onReject={onReject}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        {() => (
          <Avatar
            src={`http://storage.live.chat.local/uploads/${user?.custom_claims?.avatarId ?? ''}`}
            size={120}
            radius={120}
            mx="auto"
          />
        )}
      </Dropzone>
      <Text align="center" color="dimmed" size="sm">
        Click on the avatar to upload a new one, your avatar will change on the next login
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {localUser?.email}
      </Text>

      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <AppTextInput
            required
            label="FirstName"
            placeholder="your first name"
            {...form.getInputProps('firstName')}
          />
          <AppTextInput
            required
            label="LastName"
            placeholder="your last name"
            {...form.getInputProps('lastName')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Paper>
  );
};

export default UpdateUserForm;
