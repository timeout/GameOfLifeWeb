import {
    immutablePush,
    immutableUnshift,
    immutableDelete
} from './utils/immutable';

export default class Component {
    constructor() {
        this._element = null;
        this._style = '';
        this._children = [];
    }

    get element() { return this._element; }
    get children() { return this._children; }
    get style() { return this._style; }
    get hasChild() { return this._children.length > 0; }
    set style(styleObject) { this._applyStyleObject(styleObject); }

    addChild(child) {
        this._children = immutablePush(this.children, child);
        return this;
    }

    addChildToFront(child) {
        this._children = immutableUnshift(this.children, child);
        return this;
    }

    removeChild(needle) {
        var index = this._children.findIndex((child) => {
            return needle === child;
        });

        if (index > -1) {
            this._children = immutableDelete(this._children, index);
        }
        this.rerender();
        return this;
    }

    removeAllChildren() {
        this._children = [];
        this.rerender();
        return this;
    }

    render() {
        this._appendChildrenToDOM();
        return this.element;
    }

    rerender() {
        if (this.element.children.length > 0) {
            this._removeChildrenFromDOM();
        }
        this.render();
    }

    _removeChildrenFromDOM() {
        for (let i = this.element.children.length - 1; i >= 0 ; i--) {
            this.element.removeChild(this.element.children[i]);
        }
    }

    _appendChildrenToDOM() {
        for (let i = 0; i < this.children.length; i++) {
            this.element.appendChild(this.children[i].render())
        }
    }

    _styleObjectToString(styleObject) {
        var str = '';
        for (var prop in styleObject) {
            if (styleObject.hasOwnProperty(prop)) {
                str += `${prop}:${styleObject[prop]};`
            }
        }
        return ((str === '') ? '' : `${str}`);
    }

    _applyStyleObject(styleObject) {
        for (let prop in styleObject) {
            if (styleObject.hasOwnProperty(prop)) {
                this._element.style[prop] = styleObject[prop];
            }
        }
    }
};