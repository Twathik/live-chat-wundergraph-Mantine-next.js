/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { FieldInputProps } from 'formik/dist/types';
import { inputType } from '../inputs/InputType';
import {
  CheckboxProps,
  Grid,
  InputBaseProps,
  MultiSelectProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  TextInputProps,
} from '@mantine/core';
import InputComponent from '../inputs/inputComponent';
import TextAreaComponent from '../inputs/textAreaComponent';
import SelectComponent from '../inputs/selectComponent';
import RadioComponent, { RadioComponentProps } from '../inputs/radioComponent';
import CheckBoxComponent from '../inputs/checkBoxComponent';
import SwitchComponent from '../inputs/switchComponent';
import MultipleSelectInput from '../inputs/multipleSelectCompenent';
import { FormConfigType } from './formConfigInterface';
import DateComponent from '../inputs/dateComponent';
import { DatePickerProps } from '@mantine/dates';

interface FormikControlComponentProps {
  control: inputType;
}

type genericInput = FormikControlComponentProps;

function FormikControlComponent(props: genericInput & InputBaseProps): React.ReactElement;
function FormikControlComponent(props: genericInput & TextInputProps): React.ReactElement;
function FormikControlComponent(props: genericInput & SelectProps): React.ReactElement;
function FormikControlComponent(props: genericInput & CheckboxProps): React.ReactElement;
function FormikControlComponent(
  props: genericInput & RadioGroupProps & RadioComponentProps
): React.ReactElement;
function FormikControlComponent(props: genericInput & SwitchProps): React.ReactElement;
function FormikControlComponent(props: genericInput & DatePickerProps): React.ReactElement;
function FormikControlComponent(props: genericInput & MultiSelectProps): React.ReactElement;

function FormikControlComponent(props: genericInput & unknown) {
  const { control, ...otherProps } = props as genericInput & InputBaseProps;
  switch (control) {
    case inputType.input:
      return <InputComponent {...(otherProps as InputBaseProps)} />;
    case inputType.textarea:
      return <TextAreaComponent {...(otherProps as InputBaseProps)} />;
    case inputType.select:
      return <SelectComponent {...(otherProps as SelectProps)} />;
    case inputType.radio:
      return <RadioComponent {...(otherProps as RadioGroupProps & RadioComponentProps)} />;
    case inputType.checkbox:
      return <CheckBoxComponent {...(otherProps as CheckboxProps)} />;
    case inputType.switch:
      return <SwitchComponent {...(otherProps as SwitchProps)} />;
    case inputType.date:
      return <DateComponent {...(otherProps as DatePickerProps)} />;
    case inputType.multipleSelect:
      return <MultipleSelectInput {...(otherProps as MultiSelectProps)} />;
    default:
      return null;
  }
}

const GenerateFields = (
  config: FormConfigType[],
  getFieldProps: <Value = any>(props: any) => FieldInputProps<Value>
) => {
  return config
    .sort((a, b) => a.order - b.order)
    .map((e) => (
      <Grid.Col xs={12} sm={e.size} key={e.name}>
        <FormikControlComponent
          control={e.control}
          label={e?.label || ''}
          type={e.type}
          data={e.options ?? []}
          className={e.className}
          autoComplete={e.autoComplete}
          {...getFieldProps(e.name)}
        />
      </Grid.Col>
    ));
};

export default GenerateFields;
