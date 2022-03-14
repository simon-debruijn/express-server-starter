const hellos = [{ hello: 'world' }];

export const getHello = () => {
  return hellos.find((item) => item.hello === 'world');
};

export const getForbidden = () => {
  return 'You were granted access';
};
