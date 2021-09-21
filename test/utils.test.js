import { getItemInListIndex } from './../utils.js'
import { calculateTimeDiffArray } from './../utils.js'

/* getItemInListIndex */
test('Get first item in list', function() {
    var item = ['a']
    var list = [item, ['b'], ['c']]
    expect(getItemInListIndex(item, list)).toEqual(0)
})

test('Get inner item in list + first instance', function() {
    var item = ['b']
    var list = [['a'], item, item]
    expect(getItemInListIndex(item, list)).toEqual(1)
})

test('Get last item in list', function() {
    var item = ['c']
    var list = [['a'], ['b'], item]
    expect(getItemInListIndex(item, list)).toEqual(2)
})

test('Get item not list', function() {
    var item = ['c']
    var list = [['a'], ['b'], ['c']]
    expect(getItemInListIndex(item, list)).toEqual(-1)
})

/* calculateTimeDiffArray */
test('No time diff', function() {
    expect(calculateTimeDiffArray(new Date(), new Date())).toEqual([0, 0, 0, 0, 0, 0])
    expect(calculateTimeDiffArray(new Date('2019-06-11T00:00:00'), new Date('2019-06-11T00:00:00'))).toEqual([0, 0, 0, 0, 0, 0])
})

test('No negative diff', function() {
    expect(() => {
        calculateTimeDiffArray(new Date('2019-06-11T00:00:01'), new Date('2019-06-11T00:00:00'))
    }).toThrow(RangeError)
})

test('Seconds diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-06-11T00:00:01')
    )).toEqual([0, 0, 0, 0, 0, 1])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-06-11T00:00:31')
    )).toEqual([0, 0, 0, 0, 0, 31])
})

test('Minute diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-06-11T00:01:00')
    )).toEqual([0, 0, 0, 0, 1, 0])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:31'),
        new Date('2019-06-11T00:05:20')
    )).toEqual([0, 0, 0, 0, 4, 49])
})

test('Hour diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-06-11T04:00:00')
    )).toEqual([0, 0, 0, 4, 0, 0])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T13:00:46'),
        new Date('2019-06-11T23:12:25')
    )).toEqual([0, 0, 0, 10, 11, 39])
})

test('Day diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-06-13T00:00:00')
    )).toEqual([0, 0, 2, 0, 0, 0])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T22:40:01'),
        new Date('2019-06-25T12:25:15')
    )).toEqual([0, 0, 13, 13, 45, 14])
})

test('Month diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2019-12-11T00:00:00')
    )).toEqual([0, 6, 0, 12, 0, 0])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T05:15:50'),
        new Date('2019-08-11T22:05:55')
    )).toEqual([0, 2, 0, 20, 50, 5])
})

test('Year diff', function() {
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T00:00:00'),
        new Date('2025-06-11T00:00:00')
    )).toEqual([6, 0, 2, 0, 0, 0])
    expect(calculateTimeDiffArray(
        new Date('2019-06-11T12:23:59'),
        new Date('2022-02-11T22:15:20')
    )).toEqual([2, 8, 3, 1, 51, 21])
})