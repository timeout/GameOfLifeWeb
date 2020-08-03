import Component from './component'
import { newElement } from './utils/dom'

export default class Button extends Component {
    constructor(handlButtonClick) {
        super();

        this._element = newElement('button', {}, "Start")
        this.style = {
            "margin-top": "10px",
            padding: "10px"
        }
        this.element.addEventListener("click", handlButtonClick, false)
    }
}
