let habitZone = document.getElementsByClassName('habit-zone')[0];

function refreshHabitZone() {
    habitZone.innerHTML = '' // TODO: is this shoddy?

    var habitData = getHabitData()
    // habitData = {
    //     0: {
    //         title: 'Porn',
    //         start: 'Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    //     },
    //     1: {
    //         title: 'Masturbation',
    //         start: 'Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    //     },
    //     2: {
    //         title: 'Exercise',
    //         start: 'Thu Aug 20 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    //     },
    //     3: {
    //         title: 'Food binge',
    //         start: 'Thu Sep 10 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    //     },
    //     4: {
    //         title: 'Study',
    //         start: 'Thu Sep 8 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    //     },
    // }
    // updateHabitData(habitData) // TODO: I think this is just a waste of time and it's for testing where I want set data

    for (key in habitData) {
        // object construction
        let habit = document.createElement('div');
        habit.classList.add('habit');
        
        let habitTitle = document.createElement('div');
        habitTitle.classList.add('habit-title')
        
        let habitTitleSpan = document.createElement('span');
        habitTitleSpan.innerHTML = habitData[key]['title']
        
        let habitBody = document.createElement('div');
        habitBody.classList.add('habit-body')
        let count = document.createElement('div')
        count.classList.add('count')
        let today = new Date()
        let d = new Date(habitData[key]['start'])
        count.innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`


        let habitReset = document.createElement('div')
        habitReset.classList.add('reset-div')
        let habitResetButton = document.createElement('button')
        habitResetButton.classList.add('reset-button')
        habitResetButton.innerText = 'Reset'
        habitReset.appendChild(habitResetButton)

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
}

refreshHabitZone()

let resetButtons = document.getElementsByClassName('reset-button');
for (var i = 0; i < resetButtons.length; i++) {
    resetButtons[i].addEventListener('click', resetTime)
}

function resetTime(event) {
    var count = event.target.parentElement.parentElement.getElementsByClassName('count')[0]
    var counts = document.getElementsByClassName('count')
    var habitData = getHabitData()
    for (var i = 0; i < counts.length; i++) {
        if (counts[i] == count) {
            // console.log(i)
            habitData[i]['start'] = new Date()
            count.innerText = `0 days`
        }
    }
    updateHabitData(habitData)
}

// function foo() {
//     console.log('foo')
// }

// foo()

function refreshCount(countDivs) {
    let today = new Date()
    var habitData = getHabitData()
    for (var i = 0; i < countDivs.length; i++) {
        var d = new Date(habitData[i]['start'])
        countDivs[i].innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`
    }
}

function getHabitData() {
    return(JSON.parse(localStorage.getItem("habitData")));
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

let newHabitButton = document.getElementsByClassName('new-button')[0]
newHabitButton.addEventListener('click', addNewHabit)

function addNewHabit() {
    var habitData = getHabitData()
    var newHabitName = document.getElementsByTagName('input')[0].value

    var nuberHabits = 0
    for (key in habitData) {
        if (habitData.hasOwnProperty(key)) nuberHabits++;
    }
    habitData[nuberHabits] = {
        title: newHabitName,
        start: new Date(),
    }
    updateHabitData(habitData)
    refreshHabitZone()
}