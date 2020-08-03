import Component from './component'
import { newElement } from './utils/dom'

import Grid from './Grid'

export default class Habitat extends Component {
    constructor(habitatConfiguration) {
        super();

        this._element = newElement('div', {id: 'habitat'})
        this.style = {
            width: "500px",
            height: "500px"
        }

        this.grid = new Grid(habitatConfiguration)
        this.addChild(this.grid)

        this.updateSeedColonyListener = this.updateSeedColonyListener.bind(this)
        this.element.addEventListener('updateHabitatEvent', this.updateSeedColonyListener)
    }

    updateSeedColonyListener (e) {
        const { detail } = e
        this.updateGrid(detail)
    }

    updateGrid (habitatConfiguration) {
        this.removeChild(this.grid)
        this.grid = new Grid(habitatConfiguration)
        this.addChild(this.grid)
        this.rerender()
    }
}