package io.gainable.gameoflife;

import java.util.Collection;

public class Environment {
    private Collection<Cell> neighbours;

    public Environment(Collection<Cell> neighbours) {
        this.neighbours = neighbours;
    }

    public long liveNeighbourCount() {
       return neighbours.stream().filter(Cell::isAlive).count();
    }
}
