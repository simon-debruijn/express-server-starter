const hellos = [{ hello: 'world' }];

export function getHello() {
  return hellos.find((item) => item.hello === 'world');
}

export function getForbidden() {
  return 'You were granted access';
}
