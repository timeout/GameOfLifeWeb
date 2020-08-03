import Component from './component'
import { newElement } from './utils/dom'

export default class InfoDisplay extends Component {
    constructor() {
        super();
        this._element = newElement('div', {id: 'info-display'})

        this.element.addEventListener('updateHabitat', function () {
            console.log('***** event')
        }, false)
    }
}
