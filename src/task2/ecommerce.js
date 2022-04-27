////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    return Promise.all(ids.map(id => fetchOrderById(id)));
};

export const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders();
    for (const order of orders) {
        if (!Array.isArray(ordersByUsers[order.userId])) {
            ordersByUsers[order.userId] = [order];
            continue;
        }
        ordersByUsers[order.userId].push(order);
    }
    return ordersByUsers;
};

// helper
export const getDaysAgoTimeStamp = (days) => {
    const now = new Date();
    return now.setDate(now.getDate() - days);
};

export const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders = await fetchAllOrders();
    const twoWeeksAgoTimestamp = getDaysAgoTimeStamp(14);
    return orders.filter(order => order.timestamp > twoWeeksAgoTimestamp);
};

export const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const orders = await fetchAllOrders();
    for (const order of orders) {
        const orderDate = new Date(order.timestamp).getDate();
        if (!Array.isArray(ordersByDate[orderDate])) {
            ordersByDate[orderDate] = [order];
            continue;
        }
        ordersByDate[orderDate].push(order);
    }
    return ordersByDate;
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
