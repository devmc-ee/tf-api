export default () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
      `${process.env.NODE_ENV} is invalid environment for tests!`,
    );
  }
};
