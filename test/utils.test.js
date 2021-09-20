import { getItemInListIndex } from './../utils.js'

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