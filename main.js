let habitZone = document.getElementsByClassName('habit-zone')[0];
let newHabitButton = document.getElementsByClassName('new-button')[0]

function refreshHabitZone() {
    habitZone.innerHTML = '' // TODO: is this shoddy?

    var habitData = getHabitData()
    // habitData = {
    //     0: {
    //         title: 'Porn',
    //         start: ['Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)'],
    //     },
    //     1: {
    //         title: 'Masturbation',
    //         start: ['Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)'],
    //     },
    //     2: {
    //         title: 'Exercise',
    //         start: ['Thu Aug 20 2021 22:00:12 GMT+0200 (South Africa Standard Time)'],
    //     },
    //     3: {
    //         title: 'Food binge',
    //         start: ['Thu Sep 10 2021 22:00:12 GMT+0200 (South Africa Standard Time)'],
    //     },
    //     4: {
    //         title: 'Study',
    //         start: ['Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)'],
    //     },
    // }
    // updateHabitData(habitData) // TODO: I think this is just a waste of time and it's for testing where I want set data

    for (key in habitData) {
        // object construction
        var habit = document.createElement('div');
        habit.classList.add('habit');
        
        var habitTitle = document.createElement('div');
        habitTitle.classList.add('habit-title')
        
        var habitTitleSpan = document.createElement('span');
        habitTitleSpan.innerHTML = habitData[key]['title']
        
        var habitBody = document.createElement('div');
        habitBody.classList.add('habit-body')
        var count = document.createElement('div')
        count.classList.add('count')
        var today = new Date()
        // let d = new Date(habitData[key]['start'])
        var startDays = habitData[key]['start']
        var d = new Date(startDays[startDays.length-1])
        count.innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`


        var habitReset = document.createElement('div')
        habitReset.classList.add('reset-div')
        var habitResetButton = document.createElement('button')
        habitResetButton.classList.add('reset-button')
        habitResetButton.innerText = 'Reset'
        habitResetButton.addEventListener('click', resetTime)
        habitReset.appendChild(habitResetButton)

        var habitDeleteButton = document.createElement('button')
        habitDeleteButton.classList.add('delete-button')
        habitDeleteButton.innerText = 'Delete'
        habitDeleteButton.addEventListener('click', deleteHabit)
        habitReset.appendChild(habitDeleteButton)
        // <button class="delete-button">Delete</button>


        // child appending
        habitTitle.appendChild(habitTitleSpan)
        habit.appendChild(habitTitle)

        habitBody.appendChild(count)
        habitBody.appendChild(habitReset)
        habit.appendChild(habitBody)

        habitZone.appendChild(habit)
    }

    // add new habit inputs
    var newHabit = document.createElement('div')
    newHabit.classList.add('new-habit')
    var newHabitName = document.createElement('input')
    newHabitName.type = "text"
    newHabitName.value = "(enter habit name)"
    var newHabitButton = document.createElement('button')
    newHabitButton.classList.add('new-button')
    newHabitButton.innerText = "New Habit"

    newHabit.appendChild(newHabitName)
    newHabit.appendChild(newHabitButton)
    habitZone.appendChild(newHabit)

    newHabitButton.addEventListener('click', addNewHabit)
}

refreshHabitZone()

// let resetButtons = document.getElementsByClassName('reset-button');
// for (var i = 0; i < resetButtons.length; i++) {
//     resetButtons[i].addEventListener('click', resetTime)
// }

function resetTime(event) {
    var count = event.target.parentElement.parentElement.getElementsByClassName('count')[0]
    var counts = document.getElementsByClassName('count')
    var habitData = getHabitData()
    for (var i = 0; i < counts.length; i++) {
        if (counts[i] == count) {
            habitData[i]['start'].push(new Date())
            count.innerText = `0 days`
        }
    }
    updateHabitData(habitData)
    refreshHabitZone()
}

// function foo() {
//     console.log('foo')
// }

// foo()

function refreshCount(countDivs) {
    let today = new Date()
    var habitData = getHabitData()
    for (var i = 0; i < countDivs.length; i++) {
        var startDays = habitData[i]['start']
        var d = new Date(startDays[startDays.length-1])
        countDivs[i].innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`
    }
}

function getHabitData() {
    var habitData = JSON.parse(localStorage.getItem("habitData"))
    if (habitData == null) return ({})
    return(habitData);
}

function updateHabitData(newHabitData) {
    localStorage.setItem("habitData", JSON.stringify(newHabitData));
}
// setInterval(refreshHabitZone, 1)
countDivs = document.getElementsByClassName('count')
setInterval(refreshCount, 1000, countDivs)

// localStorage.setItem("habitData", JSON.stringify(habitData));
// // Retrieve
// var dat = JSON.parse(localStorage.getItem("habitData"));
// console.log(dat)

function addNewHabit() {
    var habitData = getHabitData()
    var newHabitName = document.getElementsByTagName('input')[0].value
    var nuberHabits = 0
    for (key in habitData) {
        if (habitData.hasOwnProperty(key)) nuberHabits++;
    }
    habitData[nuberHabits] = {
        title: newHabitName,
        start: [new Date()],
    }
    updateHabitData(habitData)
    refreshHabitZone()
}

function deleteHabit(event) {
    var habitData = getHabitData()
    var habit = event.target.parentElement.parentElement.parentElement
    var habits = document.getElementsByClassName('habit')
    for (var i = 0; i < habits.length; i++) {
        if (habits[i] == habit) {
            console.log(i)
            delete habitData[i]
            for (var j = i+1; j < habits.length; j++) {
                habitData[j-1] = habitData[j]
                if (j == habits.length-1) delete habitData[j]
            }

            break
        }
    }
    updateHabitData(habitData)
    refreshHabitZone()

    // var count = event.target.parentElement.parentElement.getElementsByClassName('count')[0]
    // var counts = document.getElementsByClassName('count')
    // var habitData = getHabitData()
    // for (var i = 0; i < counts.length; i++) {
    //     if (counts[i] == count) {
    //         // console.log(i)
    //         habitData[i]['start'] = new Date()
    //         count.innerText = `0 days`
    //     }
    // }
    // updateHabitData(habitData)
}