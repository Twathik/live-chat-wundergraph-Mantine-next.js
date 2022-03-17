/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC } from 'react';
import { Field } from 'formik';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';
import { Radio, RadioGroup, RadioGroupProps } from '@mantine/core';

export interface RadioComponentProps {
  data?: {
    value: string;
    label: string;
  }[];
}

const RadioComponent: FC<RadioGroupProps & RadioComponentProps> = (props) => {
  const { label, name, data, ...otherProps } = props;
  return (
    <div>
      <Field name={name}>
        {({ form, field }: { form: any; field: any }) => {
          const { errors, touched } = form;
          const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
          return (
            <RadioGroup
              label={label}
              name={name}
              {...field}
              {...otherProps}
              required
              error={errorPayload.error && errorPayload.touched ? errorPayload.error : ''}
            >
              {data?.map((d) => (
                <Radio value={d.value}>{d.label}</Radio>
              ))}
            </RadioGroup>
          );
        }}
      </Field>
    </div>
  );
};

export default RadioComponent;
