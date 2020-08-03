import Component from './component'
import { newElement } from './utils/dom'

import NumberOfCellsDisplay from './NumberOfCellsDisplay'
import Delta from './Delta'

export default class StatsDisplay extends Component {
    constructor({ numberOfCells, difference }) {
        super();
        this._element = newElement("div")
        this.style = {
            display: "flex",
            "flex-direction": "column",
            "justify-content": "space-around",
            "flex-grow": "3"
        }
        this.addChild(new NumberOfCellsDisplay({ numberOfCells }))
        this.addChild(new Delta({ difference }))
    }
}
