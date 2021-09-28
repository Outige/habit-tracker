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

export function getHabitBadges(starts, index, today=new Date()) {
    /* exceptions */
    if (typeof(starts) != typeof([])) throw new TypeError('$starts must be an array')
    if (starts.length < 1) throw new RangeError('$starts can\'t be empty')
    for (var i = 1; i < starts.length; i++) {
        if (new Date(starts[i])-new Date(starts[i-1]) < 0) throw new RangeError('$starts must be in ascending order')
    }
    if (typeof(today) != typeof(new Date())) throw new TypeError('$today must be a date')
    if (today-new Date(starts.length-1) < 0) throw new RangeError('$today must be the largest day')
    if (index < 0 || index >= starts.length) throw new RangeError('$index not in starts')
    
    /* vars */
    var badges = []
    var n = starts.length
    var best = 0
    var better = true
    starts = [...starts]
    starts.push(today)

    /* year */
    var times = calculateTimeDiffArray(new Date(starts[index]), new Date(starts[index+1]))
    if (times[0] > 0) {
        badges.push({'class':'year', 'text':`${times[0]}-year`})
        better = false
    } else if (times[1] > 0) {
        badges.push({'class':'month', 'text':`${times[1]}-month`})
        better = false
    } else if (Math.floor(times[2]/7) > 0) {
        badges.push({'class':'week', 'text':`${Math.floor(times[2]/7)}-week`})
        better = false
    } else if (times[2] > 0) {
        badges.push({'class':'day', 'text':`${times[2]}-day`})
    }

    /* best badge */
    for (var i = 0; i < starts.length-1; i++) {
        best = Math.max(best, new Date(starts[i+1]) - new Date(starts[i]))
    }
    if (new Date(starts[index+1])-new Date(starts[index]) >= best) {
        badges.push({'class':'best', 'text':'best'})
        better = false
    }

    /* better badge */
    if (better && index > 0 && new Date(starts[index+1])-new Date(starts[index]) > new Date(starts[index])-new Date(starts[index-1])) {
        badges.push({'class':'better', 'text':'better'})
    }

    return(badges)
}

export function getCalendarData(starts, today=new Date()) {
    /* vars */
    var calendarData = {}
    starts = [...starts] // TODO: made a deep copy as I mutate the data. Not good. Lazy
    
    /* add success starts */
    var nextDate = new Date(today)
    var first = new Date(starts[0])
    while (first <= nextDate) {
        var year = nextDate.getFullYear()
        var month = nextDate.toLocaleString('default', { month: 'long' })
        var day = nextDate.getUTCDate()
        if (calendarData[year] == undefined) calendarData[year] = {}
        if (calendarData[year][month] == undefined) calendarData[year][month] = {}
        if (calendarData[year][month][day] == undefined) calendarData[year][month][day] = 'success'
        nextDate.setDate(nextDate.getDate() - 1);
    }
    

    /* add fail starts */
    for (var i = 1; i < starts.length; i++) {
        starts[i] = new Date(starts[i])
        var year = starts[i].getFullYear()
        var month = starts[i].toLocaleString('default', { month: 'long' })
        var day = starts[i].getUTCDate()
        if (calendarData[year] == undefined) calendarData[year] = {}
        if (calendarData[year][month] == undefined) calendarData[year][month] = {}
        calendarData[year][month][day] = 'fail'
    }

    /* add fututre starts */
    nextDate = new Date(today)
    while (nextDate.getFullYear() + nextDate.getMonth() <= today.getFullYear() + today.getMonth()) {
        var year = nextDate.getFullYear()
        var month = nextDate.toLocaleString('default', { month: 'long' })
        var day = nextDate.getUTCDate()
        calendarData[year][month][day] = 'future'
        nextDate.setDate(nextDate.getDate() + 1);
    }

    /* add past starts */
    nextDate = new Date(starts[0])
    nextDate.setDate(nextDate.getDate() - 1);
    var first = new Date(starts[0])
    while (nextDate.getFullYear() + nextDate.getMonth() == first.getFullYear() + first.getMonth()) {
        var year = nextDate.getFullYear()
        var month = nextDate.toLocaleString('default', { month: 'long' })
        var day = nextDate.getUTCDate()
        calendarData[year][month][day] = 'past'
        nextDate.setDate(nextDate.getDate() - 1);
    }
    return(calendarData)
}