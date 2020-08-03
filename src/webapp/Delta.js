import Component from './component'
import { newElement } from './utils/dom'

export default class Delta extends Component {
    constructor({ difference }) {
        super();
        const diffOutput = (difference < 0) ? `+${difference * -1}` : `${difference * -1}`
        this._element = newElement("div", {}, `Delta: ${diffOutput}`)
        this.style = {
            "margin": "0.25em",
            "font-size": "1.2em",
            "white-space": "nowrap"
        }
    }
}
