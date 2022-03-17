/* eslint-disable @typescript-eslint/no-explicit-any */

interface formSections {
  exclude?: any[];
  include?: any[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const GetInitialValues = (config: any, Sections: formSections): any => {
  const initialValues: any = {};
  config.forEach((e: any) => {
    const EvalName = e.name.split('.', 2);
    if (Sections) {
      if (Sections.exclude && Sections.exclude?.length > 0) {
        if (Sections.exclude?.includes(e.section)) {
          return;
        }
      }
      if (Sections.include && Sections.include?.length > 0) {
        if (!Sections.include.includes(e.section)) {
          return;
        }
      }
    }

    if (EvalName.length > 1) {
      if (!initialValues[EvalName[0]]) {
        initialValues[EvalName[0]] = {};
      }
      initialValues[EvalName[0]][EvalName[1]] = e.initialValue;
    } else {
      initialValues[EvalName[0]] = e.initialValue;
    }
  });
  return initialValues;
};

export default GetInitialValues;
