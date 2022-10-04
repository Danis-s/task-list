package com.tasklist.services;

import com.tasklist.Mapper.TaskMapper;
import com.tasklist.domain.Task;
import com.tasklist.repository.TaskDAO;
import com.tasklist.so.TaskSo;
import com.tasklist.so.TaskStatus;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class TaskService {
    private TaskDAO taskDAO;

    private TaskMapper taskMapper;

    @Autowired
    public void setTaskMapper(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Autowired
    public void setTaskDAO(TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    public TaskSo createTask(TaskSo taskSo) {
        Task task = taskMapper.mapToEntity(taskSo);
        task.setCreated(LocalDateTime.now());
        task.setEdited(LocalDateTime.now());
        task.setTaskStatus(TaskStatus.CREATED);
        taskDAO.save(task);
        return taskMapper.mapToSo(task);
    }

    public Page<Task> getAllTasks(Pageable pageable) {
        return taskDAO.findAll(pageable);
    }

    public Optional<Task> getById(Long id) {
        return taskDAO.findById(id);
    }

    public TaskSo editTask(Long id, TaskSo taskSo) {
//        Optional<Task> task = taskDAO.findById(id);
        Task task = findTaskById(id);
        task.setTitle(taskSo.getTitle());
        task.setEdited(LocalDateTime.now());
        task.setDescription(taskSo.getDescription());
        taskDAO.save(task);
        return taskMapper.mapToSo(task);
    }

    public void deleteTask(Long id) {
        taskDAO.deleteById(id);
    }

    public Task changeStatus(Long id, TaskStatus taskStatus){
        Optional<Task> task = taskDAO.findById(id);
        task.get().setEdited(LocalDateTime.now());
        task.get().setTaskStatus(taskStatus);
        return taskDAO.save(task.get());
    }

    public Task findTaskById(Long id){
        return taskDAO.findById(id).orElseThrow();
    }
}
