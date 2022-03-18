////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    const prefetchedIds = ids.map((id) => fetchOrderById(id));
    return Promise.all(prefetchedIds);
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders();
    orders.forEach((order) => {
        if (!ordersByUsers[order.userId]) {
            ordersByUsers[order.userId] = [order];
        } else {
            ordersByUsers[order.userId].push(order);
        }
    })
    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const lastTwoWeeksOrders = [];
    const orders = await fetchAllOrders();
     // 12096e5 is a magic number which is 14 days in milliseconds
    const twoWeeksAgo = new Date(Date.now() - 12096e5).setHours(0, 0, 0, 0);
    orders.forEach(order => {
        if (order.timestamp > twoWeeksAgo) {
            lastTwoWeeksOrders.push(order);
        }
    })
    return lastTwoWeeksOrders;
};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const lastTwoWeeksOrders = await getLast2WeeksOrders();
    lastTwoWeeksOrders.forEach((order) => {
        const orderDate = new Date(order.timestamp).setHours(0, 0, 0, 0);
        if (!ordersByDate[orderDate]) {
            ordersByDate[orderDate] = [order];
        } else {
            ordersByDate[orderDate].push(order);
        }
    })
    return ordersByDate;
};

fetchAllOrders()
.then(allOrders => console.log(allOrders));

bucketOrdersByUsers()
.then(ordersByUsers => console.log(ordersByUsers));

getLast2WeeksOrders()
.then(lastTwoWeeksOrders => console.log(lastTwoWeeksOrders));

bucketOrdersByDate()
.then(ordersByDates => console.log(ordersByDates));

////////////////////////////////////////
