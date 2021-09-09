console.log('eyy')

let habitZone = document.getElementsByClassName('habit-zone')[0];

habitZone.innerHTML = '' // TODO: is this shoddy?

habitData = {
    0: {
        title: 'P',
        start: 'Thu Sep 08 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    },
    1: {
        title: 'M',
        start: 'Thu Sep 05 2021 22:00:12 GMT+0200 (South Africa Standard Time)',
    },
    2: {
        title: 'O',
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
    let today = new Date()
    let d = new Date(habitData[key]['start'])
    count.innerText = (today-d)/(1000*60*60*24)


    let habitReset = document.createElement('div')
    habitReset.classList.add('reset')
    let habitResetButton = document.createElement('button')
    habitResetButton.innerText = "Reset"
    habitReset.appendChild(habitResetButton)

    // child appending
    habitTitle.appendChild(habitTitleSpan)
    habit.appendChild(habitTitle)

    habitBody.appendChild(count)
    habitBody.appendChild(habitReset)
    habit.appendChild(habitBody)

    habitZone.appendChild(habit)


}