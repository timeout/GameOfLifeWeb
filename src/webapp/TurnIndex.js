import Component from './component'
import { newElement } from './utils/dom'

export default class TurnIndex extends Component {
    constructor({ turn }) {
        super();
        this._element = newElement("div", {}, turn)
        this.style = {
            "height": "2em",
            "width": "40px",
            "flex-grow": "1",
            "font-size": "2em",
            "text-align": "center",
            "line-height": "2em",
            "white-space": "nowrap"
        }
    }
}
