import { findNextHabitIndex, addNewHabitByIndex, deleteHabitByIndex } from './crud.js'

/* ADD */
test('Find next habit index', function() {
    expect(findNextHabitIndex({})).toEqual(0)
    expect(findNextHabitIndex({0:0})).toEqual(1)
    expect(findNextHabitIndex({0:0, 1:1})).toEqual(2)
    findNextHabitIndex({0:0, 6:1})
    expect(findNextHabitIndex({0:0, 6:1})).toEqual(7)
})

test('Add habit', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    addNewHabitByIndex(habitData, 'data', 3)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:'data'})
    addNewHabitByIndex(habitData, 'data', 3)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:'data'})
    expect(habitData).toEqual({0:0, 1:'data', 2:2, 3:'data'})
})

/* DELETE */
test('Last index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 2)
    expect(habitData).toEqual({0:0, 1:1})
})

test('Inner index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 1)
    expect(habitData).toEqual({0:0, 1:2})
})

test('First index delete', function() {
    var habitData = {0: 0, 1: 1, 2: 2}
    deleteHabitByIndex(habitData, 0)
    expect(habitData).toEqual({0:1, 1:2})
})

test('Index Out Of Bounds', () => {
    var habitData = {0: 0, 1: 1, 2: 2}
    expect(() => {
        deleteHabitByIndex(habitData, 3)
    }).toThrow(RangeError)
    expect(() => {
        deleteHabitByIndex(habitData, -1)
    }).toThrow(RangeError)
})

test('Null habit data', () => {
    var habitData = null
    expect(() => {
        deleteHabitByIndex(habitData, 3)
    }).toThrow(ReferenceError)
})