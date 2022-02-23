////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import {allIds, fetchOrderById} from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const datesAreOnSameDay = (firstDate, secondDate) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();


const fetchAllOrders = async () => {
    return await Promise.all(
        allIds.map(async (id) => {
            return await fetchOrderById(id);
        })
    );
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
};

const bucketOrdersByUsers = async () => {
    const orders = await fetchAllOrders();
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    return orders.reduce(
        (obj, order) => ({
            ...obj,
            [order.userId]: [...(obj[order.userId] ?? []), order]
        }), {}
    );
};

const getLast2WeeksOrders = async () => {
    const orders = await fetchAllOrders();
    const validDateMax = new Date();
    validDateMax.setDate(validDateMax.getDate() - 14);
    return orders.filter(({ timestamp }) => timestamp >= validDateMax.getTime())
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

const bucketOrdersByDate = async () => {
    const orders = await getLast2WeeksOrders();
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    return Array.from(Array(14)).reduce(
        (obj, _, idx) => {
            const validDateMax = new Date();
            validDateMax.setDate(validDateMax.getDate() - (idx + 1));
            return ({
                ...obj,
                [validDateMax.getTime()]: orders.filter(({timestamp}) => datesAreOnSameDay(new Date(timestamp), validDateMax))
            })
        }, {}
    );
};

fetchAllOrders()
    // .then(console.log);

bucketOrdersByUsers()
    // .then(console.log);

getLast2WeeksOrders()
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
