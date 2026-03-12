package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.request.TaskCreationRequest;
import com.example.backend.dto.request.TaskUpdateRequest;
import com.example.backend.dto.response.APIResponse;
import com.example.backend.dto.response.TaskListResponse;
import com.example.backend.entity.Task;
import com.example.backend.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public APIResponse<TaskListResponse> getTasks(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "5") int size,
                                                 @RequestParam(required = false) String filter) {
        APIResponse<TaskListResponse> apiResponse = new APIResponse<>();
        TaskListResponse response = new TaskListResponse();
        Page<Task> tasksPage = taskService.getTasks(page, size, filter);
        response.setPage(tasksPage);
        response.setActiveCount(taskService.countByCompleted(false));
        response.setCompletedCount(taskService.countByCompleted(true));
        apiResponse.setResult(response);
        apiResponse.setMessage("Lọc danh sách thành công");
        return apiResponse;
    }

    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable Long taskId) {
        return taskService.getTask(taskId);
    }

    @PostMapping
    public APIResponse<Task> createTask(@RequestBody @Valid TaskCreationRequest request) {
        APIResponse<Task> apiResponse = new APIResponse<>();
        apiResponse.setResult(taskService.createTask(request));
        return apiResponse;
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }

    @PatchMapping("/{taskId}/toggle")
    public Task toggleTaskStatus(@PathVariable Long taskId) {
        return taskService.toggleTaskStatus(taskId);
    }

    @PutMapping("/{taskId}")
    public Task updateTaskTitle(@PathVariable long taskId, @RequestBody TaskUpdateRequest request) {
        return taskService.updateTaskTitle(taskId, request);
    }

}
