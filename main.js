/*----------MAIN----------*/
refreshHabitZone()

/*-----TICKS-----*/
setInterval(refreshTime, 1000)



    // var habitData = {
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
    // updateHabitData(habitData)

/*----------UNTILS----------*/
function getItemInListIndex(item, list) {
    for (var i = 0; i < list.length; i++) {
        if (item == list[i]) return(i)
    }
    return(-1)
}

/*----------FUNCTIONS----------*/
function getHabitData() {
    var habitData = JSON.parse(localStorage.getItem("habitData"))
    if (habitData == null) return ({})
    return(habitData);
}

function updateHabitData(newHabitData) {
    localStorage.setItem("habitData", JSON.stringify(newHabitData));
}

function refreshHabitZone() {
    var habitZone = document.getElementsByClassName('habit-zone')[0];
    habitZone.innerHTML = '' // TODO: is this shoddy?

    var habitData = getHabitData()

    // loop through and display all habits
    for (key in habitData) {
        var habit = document.createElement('div');
        habit.classList.add('habit');
        
        var habitTitle = document.createElement('div');
        habitTitle.classList.add('habit-title')
        
        var habitTitleSpan = document.createElement('span');
        habitTitleSpan.innerHTML = habitData[key]['title']
        
        // count div
        var habitBody = document.createElement('div');
        habitBody.classList.add('habit-body')
        var count = document.createElement('div')
        count.classList.add('count')
        var today = new Date()
        var startDays = habitData[key]['start']
        var d = new Date(startDays[startDays.length-1])
        count.innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`


        // reset button
        var habitReset = document.createElement('div')
        habitReset.classList.add('reset-div')
        var habitResetButton = document.createElement('button')
        habitResetButton.classList.add('reset-button')
        habitResetButton.innerText = 'Reset'
        habitResetButton.addEventListener('click', resetTime)
        habitReset.appendChild(habitResetButton)

        // undo reset button
        var habitUndoResetButton = document.createElement('button')
        habitUndoResetButton.classList.add('undo-reset-button')
        habitUndoResetButton.innerText = 'Undo Reset'
        habitReset.appendChild(habitUndoResetButton)
        // habitUndoResetButton.disabled = true
        habitUndoResetButton.style.display = 'none'
        habitUndoResetButton.addEventListener('click', undoReset)


        // delete button
        var habitDeleteButton = document.createElement('button')
        habitDeleteButton.classList.add('delete-button')
        habitDeleteButton.innerText = 'Delete'
        habitDeleteButton.addEventListener('click', deleteHabit)
        habitReset.appendChild(habitDeleteButton)


        // adppend all the childeren
        habitTitle.appendChild(habitTitleSpan)
        habit.appendChild(habitTitle)
        habitBody.appendChild(count)
        habitBody.appendChild(habitReset)
        habit.appendChild(habitBody)
        habitZone.appendChild(habit)
    }

    // add new habit option
    var newHabit = document.createElement('div')
    newHabit.classList.add('new-habit')
    var newHabitName = document.createElement('input')
    newHabitName.type = "text"
    newHabitName.value = "(enter habit name)"
    newHabitName.addEventListener('focus', function(event) {
        event.target.value = ''
    })
    var newHabitButton = document.createElement('button')
    newHabitButton.classList.add('new-button')
    newHabitButton.innerText = "New Habit"

    // add new habit option
    newHabit.appendChild(newHabitName)
    newHabit.appendChild(newHabitButton)
    habitZone.appendChild(newHabit)
    newHabitButton.addEventListener('click', addNewHabit)
}

function refreshTime() {
    var countDivs = document.getElementsByClassName('count') 
    let today = new Date()
    var habitData = getHabitData()
    for (var i = 0; i < countDivs.length; i++) {
        var startDays = habitData[i]['start']
        var d = new Date(startDays[startDays.length-1])
        countDivs[i].innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`
    }
}

function resetTime(event) {
    var count = event.target.parentElement.parentElement.getElementsByClassName('count')[0]
    var counts = document.getElementsByClassName('count')
    var habitData = getHabitData()
    var index = getItemInListIndex(count,    counts)
    habitData[index]['start'].push(new Date())
    count.innerText = `0.00000 days`
    updateHabitData(habitData)
    
    // display undoReset and hide reset
    var undo = document.getElementsByClassName('undo-reset-button')[index]
    undo.style.display = 'inline'
    var reset = document.getElementsByClassName('reset-button')[index]
    reset.style.display = 'none'
}

function undoReset(event) {
    var undos = document.getElementsByClassName('undo-reset-button') // TODO: this will break if undos aren't visible with our implimentation
    var index = getItemInListIndex(event.target, undos)
    var habitData = getHabitData()
    habitData[index]['start'].pop()
    updateHabitData(habitData)
    refreshTime()

    // hide undoReset and show reset
    undos[index].style.display = 'none'
    var reset = document.getElementsByClassName('reset-button')[index]
    reset.style.display = 'inline'
}

// TODO: technically this doesn't have to refresh the habit zone. Can just append the habit to the data and the zone
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

// TODO: technically this doesn't have to refresh the habit zone. Can just append the habit to the data and the zone
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
}