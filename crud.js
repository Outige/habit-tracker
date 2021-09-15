export function deleteHabitByIndex(habitData, index) {
    delete habitData[index]
    var n = Object.keys(habitData).length+1
    for (var j = index+1; j < n; j++) {
        habitData[j-1] = habitData[j]
        if (j == n-1) delete habitData[j]
    }
}

// module.exports = deleteHabitByIndex // TODO: requires export to be off