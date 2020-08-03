package io.gainable.gameoflife;

public class BadConfigurationError extends RuntimeException {
    public BadConfigurationError(String errorMessage) {
        super(errorMessage);
    }
}
