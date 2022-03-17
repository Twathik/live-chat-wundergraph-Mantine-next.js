/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mantine/core';

export interface FormikContainerProps {
  buttonAction: string;
}

const FormikContainer: FC<FormikContainerProps> = (props) => {
  const initialValues = {};
  const validationSchema = Yup.object({});
  const onSubmit = (values: any) => console.log('form data', values);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, submitForm }) => (
        <Form>
          <Button
            type="submit"
            fullWidth
            variant="filled"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            {props.buttonAction}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
