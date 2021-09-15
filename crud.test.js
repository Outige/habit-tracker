// const deleteHabitByIndex  = require('./crud.js')
// import { deleteHabitByIndex } from './crud.js'


test('last index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 2)
    expect(habitData).toEqual({0:0, 1:1})
})

test('test inner index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 1)
    expect(habitData).toEqual({0:0, 1:2})
})

test('test first index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 0)
    expect(habitData).toEqual({0:1, 1:2})
})