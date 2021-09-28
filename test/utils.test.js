import { getItemInListIndex } from './../utils.js'
import { calculateTimeDiffArray } from './../utils.js'
import { dragAndDropReorder } from './../utils.js'
import { getHabitBadges } from './../utils.js'
import { getCalendarData } from './../utils.js'

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

/* dragAndDropReorder */
test('start < end', function() {
    var habitData = {0:0, 1:1, 2:2, 3:3, 4:4}
    dragAndDropReorder(habitData, 0, 1)
    expect(habitData).toEqual({0:1, 1:0, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 1, 3)
    expect(habitData).toEqual({0:1, 1:2, 2:3, 3:0, 4:4})
    dragAndDropReorder(habitData, 3, 4)
    expect(habitData).toEqual({0:1, 1:2, 2:3, 3:4, 4:0})
    dragAndDropReorder(habitData, 0, 4)
    expect(habitData).toEqual({0:2, 1:3, 2:4, 3:0, 4:1})

    var habitData = {0:0, 1:1}
    dragAndDropReorder(habitData, 0, 1)
    expect(habitData).toEqual({0:1, 1:0})

})

test('start > end', function() {
    var habitData = {0:0, 1:1, 2:2, 3:3, 4:4}
    dragAndDropReorder(habitData, 1, 0)
    expect(habitData).toEqual({0:1, 1:0, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 3, 1)
    expect(habitData).toEqual({0:1, 1:3, 2:0, 3:2, 4:4})
    dragAndDropReorder(habitData, 4, 3)
    expect(habitData).toEqual({0:1, 1:3, 2:0, 3:4, 4:2})
    dragAndDropReorder(habitData, 4, 0)
    expect(habitData).toEqual({0:2, 1:1, 2:3, 3:0, 4:4})

    var habitData = {0:0, 1:1}
    dragAndDropReorder(habitData, 1, 0)
    expect(habitData).toEqual({0:1, 1:0})
})

test('start == end', function() {
    var habitData = {0:0, 1:1, 2:2, 3:3, 4:4}
    dragAndDropReorder(habitData, 0, 0)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 1, 1)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 2, 2)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 3, 3)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:3, 4:4})
    dragAndDropReorder(habitData, 4, 4)
    expect(habitData).toEqual({0:0, 1:1, 2:2, 3:3, 4:4})
})

test('invalid drag and drop', function() {
    var habitData = {0:0, 1:1, 2:2, 3:3, 4:4}
    expect(() => {
        dragAndDropReorder(habitData, 0, 5)
    }).toThrow(RangeError)
    expect(() => {
        dragAndDropReorder(habitData, 3, -1)
    }).toThrow(RangeError)
    expect(() => {
        dragAndDropReorder(habitData, 5, 4)
    }).toThrow(RangeError)
    expect(() => {
        dragAndDropReorder(habitData, -1, 4)
    }).toThrow(RangeError)
})

/* getHabitBadges */
test('Get badges: exceptions', function() {
    expect(() => {getHabitBadges("", 0, new Date())}).toThrow(TypeError)
    expect(() => {getHabitBadges([], 0, new Date())}).toThrow(RangeError)
    expect(() => {getHabitBadges(["2021-09-27T18:19:21.111Z", "2021-09-27T18:19:21.110Z"], 0, new Date())}).toThrow(RangeError)
    expect(() => {getHabitBadges(["2021-09-27T18:19:21.111Z"], -1, new Date())}).toThrow(RangeError)
    expect(() => {getHabitBadges(["2021-09-27T18:19:21.111Z"], 2, new Date())}).toThrow(RangeError)
    expect(() => {getHabitBadges(["2021-09-27T18:19:21.111Z"], 0, new Date("2020-09-27T18:19:21.111Z"))}).toThrow(RangeError)
    expect(() => {getHabitBadges(["2021-09-27T18:19:21.111Z"], 0, "")}).toThrow(TypeError)
})

test('Get badges: n=1', function() {
    expect(getHabitBadges(["2021-09-27T18:19:21.111Z"], 0, new Date("2021-09-27T18:19:21.111Z"))).toEqual([{'class':'best','text':'best'}])
    expect(getHabitBadges(["2021-09-27T18:19:21.111Z"], 0, new Date("2022-09-27T18:19:21.111Z"))).toEqual([{'class':'year','text':'1-year'}, {'class':'best','text':'best'}])
    expect(getHabitBadges(["2021-09-27T18:19:21.111Z"], 0, new Date("2021-10-27T18:19:21.111Z"))).toEqual([{'class':'month','text':'1-month'}, {'class':'best','text':'best'}])
    expect(getHabitBadges(["2021-09-01T18:19:21.111Z"], 0, new Date("2021-09-18T18:19:21.111Z"))).toEqual([{'class':'week','text':'2-week'}, {'class':'best','text':'best'}])
    expect(getHabitBadges(["2021-09-01T18:19:21.111Z"], 0, new Date("2021-09-05T18:19:21.111Z"))).toEqual([{'class':'day','text':'4-day'}, {'class':'best','text':'best'}])
})

test('Get badges: n=2', function() {
    var starts = ["2021-09-27T18:19:21.111Z","2021-09-27T18:19:22.111Z"]
    expect(getHabitBadges(starts, 0, new Date("2021-09-27T18:19:24.111Z"))).toEqual([])
    expect(getHabitBadges(starts, 1, new Date("2021-09-27T18:19:24.111Z"))).toEqual([{'class':'best','text':'best'}])

    starts[0] = "2021-09-27T18:19:15.111Z"
    expect(getHabitBadges(starts, 0, new Date("2021-09-27T18:19:24.111Z"))).toEqual([{'class':'best','text':'best'}])
    expect(getHabitBadges(starts, 1, new Date("2021-09-27T18:19:24.111Z"))).toEqual([])
})

