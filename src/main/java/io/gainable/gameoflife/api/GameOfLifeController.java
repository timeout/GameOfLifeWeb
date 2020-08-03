package io.gainable.gameoflife.api;

import io.gainable.gameoflife.HabitatConfiguration;
import io.gainable.gameoflife.Simulation;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gameoflife")
public class GameOfLifeController {

    @PostMapping
    public ResponseEntity<HabitatConfiguration> createHabitatDescription(
            @RequestBody HabitatConfiguration habitatConfiguration) {
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(
                Simulation.evolute(habitatConfiguration), headers, HttpStatus.CREATED);
    }
}
