package io.gainable.gameoflife;

import java.util.Collection;

public class Cell {
    private boolean isAlive;

    public Cell(boolean isAlive) {
       this.isAlive = isAlive;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public Cell transition(Environment environment) {
        long livingNeighbours = environment.liveNeighbourCount();
        if (!isAlive()) {
           if (livingNeighbours == 3) {
               return new Cell(true);
           }
        } else {
            if (livingNeighbours < 2 || livingNeighbours > 3) {
               return new Cell(false);
            }
        }

        return this;
    }

    @Override
    public String toString() {
        return "Cell{" +
                "isAlive=" + isAlive +
                '}';
    }
}
