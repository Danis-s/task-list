package com.tasklist;


import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.assertj.core.api.Assertions.assertThat;


@Tag("apiDocs")
@SpringBootTest
@ContextConfiguration
@DirtiesContext
@AutoConfigureMockMvc
public class TaskListApplicationTests  {
	@Autowired
	protected MockMvc mvc;

	@Test
	public void apiDocs() throws Exception {
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/v3/api-docs.yaml")).andReturn();
		assertThat(mvcResult.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
		Files.write(Paths.get(System.getProperty("java.io.tmpdir"), "api-docs.yaml"),
				mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8).getBytes());
	}
}
