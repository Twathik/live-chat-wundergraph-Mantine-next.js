/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
import { FC } from 'react';
import { Field } from 'formik';
import { Switch, SwitchProps } from '@mantine/core';

const SwitchComponent: FC<SwitchProps> = (props) => {
  const { label, name, value, ...otherProps } = props;
  return (
    <div>
      <Field name={name}>
        {({ field }: { form: any; field: any }) => {
          return (
            <Switch label={label} name={name} id={name} value={value} {...otherProps} {...field} />
          );
        }}
      </Field>
    </div>
  );
};
export default SwitchComponent;
