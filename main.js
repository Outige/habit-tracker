/*----------IMPORTS----------*/
import {deleteHabitByIndex} from './crud.js'
import {findNextHabitIndex} from './crud.js'
import {addNewHabitByIndex} from './crud.js'
import {getItemInListIndex} from './utils.js'

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

/*----------MAIN----------*/
refreshHabitZone()

/*-----TICKS-----*/
setInterval(refreshTime, 1000)


/*----------UNTILS----------*/
function getHabitData() {
    var habitData = JSON.parse(localStorage.getItem("habitData"))
    if (habitData == null) return ({})
    return(habitData);
}

function updateHabitData(newHabitData) {
    localStorage.setItem("habitData", JSON.stringify(newHabitData));
}

function calculateTimeDiff(date) {
    var today = new Date()
    var diff = (today-date)/1000
    var years = Math.floor(diff/(60*60*24*365))
    diff = diff - (60*60*24*365)*years
    var months = Math.floor(diff/(60*60*24*28))
    diff = diff - (60*60*24*28)*months
    var days = Math.floor(diff/(60*60*24))
    diff = diff - (60*60*24)*days
    var hours = Math.floor(diff/(60*60))
    diff = diff - (60*60)*hours
    var minutes = Math.floor(diff/(60))
    diff = diff - (60)*minutes
    var seconds = Math.floor(diff)
    return([years, months, days, hours, minutes, seconds])
}

/*----------FUNCTIONS----------*/
function generateTimeHtml(timeContainer) {
    var timeContainer = document.createElement('div')
    timeContainer.classList.add('time-container')
    var timeNames = ['Year', 'Month', 'Day', 'Hour', 'Minute', 'Second']
    for (var i = 0; i < 6; i++) {
        var timeSubcontainer = document.createElement('div')
        timeSubcontainer.classList.add('time-subcontainer')
        var timeValue = document.createElement('div')
        timeValue.classList.add('time-value')
        timeValue.innerText = '00'
        var timeName = document.createElement('div')
        timeName.classList.add('time-name')
        timeName.innerText = timeNames[i]

        timeContainer.appendChild(timeSubcontainer)
        timeSubcontainer.appendChild(timeValue)
        timeSubcontainer.appendChild(timeName)
    }
    return(timeContainer)
}

function updateTimeHtml(timeContainer, date) {
    var timeValues = timeContainer.getElementsByClassName('time-value')
    var values = calculateTimeDiff(date)
    for (var i = 0; i < 6; i++) {
        timeValues[i].innerText = values[i]
    }
}

function refreshHabitZone() {
    var habitZone = document.getElementsByClassName('habit-zone')[0];
    habitZone.innerHTML = '' // TODO: is this shoddy?

    // loop through and display all habits
    var habitData = getHabitData()
    for (var key in habitData) {
        var habit = document.createElement('div');
        habit.classList.add('habit');
        
        var habitTitle = document.createElement('div');
        habitTitle.classList.add('habit-title')
        
        var habitTitleSpan = document.createElement('span');
        habitTitleSpan.innerHTML = habitData[key]['title']
        
        // time div
        var habitBody = document.createElement('div');
        habitBody.classList.add('habit-body')
        var startDays = habitData[key]['start']
        var date = new Date(startDays[startDays.length-1])
        var timeContainer = generateTimeHtml()
        updateTimeHtml(timeContainer, date)
        habitBody.appendChild(timeContainer)

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
        habitUndoResetButton.style.display = 'none'
        habitUndoResetButton.addEventListener('click', undoReset)


        // delete button
        var habitDeleteButton = document.createElement('button')
        habitDeleteButton.classList.add('delete-button')
        habitDeleteButton.innerText = 'Delete'
        habitDeleteButton.addEventListener('click', deleteHabit)
        habitReset.appendChild(habitDeleteButton)

        // undo delete button
        // var habitUndoDeleteButton = document.createElement('button')
        // habitUndoDeleteButton.classList.add('undo-delete-button')
        // habitUndoDeleteButton.innerText = 'Undo Delete'
        // habitReset.appendChild(habitUndoDeleteButton)
        // // habitUndoDeleteButton.style.display = 'none'
        // habitUndoDeleteButton.addEventListener('click', undoDelete)


        // adppend all the childeren
        habitTitle.appendChild(habitTitleSpan)
        habit.appendChild(habitTitle)
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
    var habitData = getHabitData()
    var timeContainers = document.getElementsByClassName('time-container')
    for (var i = 0; i < timeContainers.length; i++) {
        var startDays = habitData[i]['start']
        var date = new Date(startDays[startDays.length-1])
        updateTimeHtml(timeContainers[i], date)
    }
}

function resetTime(event) {
    var habitData = getHabitData()
    var timeContainer = event.target.parentElement.parentElement.getElementsByClassName('time-container')[0]
    var index = getItemInListIndex(timeContainer, document.getElementsByClassName('time-container'))
    habitData[index]['start'].push(new Date())
    updateTimeHtml(timeContainer, new Date())
    updateHabitData(habitData)
    
    // display undoReset and hide reset // TODO: this should just toggle css tag
    var undo = document.getElementsByClassName('undo-reset-button')[index]
    undo.style.display = 'inline'
    var reset = document.getElementsByClassName('reset-button')[index]
    reset.style.display = 'none'
}

function undoReset(event) { // TODO: a lot of this function should be handled with class toggles
    var undos = document.getElementsByClassName('undo-reset-button')
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

function undoDelete() {
    console.log('undo delete')
}

// TODO: technically this doesn't have to refresh the habit zone. Can just append the habit to the data and the zone
function addNewHabit() {
    var habitData = getHabitData()
    var index = findNextHabitIndex(habitData)
    
    var newHabitName = document.getElementsByTagName('input')[0].value
    var habit = {
        title: newHabitName,
        start: [new Date()],
    }
    
    addNewHabitByIndex(habitData, habit, index)
    updateHabitData(habitData)
    refreshHabitZone()
}


// TODO: technically this doesn't have to refresh the habit zone. Can just append the habit to the data and the zone
function deleteHabit(event) {
    var habitData = getHabitData()
    var habit = event.target.parentElement.parentElement.parentElement
    var habits = document.getElementsByClassName('habit')
    var index = getItemInListIndex(habit, habits)
    deleteHabitByIndex(habitData, index)
    updateHabitData(habitData)
    refreshHabitZone()
}