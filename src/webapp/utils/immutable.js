export function immutablePush(arry, element) {
    return [].concat(arry, element);
}

export function immutableUnshift(arry, element) {
    return [].concat(element, arry);
}

export function immutableSplice(arry, start, deleteCount) {
    var _len = arguments.length
    var items = Array(_len > 3 ? _len - 3 : 0)
    for (var _key = 3; _key < _len; _key++) {
        items[_key - 3] = arguments[_key];
    }
    return [].concat(arr.slice(0, start), items, arr.slice(start + deleteCount))
}

export function immutableDelete(arry, index) {
    return arry.slice(0, index).concat(arry.slice(index + 1));
}