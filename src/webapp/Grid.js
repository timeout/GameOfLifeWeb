import Component from './component'
import {
    newElement,
    newSvgElement
} from './utils/dom'

export default class Grid extends Component {
    constructor({ width, length, seedColony }) {
        super()

        this._element = newElement('div', {
            className: 'grid'
        })

        const strokeWidth = 1 / width
        const viewBoxWidth = 10 * width + strokeWidth
        const viewBoxHieght = 10 * length + strokeWidth

        const svg = newSvgElement('svg',
            {
                width: '100%',
                height: '100%',
                viewBox: `0 0 ${viewBoxWidth} ${viewBoxHieght}`,
                preserveAspectRatio: 'none',
            })

        for (let x = 0; x < 10 * width; x += 10) {
            for (let y = 0; y < 10 * length; y += 10) {
                const internalBoundary = newSvgElement('rect',
                    {
                        x: `${x + strokeWidth/2}`,
                        y: `${y + strokeWidth/2}`,
                        width: 10,
                        height: 10,
                        fill: "white",
                        stroke: "black",
                        "stroke-width": `${strokeWidth}`
                    })
               svg.appendChild(internalBoundary)
            }
        }

        this.element.appendChild(svg)

        seedColony.map(cellCoordinate => {
            const {row, column} = cellCoordinate
            const cell = newSvgElement('rect',
                {
                    x: `${row * 10}`,
                    y: `${column * 10}`,
                    width: 10,
                    height: 10
                })
            svg.appendChild(cell)
        })
    }
}