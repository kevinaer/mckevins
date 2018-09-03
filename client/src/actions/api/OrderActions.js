import Api from 'actions/Api';

class OrderApi extends Api {
    getCart(userId) {
        return this.get(`cart/${userId}`);
    }
    updateCart(userId, cart) {
        return this.post(`cart/${userId}`, { cart });
    }
    placeOrder(userId) {
        return this.post(`cart/${userId}/place`);
    }
    finishOrder(orderId) {
        return this.post(`${orderId}/done`);
    }
}

export default new OrderApi('ORDER_API', 'api/order');
