package com.tasklist.controllers;

import com.tasklist.domain.Task;
import com.tasklist.services.TaskService;
import com.tasklist.so.TaskSo;
import com.tasklist.so.TaskStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping(value = "/create-task")
    public ResponseEntity<TaskSo> createTask(@RequestBody TaskSo taskSo) {
       return new ResponseEntity<>(taskService.createTask(taskSo), HttpStatus.CREATED);
    }

    @Operation(parameters = {
            @Parameter(in = ParameterIn.QUERY, name = "page", content = @Content(schema = @Schema(type = "integer"))),
            @Parameter(in = ParameterIn.QUERY, name = "size", content = @Content(schema = @Schema(type = "integer"))),
            @Parameter(in = ParameterIn.QUERY, name = "sort",
                    content = @Content(array = @ArraySchema(schema = @Schema(type = "string")))
            )
    })
    @PostMapping(value = "/task")
    public ResponseEntity<Page<Task>> getAllTask(@Parameter(hidden = true) Pageable pageable) {
        return new ResponseEntity<>(taskService.getAllTasks(pageable), HttpStatus.OK);
    }
    @GetMapping(value = "/task/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable Long id){
        return new ResponseEntity<>(taskService.getById(id), HttpStatus.OK);
    }

    @PutMapping(value = "/task/{id}")
    public ResponseEntity<TaskSo> editTask(@PathVariable Long id,@Valid @RequestBody TaskSo taskSo){
        return new ResponseEntity<>(taskService.editTask(id, taskSo), HttpStatus.ACCEPTED);
    }
    @PutMapping(value = "/task-status/{id}")
    public ResponseEntity<Task> changeStatus(@PathVariable Long id, @RequestParam TaskStatus taskStatus){
        return new ResponseEntity<>(taskService.changeStatus(id, taskStatus), HttpStatus.OK);
    }
    @DeleteMapping(value = "/task/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
