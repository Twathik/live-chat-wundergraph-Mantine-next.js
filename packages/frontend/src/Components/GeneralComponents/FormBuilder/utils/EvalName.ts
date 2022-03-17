/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EvalNamePayload {
  error: string | undefined;
  touched: boolean;
  display: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EvalNameFunction = (name: string, errors: any, touchedFields: any): EvalNamePayload => {
  let error: string | undefined;
  let touched: any = false;
  let display = false;
  const EvalName = name.split('.', 2);

  if (EvalName.length > 1) {
    error = errors[EvalName[0]]
      ? errors[EvalName[0]][EvalName[1]]
        ? errors[EvalName[0]][EvalName[1]]
        : undefined
      : undefined;

    touched = touchedFields[EvalName[0]]
      ? touchedFields[EvalName[0]][EvalName[1]]
        ? touchedFields[EvalName[0]][EvalName[1]]
        : false
      : false;
  } else {
    error = errors[name!] ? errors[name!] : undefined;
    touched = touchedFields[name!] ? errors[name!] : false;
  }
  if (error && touched) display = true;
  return {
    error,
    touched,
    display,
  };
};

export default EvalNameFunction;
