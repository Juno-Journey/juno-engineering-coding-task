////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from '../api'

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async () => {
    const ids = allIds
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.

    const orders = await Promise.all(
        ids.map(async (id) => {
            const order = await fetchOrderById(id)
            return order
        })
    )

    return orders
}

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {}
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders()

    orders.map((order) => {
        return (ordersByUsers = {
            ...ordersByUsers,
            [order.userId]: ordersByUsers[order.userId] ? [...ordersByUsers[order.userId], order] : [order],
        })
    })

    return ordersByUsers
}

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders = await fetchAllOrders()
    const twoWeeksAgo = new Date(Date.now() - 12096e5)
    const lastOrders = []

    orders.forEach((order) => {
        if (order.timestamp >= twoWeeksAgo) return [...lastOrders, order]
    })

    return lastOrders
}

const bucketOrdersByDate = async () => {
    let ordersByDate = {}
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.

    const orders = await getLast2WeeksOrders()
    ordersByDate.orders = orders.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    return ordersByDate
}

fetchAllOrders()
// .then(console.log);

bucketOrdersByUsers()
// .then(console.log);

getLast2WeeksOrders()
// .then(console.log);

bucketOrdersByDate()
// .then(console.log);

////////////////////////////////////////
