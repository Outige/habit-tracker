let habitZone = document.getElementsByClassName('habit-zone')[0];

function refreshHabitZone() {
    habitZone.innerHTML = '' // TODO: is this shoddy?

    habitData = {
        0: {
            title: 'Porn',
            start: 'Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
        },
        1: {
            title: 'Masturbation',
            start: 'Thu Sep 05 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
        },
        2: {
            title: 'Orgasm',
            start: 'Thu Sep 02 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
        },
    }
    // console.log(habitData)

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
}

refreshHabitZone()

let resetButtons = document.getElementsByClassName('reset-button');
for (var i = 0; i < resetButtons.length; i++) {
    resetButtons[i].addEventListener('click', resetTime)
}

function resetTime(event) {
    var count = event.target.parentElement.parentElement.getElementsByClassName('count')[0]
    var counts = document.getElementsByClassName('count')
    for (var i = 0; i < counts.length; i++) {
        if (counts[i] == count) {
            // console.log(i)
            habitData[i]['start'] = new Date()
            count.innerText = `0 days`
        }
    }
}

// function foo() {
//     console.log('foo')
// }

// foo()

function refreshCount(countDivs) {
    let today = new Date()
    for (var i = 0; i < countDivs.length; i++) {
        var d = new Date(habitData[i]['start'])
        countDivs[i].innerText = `${((today-d)/(1000*60*60*24)).toFixed(5)} days`
    }
}

// setInterval(refreshHabitZone, 1)
countDivs = document.getElementsByClassName('count')
setInterval(refreshCount, 1000, countDivs)