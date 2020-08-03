import Component from './component'
import { newElement } from './utils/dom'

export default class Button extends Component {
    constructor(handlButtonClick) {
        super();

        this._element = newElement('button', {}, "Start")
        this.style = {
            "position": "absolute",
            "width": "100px",
            "margin-top": "510px",
            padding: "10px"
        }
        this.element.addEventListener("click", handlButtonClick, false)
    }
}
