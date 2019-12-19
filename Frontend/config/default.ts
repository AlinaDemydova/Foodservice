import { Config } from './types';

const defaultConfig: Config = {
  lStorageCartName: 'mealsInCart',
  payMethods: ['Card', 'Cash'],
  clientMenuURI: '/client/menu',
  clientCartURI: '/client/cart',
  adminMenuURI: '/admin/menulist/',
  adminEmployeesURI: '/admin/employees/',
  staffOrdersQueueURI: '/staff/ordersqueue/'

};


export default defaultConfig;
