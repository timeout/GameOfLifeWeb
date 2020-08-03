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

        this.addChild(new Grid(habitatConfiguration))
    }
}