import { fetchOrderById } from "../api";
import { getTimestampByDaysAgo } from '../api/utils'
import {
    fetchAllOrders,
    bucketOrdersByUsers,
    getLast2WeeksOrders,
    bucketOrdersByDate,
} from "./ecommerce.js";

const ORDER_ID = "70ef599e5eca171b2bce84d1"
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});

describe('getTimestampByDaysAgo', () => {
    it('getTimestampByDaysAgo api/utils function', async () => {
        expect(getTimestampByDaysAgo).toBeDefined()
    })
    test('check get timestamp by days differ', async () => {
        const date = new Date()
        const weekAgo = getTimestampByDaysAgo(7 ,date)

        const daysAgo = new Date(date.getTime());
        daysAgo.setDate(date.getDate() - 7);
        const weekAgoTimestamp = daysAgo.valueOf()

        expect(weekAgoTimestamp).toEqual(weekAgo)
    })
})

describe('Ecommerce - orders', () => {
    describe('fetchAllOrders', () => {
        it('fetchAllOrders function', async () => {
            expect(fetchAllOrders).toBeDefined()
        })
        test('fetch orders to array', async () => {
            const orders = await fetchAllOrders()
            expect(Array.isArray(orders)).toEqual(true)
        })
    })

    describe('bucketOrdersByUsers', () => {
        it('bucketOrdersByUsers function', async () => {
            expect(bucketOrdersByUsers).toBeDefined()
        })
        test('result: {key: userId, value: order}', async () => {
            const orders = await fetchAllOrders()
            const ordersByUsersObj = await bucketOrdersByUsers()

            for (const [userId, orderWithoutUserId] of Object.entries(ordersByUsersObj)) {
                const matchOrder = orders.find(order => order.userId === userId)
                expect(matchOrder).toBeDefined(true)

                const isMatchObj = JSON.stringify(matchOrder) === JSON.stringify({ ...orderWithoutUserId, userId })
                expect(isMatchObj).toEqual(true)
            }
        })
    })

    describe('getLast2WeeksOrders', () => {
        it('getLast2WeeksOrders function', async () => {
            expect(getLast2WeeksOrders).toBeDefined()
        })
        test('orders in last two weeks', async () => {
            const orders = await getLast2WeeksOrders()
            const twoWeeksAgoTimestamp = getTimestampByDaysAgo(14)
            orders.map(({ timestamp }) => expect(timestamp).toBeGreaterThanOrEqual(twoWeeksAgoTimestamp))
        })
    })

    describe('bucketOrdersByDate', () => {
        it('bucketOrdersByDate function', async () => {
            expect(bucketOrdersByDate).toBeDefined()
        })
        test('result: {key: date, value: order}', async () => {
            const orders = await fetchAllOrders()

            const ordersByDateObj = await bucketOrdersByDate()
            for (const [isoStringDate, orderWithoutDate] of Object.entries(ordersByDateObj)) {

                const date = new Date(isoStringDate);
                const timestamp = date.valueOf()

                const matchOrder = orders.find(order => order.timestamp === timestamp)
                expect(matchOrder).toBeDefined(true)
                expect(matchOrder.timestamp).toBeGreaterThanOrEqual(getTimestampByDaysAgo(14))

                const isMatchObj = JSON.stringify(matchOrder) === JSON.stringify({ ...orderWithoutDate, timestamp })
                expect(isMatchObj).toEqual(true)
            }
        })
    })
})