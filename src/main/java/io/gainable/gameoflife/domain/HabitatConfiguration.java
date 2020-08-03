package io.gainable.gameoflife;

import java.util.Collection;

public class HabitatConfiguration {
    private long width;
    private long length;
    private Collection<HabitatCoordinate> seedColony;

    public HabitatConfiguration(long width, long length, Collection<HabitatCoordinate> seedColony) {
        if (width < 0) {
            throw new BadConfigurationError("Width must be positive:" + width);
        }
        if (length < 0) {
            throw new BadConfigurationError("Length must be positive:" + length);
        }
        seedColony.stream().forEach(coordinate -> {
            if (coordinate.getRow() >= width || coordinate.getColumn() >= length) {
                throw new BadConfigurationError(
                        "Seed colony definition out of bounds:" + coordinate);
            }
        });
        this.width = width;
        this.length = length;
        this.seedColony = seedColony;
    }

    public long getWidth() {
        return width;
    }

    public long getLength() {
        return length;
    }

    public Collection<HabitatCoordinate> getSeedColony() {
        return seedColony;
    }

    @Override
    public String toString() {
        return "HabitatConfiguration{" +
                "width=" + width +
                ", length=" + length +
                ", seedColony=" + seedColony +
                '}';
    }
}
