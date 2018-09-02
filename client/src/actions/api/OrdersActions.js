import Api from 'actions/Api';

class OrdersApi extends Api {
    getAllOrders() {
        return this.get('');
    }
}

export default new OrdersApi('ORDERS_API', 'api/orders');
