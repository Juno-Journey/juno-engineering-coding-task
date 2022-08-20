////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////
import {
    convertTimestampToDate,
    getTimestampByDaysAgo
} from '../api/utils'

const fetchAllOrders = async () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    const orders = await Promise.all(ids.map((id) => fetchOrderById(id)))

    return orders
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

    const orders = await fetchAllOrders()

    return orders.reduce((acc, { userId, ...order }) => {
        if (acc[userId]) {
            acc[userId].push(order)
            return acc
        }

        return {
            ...acc,
            [userId]: [order],
        }
    }, ordersByUsers)
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders = await fetchAllOrders()

    const twoWeeksAgoTimestamp = getTimestampByDaysAgo(14)

    return orders.filter(({ timestamp }) => timestamp >= twoWeeksAgoTimestamp)
};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.

    const orders = await getLast2WeeksOrders()

    return orders.reduce((acc, { timestamp, ...order }) => {
        const date = convertTimestampToDate(timestamp)

        if (acc[date]) {
            acc[date].push(order)
            return acc
        }

        return {
            ...acc,
            [date]: [order],
        }
    }, ordersByDate)

};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
