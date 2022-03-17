const getCustomOptions = (object: any, key: any) => {
  return {
    label: object[key],
    value: key,
  };
};

export default getCustomOptions;
