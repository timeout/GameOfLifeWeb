import Component from './component'
import { newElement } from './utils/dom'

export default class NumberOfCellsDisplay extends Component {
    constructor({ numberOfCells }) {
        super();
        this._element = newElement("div", {}, `Live cells: ${numberOfCells}`)
        this.style = {
            "margin": "0.25em",
            "font-size": "1.2em",
            "white-space": "nowrap"
        }
    }
}
