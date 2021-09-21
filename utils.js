export function getItemInListIndex(item, list) {
    for (var i = 0; i < list.length; i++) {
        if (item == list[i]) return(i)
    }
    return(-1)
}