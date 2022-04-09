////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from '../api';

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async () => {
    const ids = allIds;
    return await Promise.all(ids.map((id) => fetchOrderById(id)));
};

const bucketOrdersByUsers = async () => {
    const ordersByUsers = {};
    const allOrders = await fetchAllOrders();
    allOrders.map((order) => {
        if (ordersByUsers[order.userId]) {
            ordersByUsers[order.userId].push(order);
        } else {
            ordersByUsers[order.userId] = [order];
        }
    });
    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    const allOrders = await fetchAllOrders();
    const last2WeeksOrders = allOrders.filter((order) => {
        const currentTime = new Date();
        const twoWeeksAgo = new Date(
            currentTime.setDate(currentTime.getDate() - 14)
        );
        return order.timestamp >= twoWeeksAgo;
    });
    return last2WeeksOrders;
};

const bucketOrdersByDate = async () => {
    const ordersByDate = {};
    const last2WeeksOrders = await getLast2WeeksOrders();

    last2WeeksOrders.map((order) => {
        if (last2WeeksOrders[order.timestamp]) {
            ordersByDate[order.timestamp].push(order);
        } else {
            ordersByDate[order.timestamp] = [order];
        }
    });
    return ordersByDate;
};

fetchAllOrders()
    .then((data) => console.log('fetchAllOrders:', data))
    .catch((err) => console.log(err));

bucketOrdersByUsers()
    .then((data) => console.log('bucketOrdersByUsers:', data))
    .catch((err) => console.log(err));

getLast2WeeksOrders()
    .then((data) => console.log('getLast2WeeksOrders:', data))
    .catch((err) => console.log(err));

bucketOrdersByDate()
    .then((data) => console.log('bucketOrdersByDate:', data))
    .catch((err) => console.log(err));

export const ecommerceFunctions = {
    fetchAllOrders,
    bucketOrdersByUsers,
    getLast2WeeksOrders,
    bucketOrdersByDate,
};
