package io.gainable.gameoflife;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.function.Predicate.not;

public class Habitat {

    private long width;
    private long length;
    private Map<HabitatCoordinate, Cell> cellMap;

    public Habitat(HabitatConfiguration configuration) {
        width = configuration.getWidth();
        length = configuration.getLength();
        Collection<HabitatCoordinate> seedColony = configuration.getSeedColony();

        cellMap = new HashMap<>();
        for (long row = 0; row < length; row++) {
            for (long column = 0; column < width; column++) {
                HabitatCoordinate habitatCoordinate = new HabitatCoordinate(row, column);
                if (seedColony.contains(habitatCoordinate)) {
                    cellMap.put(habitatCoordinate, new Cell(true));
                } else {
                    cellMap.put(habitatCoordinate, new Cell(false));
                }
            }
        }
    }

    public long size() {
        return cellMap.size();
    }

    public long getWidth() {
        return width;
    }

    public long getLength() {
        return length;
    }

    public Map<HabitatCoordinate, Cell> getCellMap() {
        return cellMap;
    }

    public Cell getCellAt(HabitatCoordinate habitatCoordinate) {
        Cell foundCell = cellMap.get(habitatCoordinate);
        return new Cell(foundCell.isAlive());
    }
    
    public Collection<HabitatCoordinate> removeCoordinatesOutsideBoundaries(
            Collection<HabitatCoordinate> neighbourhoodCoordinates) {
        return neighbourhoodCoordinates.stream()
                .filter(not(this::isCoordinateRowOutOfBounds))
                .filter(not(this::isCoordinateColumnOutOfBounds))
                .collect(Collectors.toList());
    }

    public boolean isCoordinateRowOutOfBounds(HabitatCoordinate coordinate) {
        long rowCoordinate = coordinate.getRow();
        return rowCoordinate < 0 || rowCoordinate >= getWidth();
    }

    public boolean isCoordinateColumnOutOfBounds(HabitatCoordinate coordinate) {
        long columnCoordinate = coordinate.getColumn();
        return columnCoordinate < 0 || columnCoordinate >= getLength();
    }
}
