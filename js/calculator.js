export const calcFullTime = function (array) {
    const fullTime = array.reduce((acc, num) => acc + num, 0);
    return fullTime;
}

export const calcRestTime = function (duration, isDone, myActivities) {
    const restTimeArray = myActivities.map(value => {
        let myValue = value.duration;
        if (value.isDone == true) { myValue = 0 };
        return myValue;
    })
    const restTime = restTimeArray.reduce((acc, value) => acc + value, 0)
    return restTime;
}

export const calcProgress = isDone =>
    (isDone.filter(value=>value).length/isDone.length*100).toFixed(1)
