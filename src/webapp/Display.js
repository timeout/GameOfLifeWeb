import Component from './component'
import { newElement } from './utils/dom'
import { immutablePush } from "./utils/immutable";

import DisplayItem from "./DisplayItem";

export default class Display extends Component {
    constructor() {
        super();

        this._element = newElement('div', {id: 'display'})
        this.style = {
            width: "200px"
        }

        this.resetDisplay = this.resetDisplay.bind(this)
        this.element.addEventListener('resetDisplay', this.resetDisplay)
        this.resetDisplay()

        this.updateHabitatListener = this.updateHabitatListener.bind(this)
        this.element.addEventListener('updateHabitatEvent', this.updateHabitatListener)
    }

    resetDisplay () {
        this.metaInfo = [{
            numberOfCells: 0,
            difference: 0,
            turn: 0
        }]
        this.removeAllChildren()
        this.rerender()
    }

    updateHabitatListener (e) {
        const { detail: { seedColony } } = e
        const lastMetaInfo = this.metaInfo[this.metaInfo.length - 1]
        const numberOfCells = seedColony.length
        const difference = lastMetaInfo.numberOfCells - numberOfCells
        const turn = lastMetaInfo.turn + 1
        this.metaInfo = immutablePush(this.metaInfo, {
            numberOfCells, difference, turn
        })

        this.addChildToFront(new DisplayItem({numberOfCells, difference, turn}))
        this.rerender()
    }
}
