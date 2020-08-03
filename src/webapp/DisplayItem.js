import Component from './component'
import { newElement } from './utils/dom'

import TurnIndex from './TurnIndex'
import StatsDisplay from './StatsDisplay'

export default class DisplayItem extends Component {
    constructor({ numberOfCells, difference, turn }) {
        super();
        this._element = newElement("div")
        this.style = {
            display: "flex",
            "border-bottom": "rgba(0, 0, 0, 0.2) solid 1px"
        }

        this.addChild(new TurnIndex({ turn }))
        this.addChild(new StatsDisplay({ numberOfCells, difference }))
    }
}
