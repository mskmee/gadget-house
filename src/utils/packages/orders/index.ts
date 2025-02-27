import { OrdersApi } from './orders-api';
import { OrdersService } from './orders-service';

const ordersApi = new OrdersApi();
const ordersService = new OrdersService(ordersApi);

export { ordersService };
