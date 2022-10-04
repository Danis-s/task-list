package com.tasklist;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tasklist.so.TaskSo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@ContextConfiguration
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK
)
@DirtiesContext
public class TaskControllerTest {

    protected ObjectMapper objectMapper = JsonMapper.builder()
            .addModule(new JavaTimeModule())
            .build();

    public final int taskId = 1;

    private MockMvc mvc;

    @Autowired
    public void setMvc(MockMvc mvc) {
        this.mvc = mvc;
    }

    @Autowired
    public WebApplicationContext webApplicationContext;

    public String asJsonString(final Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void getTaskById() throws Exception {
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
                .get("http://localhost:8080/api/task/{id}", taskId)
                .contentType(MediaType.APPLICATION_JSON_VALUE);
        mvc.perform(builder)
//                .andExpect(jsonPath("$.taskId").isNotEmpty())
                .andExpect(status().isOk());
    }

    @Test
    public void createTask() throws Exception {
        TaskSo taskSo = new TaskSo();
        taskSo.setTitle("testTitle");
        taskSo.setDescription("testDescription");
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
                .post("http://localhost:8080/api/create-task")
                .content(asJsonString(taskSo))
                .contentType(MediaType.APPLICATION_JSON_VALUE);
        mvc.perform(builder)
                .andExpect(status().isCreated());
    }
//    @Test
//    public void editTask() throws Exception {
//        TaskSo taskSo = new TaskSo();
//        taskSo.setTitle("testTitle");
//        taskSo.setDescription("testDescription");
//        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
//                .put("http://localhost:8080/api/task/{id}", taskId)
//                .content(asJsonString(taskSo))
//                .contentType(MediaType.APPLICATION_JSON_VALUE);
//        mvc.perform(builder)
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
}
