package io.gainable.gameoflife;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

public class HabitatCoordinate {
    private long row;
    private long column;

    public HabitatCoordinate(long row, long column) {
        this.row = row;
        this.column = column;
    }

    public long getRow() {
        return row;
    }

    public long getColumn() {
        return column;
    }

    public Collection<HabitatCoordinate> generateBoundingCoordinates() {
        Collection<HabitatCoordinate> result = new ArrayList<>();
        for (long i = getRow() - 1; i < getRow() + 2; i++) {
            for (long j = getColumn() - 1; j < getColumn() + 2; j++) {
                HabitatCoordinate boundingCoordinate = new HabitatCoordinate(i, j);
                if (boundingCoordinate.equals(this))
                    continue;
                result.add(boundingCoordinate);
            }
        }
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HabitatCoordinate that = (HabitatCoordinate) o;
        return getRow() == that.getRow() &&
                getColumn() == that.getColumn();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRow(), getColumn());
    }

    @Override
    public String toString() {
        return "HabitatCoordinate{" +
                "row=" + row +
                ", column=" + column +
                '}';
    }
}
