import {isEmpty} from './helpers';

export function newElement(name, attrObject, text) {
    var element = document.createElement(name);
    element = addElementAttributes(element, attrObject);
    element = addTextNode(element, text);
    return element;
}

export function addElementAttributes(element, attrObject) {
    if (attrObject === undefined || isEmpty(attrObject)) {
        return element;
    }
    Object.assign(element, attrObject);
    return element;
}

export function addTextNode(element, text) {
    if (text === undefined) {
        return element;
    }
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
    return element;
}

export function newSvgElement(name, attributes) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', name);
    svg = addSvgAttributes(svg, attributes);
    return svg;
}

export function addSvgAttributes(svg, attrObject) {
    if (attrObject === undefined || isEmpty(attrObject)) {
        return svg;
    }
    for (var attrKey in attrObject) {
        if (attrObject.hasOwnProperty(attrKey)) {
            svg.setAttribute(attrKey, attrObject[attrKey]);
        }
    }
    return svg
}