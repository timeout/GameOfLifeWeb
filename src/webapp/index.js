import Simulation from './Simulation'

const app = document.getElementById("app")

const simulation = new Simulation({ width: 10, length: 10})
app.append(simulation.render())