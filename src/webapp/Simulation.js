import Component from './component'
import { newElement } from './utils/dom'
import { immutablePush } from './utils/immutable'

import Habitat from './Habitat'
import Button from './Button'
import InfoDisplay from './InfoDisplay'

import mockResponse from './mocks/habitatConfiguration'

const R_NUMBER = 33

const generateSeedColony = (width = 5, length = 5) => {
    let seedColony = []
    for(let row = 0; row < width; row++) {
        for (let column = 0; column < length; column++)  {
            // generate random number
            const sample = Math.random() * 100
            // console.log('sample:', sample)
            // console.log('r number:', R_NUMBER)

            // if number above threshold create cell otherwise continue
            if (R_NUMBER > sample) {
                const cellCoordinate = { row, column }
                seedColony = immutablePush(seedColony, cellCoordinate)
            }
        }
    }
    return seedColony
}

async function requestNextGeneration(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export default class Simulation extends Component {
    constructor(dimensions = { width: 5, length: 5}) {
        super();

        this.width = dimensions.width
        this.length = dimensions.length
        this.intervalId = null

        this.empty_habitat = {
            width: this.width,
            length: this.length,
            seedColony: []
        }

        this._element = newElement('div', {id: 'simulation'})

        this.handleButtonClick = this.handleButtonClick.bind(this)

        this.habitat = new Habitat(this.empty_habitat)

        this.addChild(this.habitat)
        this.addChild(new Button(this.handleButtonClick))
        this.addChild(new InfoDisplay())
    }

    updateHabitat (habitatConfiguration) {
        this.removeChild(this.habitat)
        this.habitat = new Habitat(habitatConfiguration)
        this.addChild(this.habitat)
        this.rerender()
    }

    handleButtonClick () {
        // reset
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }

        // generate initial seed colony
        const seedColony = generateSeedColony(this.width, this.length)
        let habitatConfiguration = Object.assign({}, this.empty_habitat, { seedColony })
        this.updateHabitat(habitatConfiguration)

        console.log(`A new simulation was started: ${new Date().toISOString()}`)

        // start requesting habitatConfigurations...
        this.intervalId = setInterval(() => {
            requestNextGeneration('http://localhost:8080/api/gameoflife', habitatConfiguration)
                .then(response => {
                    // console.log('response:', response)
                    habitatConfiguration = response
                    if (!habitatConfiguration.seedColony.length) {
                        console.log('goodbye')
                        clearInterval(this.intervalId)
                    }

                    this.updateHabitat(habitatConfiguration)

                    const updateHabitatEvent = new CustomEvent('updateHabitat', habitatConfiguration)
                    this._element.dispatchEvent(updateHabitatEvent)
                })
                .catch(err => {
                    console.log('Unable to fetch habitat configuration:', err);
                    clearInterval(this.intervalId)
                })
        }, 2000)
    }
}
