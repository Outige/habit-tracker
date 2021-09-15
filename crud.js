export default function deleteHabitByIndex(habitData, index) {
    console.log(index)
    delete habitData[index]
    console.log(Object.keys(habitData))
    var n = Object.keys(habitData).length+1
    for (var j = index+1; j < n; j++) {
        habitData[j-1] = habitData[j]
        if (j == n-1) delete habitData[j]
    }
}