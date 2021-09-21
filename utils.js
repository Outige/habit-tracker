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