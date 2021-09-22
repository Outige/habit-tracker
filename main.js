/*----------IMPORTS----------*/
import {deleteHabitByIndex} from './crud.js'
import {findNextHabitIndex} from './crud.js'
import {addNewHabitByIndex} from './crud.js'
import {getItemInListIndex} from './utils.js'
import {calculateTimeDiffArray} from './utils.js'
import {dragAndDropReorder} from './utils.js'


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

/*----------GLOBALS----------*/
var lastMove = null;

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
    var values = calculateTimeDiffArray(date, new Date())
    for (var i = 0; i < 6; i++) {
        timeValues[i].innerText = values[i]
    }
}

function setUpDragAndDrop() {
    var habits = document.getElementsByClassName('habit')
    for (var i = 0; i < habits.length; i++) {
        habits[i].addEventListener('dragstart', (event) => {
            event.target.classList.add('dragging')
        })
        habits[i].addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging')
        })
        habits[i].addEventListener('dragover', (event) => {
            event.preventDefault()
        })
        habits[i].addEventListener('drop', (event) => {
            const draggable = document.getElementsByClassName('dragging')[0]
            var over = event.target
            while (over.classList[0] != 'habit') {
                over = over.parentElement
            }
            var start = getItemInListIndex(draggable, habits);
            var end = getItemInListIndex(over, habits);
            var habitData = getHabitData()
            dragAndDropReorder(habitData, start, end)
            updateHabitData(habitData)
            refreshHabitZone()
        })

        habits[i].addEventListener('touchstart', function(event){
            event.target.classList.add('dragging')
        })
        habits[i].addEventListener('touchmove', function(event){
            lastMove = event;
        })
        habits[i].addEventListener('touchend', function(event){
            var over = event.target
            while (over.classList[0] != 'habit') {
                over = over.parentElement
            }
            var start = getItemInListIndex(over, habits);
            event.target.classList.remove('dragging')
            var endX = lastMove.touches[0].pageX
            var endY = lastMove.touches[0].pageY

            var end = -1
            for (var i = 0; i < habits.length; i++) {
                var testX0 = habits[i].offsetLeft
                var testX1 = habits[i].offsetLeft + habits[i].offsetWidth
                var testY0 = habits[i].offsetTop
                var testY1 = habits[i].offsetTop + habits[i].offsetHeight
                if (testX0 < endX && endX < testX1 && testY0 < endY && endY < testY1) {
                    end = i
                }
            }
            var habitData = getHabitData()
            dragAndDropReorder(habitData, start, end)
            updateHabitData(habitData)
            refreshHabitZone()
        })
    }
}

function setUpBadgeDiv(habit) {
    var badgeDiv = document.createElement('div')
    badgeDiv.classList.add('badge-space')
    var n = habit['start'].length
    var flag = true

    // day week month year badge
    var time = calculateTimeDiffArray(new Date(habit['start'][n-1]), new Date())
    if (time[0] > 0) {
        var badge = document.createElement('div')
        badge.classList.add('badge')
        badge.classList.add('year')
        var badgeText = document.createElement('span')
        badgeText.classList.add('badge-text')
        badgeText.innerText = `${time[0]}-year`

        badge.appendChild(badgeText)
        badgeDiv.appendChild(badge)
        flag = false
    }
    else if (time[1] > 0) {
        var badge = document.createElement('div')
        badge.classList.add('badge')
        badge.classList.add('month')
        var badgeText = document.createElement('span')
        badgeText.classList.add('badge-text')
        badgeText.innerText = `${time[1]}-month`

        badge.appendChild(badgeText)
        badgeDiv.appendChild(badge)
        flag = false
    }
    else if (time[2] >= 7) {
        var badge = document.createElement('div')
        badge.classList.add('badge')
        badge.classList.add('week')
        var badgeText = document.createElement('span')
        badgeText.classList.add('badge-text')
        badgeText.innerText = `${Math.floor(time[2]/7)}-week`

        badge.appendChild(badgeText)
        badgeDiv.appendChild(badge)
        flag = false
    } else if (time[2] < 7 && time[2] > 0) {
        var badge = document.createElement('div')
        badge.classList.add('badge')
        badge.classList.add('day')
        var badgeText = document.createElement('span')
        badgeText.classList.add('badge-text')
        badgeText.innerText = `${time[2]}-day`

        badge.appendChild(badgeText)
        badgeDiv.appendChild(badge)
    }
    // best
    var best = null
    for (var i = 1; i < n; i++) {
        best = Math.max(best, new Date(habit['start'][i]) - new Date(habit['start'][i-1]))
    }
    var c = new Date() - new Date(habit['start'][n-1])
    if (c > best) {
        var badge = document.createElement('div')
        badge.classList.add('badge')
        badge.classList.add('best')
        var badgeText = document.createElement('span')
        badgeText.classList.add('badge-text')
        badgeText.innerText = 'best'


        badge.appendChild(badgeText)
        badgeDiv.appendChild(badge)
        flag = false
    }

    // improvement
    if (n > 1 && flag) {
        var a = new Date() - new Date(habit['start'][n-1])
        var b = new Date(habit['start'][n-1]) - new Date(habit['start'][n-2])
        if (a > b) {
            var badge = document.createElement('div')
            badge.classList.add('badge')
            badge.classList.add('improvement')
            var badgeText = document.createElement('span')
            badgeText.classList.add('badge-text')
            badgeText.innerText = 'improvement'


            badge.appendChild(badgeText)
            badgeDiv.appendChild(badge)
        }
    }
    return(badgeDiv)
}

function refreshHabitZone() {
    var habitZone = document.getElementsByClassName('habit-zone')[0];
    habitZone.innerHTML = '' // TODO: is this shoddy?

    // loop through and display all habits
    var habitData = getHabitData()
    for (var key in habitData) {
        var habit = document.createElement('div');
        habit.classList.add('habit');
        habit.draggable = true
        
        var habitTitle = document.createElement('div');
        habitTitle.classList.add('habit-title')
        
        var habitTitleSpan = document.createElement('span');
        habitTitleSpan.innerHTML = habitData[key]['title']
        habitTitle.appendChild(habitTitleSpan)
        habit.appendChild(habitTitle)
        habit.appendChild(setUpBadgeDiv(habitData[key]))



        // var badgeDiv = document.createElement('div')
        // badgeDiv.classList.add('badge-space')
        // var badge1 = document.createElement('div')
        // badge1.classList.add('badge')
        // var badgeText = document.createElement('span')
        // badgeText.classList.add('badge-text')
        // badgeText.innerText = 'best'
        // badge1.appendChild(badgeText)
        // var badge2 = document.createElement('div')
        // badge2.classList.add('badge')
        // badgeText = document.createElement('span')
        // badgeText.classList.add('badge-text')
        // badgeText.innerText = 'improvement'
        // badge2.appendChild(badgeText)
        // var badge3 = document.createElement('div')
        // badge3.classList.add('badge')
        // badgeText = document.createElement('span')
        // badgeText.classList.add('badge-text')
        // badgeText.innerText = '1 month'
        // badge3.appendChild(badgeText)
        // badgeDiv.appendChild(badge1)
        // badgeDiv.appendChild(badge2)
        // badgeDiv.appendChild(badge3)
        // habit.appendChild(badgeDiv)
        
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
    setUpDragAndDrop()
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