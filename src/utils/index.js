const moveCircularIndex = (index, direction, listLength) => {
    const moveDirectionIndex = direction === "left" ? -1 : 1;
    return (index + moveDirectionIndex + listLength) % listLength
}

export {
    moveCircularIndex,
}