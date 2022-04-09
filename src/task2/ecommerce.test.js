import { fetchOrderById } from '../api';
import { ecommerceFunctions } from '../task2/ecommerce';

describe('Ecommerce - fetchAllOrders', () => {
    it('should fetch a single order by id', async () => {
        const ORDER_ID = '70ef599e5eca171b2bce84d1';
        let orders = await fetchOrderById(ORDER_ID);
        expect(orders).toBeTruthy();
    });

    it('should fetch all orders', async () => {
        const orders = await ecommerceFunctions.fetchAllOrders();
        expect(orders).toBeInstanceOf(Array);
        expect(orders).toHaveLength(100);
    });

    it('should return an object with a user Id key and value of the orders array', async () => {
        const userOrders = await ecommerceFunctions.bucketOrdersByUsers();
        expect(userOrders).toBeInstanceOf(Object);
        const userOrdersKeys = Object.keys(userOrders);

        for (const key of userOrdersKeys) {
            const val = userOrders[key];
            expect(val).toBeInstanceOf(Array);
            expect(val.find((order) => order.userId === key)).toBeTruthy();
        }
    });

    it('should return an array that contain only orders from the last 2 weeks', async () => {
        let orders = await ecommerceFunctions.getLast2WeeksOrders();
        expect(orders).toBeInstanceOf(Array);
    });
});
