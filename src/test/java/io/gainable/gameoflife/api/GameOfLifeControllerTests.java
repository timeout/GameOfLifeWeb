package io.gainable.gameoflife.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.gainable.gameoflife.HabitatConfiguration;
import io.gainable.gameoflife.HabitatCoordinate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.Collection;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GameOfLifeControllerTests {

    private static final String RESOURCE_URI="/api/gameoflife";

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    @DisplayName("POST returns a habitat description")
    public void getHabitatDescription(@Autowired MockMvc mockMvc) throws Exception {

        Collection<HabitatCoordinate> aSeedColony = Arrays.asList(
                new HabitatCoordinate(1, 2),
                new HabitatCoordinate(2, 2),
                new HabitatCoordinate(3, 2)
        );
        HabitatConfiguration aHabitatConfiguration = new HabitatConfiguration(5, 5, aSeedColony);

        MvcResult result = mockMvc.perform(post(RESOURCE_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(aHabitatConfiguration)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.width").value(5L))
                .andExpect(jsonPath("$.length").value(5L))
                .andExpect(jsonPath("$.seedColony").isArray())
                .andExpect(jsonPath("$.seedColony", hasSize(3)))
                .andExpect(jsonPath("$..row",
                        hasItems(2, 2, 2)))
                .andExpect(jsonPath("$..column",
                        hasItems(1, 2, 3)))
                .andReturn();

        MockHttpServletResponse mockResponse = result.getResponse();
    }
}
