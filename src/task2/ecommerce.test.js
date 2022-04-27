import { fetchOrderById } from "../api";
import {
    fetchAllOrders,
    bucketOrdersByUsers,
    getLast2WeeksOrders,
    bucketOrdersByDate,
    getDaysAgoTimeStamp,
} from "./ecommerce.js";

const ORDER_ID = "70ef599e5eca171b2bce84d1"
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});

describe('Ecommerce - orders', () => {
    describe('fetchAllOrders', () => {
        it('has fetchAllOrders method', async () => {
            expect(fetchAllOrders).toBeDefined()
        })
        test('the response to be array', async () => {
            const orders = await fetchAllOrders()
            expect(Array.isArray(orders)).toEqual(true)
        })
    })

    describe('bucketOrdersByUsers', () => {
        it('has bucketOrdersByUsers method', async () => {
            expect(bucketOrdersByUsers).toBeDefined()
        })
        it('returns object of userIds', async () => {
            const orders = await fetchAllOrders()
            const ordersByUsers = await bucketOrdersByUsers()

            const singleOrder = orders[0]

            expect(ordersByUsers).toHaveProperty(singleOrder.userId)
            expect(Array.isArray(ordersByUsers[singleOrder.userId])).toEqual(true)
        })
    })

    describe('getLast2WeeksOrders', () => {
        it('has getLast2WeeksOrders method', async () => {
            expect(getLast2WeeksOrders).toBeDefined()
        })
        test('orders to do not to be older than 2 weeks', async () => {
            const orders = await getLast2WeeksOrders()
            const twoWeeksAgoTimestamp = getDaysAgoTimeStamp(14)
            orders.forEach(order => {
                expect(order.timestamp).toBeGreaterThan(twoWeeksAgoTimestamp)
            })
        })
    })

    describe('bucketOrdersByDate', () => {
        it('has bucketOrdersByDate method', async () => {
            expect(bucketOrdersByDate).toBeDefined()
        })
        test('', async () => {
            const orderByDate = await bucketOrdersByDate()
            const [firstDate, firstDateOrders] = Object.entries(orderByDate)[0]
            const [firstDateOrder] = firstDateOrders;

            expect(Array.isArray(firstDateOrders)).toEqual(true)
            expect(String(new Date(firstDateOrder.timestamp).getDate())).toEqual(firstDate)
        })
    })
})