test('Get badges: n>2', function() {
    // var starts = ["2021-09-27T18:19:21.111Z","2021-09-27T18:19:21.111Z","2021-09-27T18:19:21.111Z"]
    var starts = ["2021-09-27T18:19:21.111Z","2021-09-28T18:19:21.111Z","2021-09-30T18:19:21.111Z","2021-12-27T18:19:21.111Z"]
    expect(getHabitBadges(starts, 0, new Date("2025-12-27T18:19:21.111Z"))).toEqual([{'class':'day','text':'1-day'}])
    expect(getHabitBadges(starts, 1, new Date("2025-12-27T18:19:21.111Z"))).toEqual([{'class':'day','text':'2-day'}, {'class':'better','text':'better'}])
    expect(getHabitBadges(starts, 2, new Date("2025-12-27T18:19:21.111Z"))).toEqual([{'class':'month','text':'3-month'}])
    expect(getHabitBadges(starts, 3, new Date("2025-12-27T18:19:21.111Z"))).toEqual([{'class':'year','text':'4-year'}, {'class':'best','text':'best'}])
    starts[0] = "2015-09-27T18:19:21.111Z"
    expect(getHabitBadges(starts, 0, new Date("2025-12-27T18:19:21.111Z"))).toEqual([{'class':'year','text':'6-year'}, {'class':'best','text':'best'}])
})


/* getCalendarData */
test('Get calendarData: stick to 1 month; start and end at ends', function() {
    /* input */
    var starts = ["2000-01-01T18:19:21.111Z","2000-01-01T18:19:21.111Z","2000-01-07T18:19:21.111Z","2000-01-08T18:19:21.111Z","2000-01-09T18:19:21.111Z"]

    /* output */
    var output = {}
    output['2000'] = {}
    output['2000']['January'] = {}
    // success
    for (var i = 1; i < 32; i++) {
        output['2000']['January'][i] = 'success'
    }
    // fail
    [1, 7, 8, 9].forEach(function(day) {
        output['2000']['January'][day] = 'fail'
    });
    // future
    output['2000']['January'][31] = 'future'
    expect(getCalendarData(starts, new Date("2000-01-31T18:19:21.111Z"))).toEqual(output)
})

test('Get calendarData: stick to 1 month; start and end in the middle', function() {
    /* input */
    var starts = ["2000-01-05T18:19:21.111Z","2000-01-06T18:19:21.111Z","2000-01-15T18:19:21.111Z","2000-01-20T18:19:21.111Z","2000-01-22T18:19:21.111Z"]

    /* output */
    var output = {}
    output['2000'] = {}
    output['2000']['January'] = {}
    // past
    for (var i = 1; i < 5; i++) {
        output['2000']['January'][i] = 'past'
    }
    // success
    for (var i = 5; i < 26; i++) {
        output['2000']['January'][i] = 'success'
    }
    // fail
    [6, 15, 20, 22].forEach(function(day) {
        output['2000']['January'][day] = 'fail'
    });
    // future
    for (var i = 26; i < 32; i++) {
        output['2000']['January'][i] = 'future'
    }
    expect(getCalendarData(starts, new Date("2000-01-26T18:19:21.111Z"))).toEqual(output)
})

test('Get calendarData: cross month barrier by 1 day + leap year', function() {
    /* input */
    var starts = ["2000-01-01T18:19:21.111Z","2000-01-01T18:19:21.111Z","2000-01-07T18:19:21.111Z","2000-01-08T18:19:21.111Z","2000-01-09T18:19:21.111Z"]

    /* output */
    var output = {}
    output['2000'] = {}
    output['2000']['January'] = {}
    // success
    for (var i = 1; i < 32; i++) {
        output['2000']['January'][i] = 'success'
    }
    // fail
    [1, 7, 8, 9].forEach(function(day) {
        output['2000']['January'][day] = 'fail'
    });
    // future
    output['2000']['February'] = {}
    for (var i = 1; i < 30; i++) {
        output['2000']['February'][i] = 'future'
    }
    expect(getCalendarData(starts, new Date("2000-02-01T18:19:21.111Z"))).toEqual(output)
})

test('Get calendarData: cross year & month barier', function() {
    /* input */
    var starts = ["1999-12-25T18:19:21.111Z", "2000-01-01T18:19:21.111Z","2000-01-03T18:19:21.111Z","2000-01-07T18:19:21.111Z","2000-01-08T18:19:21.111Z","2000-01-09T18:19:21.111Z"]

    /* output */
    var output = {}
    output['1999'] = {}
    output['1999']['December'] = {}
    output['2000'] = {}
    output['2000']['January'] = {}
    // success
    for (var i = 1; i < 32; i++) {
        output['1999']['December'][i] = 'success'
    }
    for (var i = 1; i < 32; i++) {
        output['2000']['January'][i] = 'success'
    }
    // fail
    [1, 3, 7, 8, 9].forEach(function(day) {
        output['2000']['January'][day] = 'fail'
    });
    // future
    for (var i = 28; i < 32; i++) {
        output['2000']['January'][i] = 'future'
    }
    // past
    for (var i = 1; i < 25; i++) {
        output['1999']['December'][i] = 'past'
    }
    expect(getCalendarData(starts, new Date("2000-01-28T18:19:21.111Z"))).toEqual(output)
})