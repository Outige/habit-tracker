export function getItemInListIndex(item, list) {
    for (var i = 0; i < list.length; i++) {
        if (item == list[i]) return(i)
    }
    return(-1)
}

export function calculateTimeDiffArray(date1, date2) {
    var diff = (date2-date1)/1000
    if (diff < 0) {
        throw new RangeError('Require positive date difference')
    }
    var years = Math.floor(diff/(60*60*24*365))
    diff = diff - (60*60*24*365)*years
    var months = Math.floor(diff/(60*60*24*28))
    diff = diff - (60*60*24*(365/12))*months
    var days = Math.floor(diff/(60*60*24))
    diff = diff - (60*60*24)*days
    var hours = Math.floor(diff/(60*60))
    diff = diff - (60*60)*hours
    var minutes = Math.floor(diff/(60))
    diff = diff - (60)*minutes
    var seconds = Math.floor(diff)
    return([years, months, days, hours, minutes, seconds])
}

export function dragAndDropReorder(habitData, start, end) {
    if (start < 0 || start >= Object.keys(habitData).length) throw RangeError('Invalid drag')
    if (end < 0 || end >= Object.keys(habitData).length) throw RangeError('Invalid drag')
    if (start == end) return;
    else if (start < end) {
        var tmp = habitData[start]
        for (var i = start; i < end; i++) {
            habitData[i] = habitData[i+1]
        }
        habitData[end] = tmp;
    } else if (start > end) {
        var tmp = habitData[start]
        for (var i = start; i > end; i--) {
            habitData[i] = habitData[i-1]
        }
        habitData[end] = tmp;
    }
}

export function getHabitBadges(habit) {
    var n = habit['start'].length
    var flag = true
    var badges = []

    // day week month year badge
    var time = calculateTimeDiffArray(new Date(habit['start'][n-1]), new Date())
    if (time[0] > 0) {
        badges.push({'class':'year', 'text':`${time[0]}-year`})
        flag = false
    }
    else if (time[1] > 0) {
        badges.push({'class':'month', 'text':`${time[1]}-month`})
        flag = false
    }
    else if (time[2] >= 7) {
        badges.push({'class':'week', 'text':`${Math.floor(time[2]/7)}-week`})
        flag = false
    } else if (time[2] < 7 && time[2] > 0) {
        badges.push({'class':'day', 'text':`${time[2]}-day`})
    }
    
    // best
    var best = null
    for (var i = 1; i < n; i++) {
        best = Math.max(best, new Date(habit['start'][i]) - new Date(habit['start'][i-1]))
    }
    var c = new Date() - new Date(habit['start'][n-1])
    if (c > best) {
        badges.push({'class':'best', 'text':'best'})
        flag = false
    }

    // improvement
    if (n > 1 && flag) {
        var a = new Date() - new Date(habit['start'][n-1])
        var b = new Date(habit['start'][n-1]) - new Date(habit['start'][n-2])
        if (a > b) {
            badges.push({'class':'improvement', 'text':'improvement'})
        }
    }
    return(badges)
}