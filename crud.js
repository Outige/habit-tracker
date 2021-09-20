/* ADD */
export function findNextHabitIndex(habitData) {
    if (Object.keys(habitData).length == 0) return(0)
    var maxIndex = 0
    for (var key in habitData) {
        key = parseInt(key)
        if (key > maxIndex) {
            maxIndex = key
        }   
    }
    return(maxIndex+1)
}

export function addNewHabitByIndex(habitData, habit, index) {
    if (index < 0) {
        throw new RangeError('Negative index for new habit')
    }
    habitData[index] = habit
}

/* DELETE */
export function deleteHabitByIndex(habitData, index) {
    if (habitData == null) {
        throw new ReferenceError('Habit data null')
    }
    if (habitData[index] == null) {
        throw new RangeError('Habit data index does not exist')
    }
    delete habitData[index]
    var n = Object.keys(habitData).length+1
    for (var j = index+1; j < n; j++) {
        habitData[j-1] = habitData[j]
        if (j == n-1) delete habitData[j]
    }
}