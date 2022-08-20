const getTimestampByDaysAgo = (numOfDays, date = new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo.valueOf()
}

const convertTimestampToDate = (timestamp) => new Date(timestamp).toISOString()

export {
    getTimestampByDaysAgo,
    convertTimestampToDate,
}