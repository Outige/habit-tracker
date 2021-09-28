var dates = [
    "2021-08-12T06:45:15.924Z",
    "2021-08-13T06:45:15.924Z",
    "2021-08-17T06:45:15.924Z",
    "2021-08-18T06:45:15.924Z",
    "2021-08-19T06:45:15.924Z",

    "2021-09-05T06:45:15.924Z",
    "2021-09-13T06:45:15.924Z",
    "2021-09-17T06:45:15.924Z",
    "2021-09-18T06:45:15.924Z",
    "2021-09-19T06:45:15.924Z",
]

function bar(dates, today=new Date()) {
    var foo = {}
    for (var i = 0; i < dates.length-1; i++) {
        dates[i] = new Date(dates[i])
        var year = dates[i].getFullYear()
        var month = dates[i].toLocaleString('default', { month: 'long' })
        var day = dates[i].getUTCDate()
        if (foo[year] == undefined) foo[year] = {}
        if (foo[year][month] == undefined) foo[year][month] = {}
        if (i > 0) {
            foo[year][month][day] = 'fail'
        } else {
            foo[year][month][day] = 'success'
        }
    }

    var nextDate = dates[0]
    while (nextDate < today) { // TODO: today + 1?
        var year = nextDate.getFullYear()
        var month = nextDate.toLocaleString('default', { month: 'long' })
        var day = nextDate.getUTCDate()
        if (foo[year] == undefined) foo[year] = {}
        if (foo[year][month] == undefined) foo[year][month] = {}
        if (foo[year][month][day] == undefined) foo[year][month][day] = 'success'
        nextDate.setDate(nextDate.getDate() + 1);
    }
    return(foo)
    // for (var year in foo) {
    //     for (var month in foo[year]) {
    //         for (var day in foo[year][month]) {
    //             console.log(`${year}:${month}:${day}-${foo[year][month][day]}`)
    //         }
    //     }
    // }
}

var calendarData = bar(dates)
var body = document.body
console.log(body)
var calendarDiv = document.createElement('div')
calendarDiv.classList.add("calendar")
// body.appendChild(calendarDiv)

    for (var year in calendarData) {
    //     <div class="year">
    //     <div class="year-text">2021</div>
    // </div>
        var yearDiv = document.createElement('div')
        yearDiv.classList.add('year')
        var yearText = document.createElement('div')
        yearText.classList.add('year-text')
        yearText.innerText = year
        yearDiv.appendChild(yearText)
        calendarDiv.appendChild(yearDiv)

        var monthsDiv = document.createElement('div')
        monthsDiv.classList.add('months')
        calendarDiv.appendChild(monthsDiv)

        for (var month in calendarData[year]) {
            var monthDiv = document.createElement('div')
            monthDiv.classList.add('month')
            monthsDiv.appendChild(monthDiv)
            var monthText = document.createElement('div')
            monthText.classList.add('month-text')
            monthText.innerText = month
            monthDiv.appendChild(monthText)
            var monthBlocks = document.createElement('div')
            monthBlocks.classList.add('month-blocks')
            monthDiv.appendChild(monthBlocks)

            // <div class="month-text">September</div>
            //     <div class="month-blocks">
            //         <div class="month-block success-date">1</div>

            for (var day in calendarData[year][month]) {
                var monthBlock = document.createElement('div')
                monthBlock.classList.add('month-block')
                monthBlock.classList.add(`${calendarData[year][month][day]}-date`)
                monthBlock.innerText = day
                monthBlocks.appendChild(monthBlock)
                // console.log(`${year}:${month}:${day}-${calendarData[year][month][day]}`)
            }
        }
    }

body.appendChild(calendarDiv)