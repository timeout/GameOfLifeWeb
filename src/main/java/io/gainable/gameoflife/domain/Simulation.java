package io.gainable.gameoflife;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

public class Simulation {
    public static HabitatConfiguration evolute(HabitatConfiguration habitatConfiguration) {
        Habitat habitat = new Habitat(habitatConfiguration);
        Map<HabitatCoordinate, Cell> cellMap = habitat.getCellMap();
        Collection<HabitatCoordinate> seedColony = cellMap.entrySet().stream()
                .filter(cellMapEntry -> {
                    HabitatCoordinate coordinate = cellMapEntry.getKey();
                    Cell cell = cellMapEntry.getValue();
                    Collection<HabitatCoordinate> boundingCoordinates =
                            coordinate.generateBoundingCoordinates();
                    Collection<HabitatCoordinate> validCellCoordinates =
                            habitat.removeCoordinatesOutsideBoundaries(boundingCoordinates);
                    Collection<Cell> neighbouringCells = validCellCoordinates.stream()
                            .map(habitat::getCellAt)
                            .collect(Collectors.toList());
                    Environment environment = new Environment(neighbouringCells);
                    Cell nextGeneration = cell.transition(environment);
                    return nextGeneration.isAlive();
                })
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
        return new HabitatConfiguration(
                habitatConfiguration.getWidth(), habitatConfiguration.getLength(), seedColony);
    }
}
