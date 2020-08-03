import Component from './component'
import { newElement } from './utils/dom'

import Display from './Display'

export default class InfoDisplay extends Component {
    constructor() {
        super();
        this.metaInfo = [{
            numberOfCells: 10,
            difference: 10,
            turn: 0
        }]

        this._element = newElement('div', {id: 'info-display'})

        this.style = {
            width: "200px",
            height: "500px",
            "margin-left": "10px",
            "overflow-y": "scroll",
            "overflow-x": "hidden",
            border: "black solid 1px"
        }
        this.addChild(new Display())
    }
}
