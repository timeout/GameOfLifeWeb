import Simulation from './Simulation'

const app = document.getElementById("app")

const simulation = new Simulation({ width: 50, length: 50})
app.append(simulation.render())