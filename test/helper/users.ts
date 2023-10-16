import { RoleType } from '../../src/constants/role-type';

export const newUser = () => {
  let user = {
    firstName: 'first name',
    lastName: 'cooperation',
    email: 'email@gmail.com',
    password: 'password',
    phone: '03023412345',
    role: RoleType.ADMIN,
    id: '',
    avatar: 'testimage',
  };
  return user;
};

export const logUser = () => {
  let user = {
    email: 'email@gmail.com',
    password: 'password',
  };
  return user;
};

export const cat = () => {
  let user = {
    name: 'category',
  };
  return user;
};
