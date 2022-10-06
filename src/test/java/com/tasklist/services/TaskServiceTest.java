package com.tasklist.services;

import com.tasklist.domain.Task;
import com.tasklist.repository.TaskDAO;

import com.tasklist.so.TaskSo;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


class TaskServiceTest {

    @Mock
    private TaskDAO taskrepo;

    @InjectMocks
    private TaskService service;

    @Test
    void when_save_task_it_should_return_task() {
        TaskSo task = new TaskSo();
        task.setTitle("Test");
        task.setDescription("bla-bla");

        when(taskrepo.save(any(Task.class))).thenReturn(new Task());

        TaskSo created = service.createTask(task);

        assertThat(created.getTitle()).isSameAs(task.getTitle());
    }

}