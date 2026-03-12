package com.example.backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.backend.dto.request.TaskCreationRequest;
import com.example.backend.dto.request.TaskUpdateRequest;
import com.example.backend.entity.Task;
import com.example.backend.exception.AppException;
import com.example.backend.exception.ErrorCode;
import com.example.backend.mapper.TaskMapper;
import com.example.backend.repository.TaskRepository;

@Service
public class TaskService {
    public long countByCompleted(boolean completed) {
        return taskRepository.countByCompleted(completed);
    }

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskMapper taskMapper;

    public Page<Task> getTasks(int pageNumber, int pageSize, String filter) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        if (filter == null || filter.equalsIgnoreCase("all")) {
            return taskRepository.findAll(pageable);
        }
        if (filter.equalsIgnoreCase("completed")) {
            return taskRepository.findAllByCompleted(true, pageable);
        }
        if (filter.equalsIgnoreCase("active")) {
            return taskRepository.findAllByCompleted(false, pageable);
        }
        return taskRepository.findAll(pageable);
    }

    public Task getTask(long id) {
        return taskRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.TASK_NOT_FOUND));
    }

    public Task createTask(TaskCreationRequest request) {
        if (taskRepository.existsByTitle(request.getTitle())) {
            throw new AppException(ErrorCode.TASK_EXISTED);
        }

        Task task = taskMapper.toTask(request);

        if (task == null) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }

        return taskRepository.save(task);
    }

    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    public Task toggleTaskStatus(long id) {
        Task task = getTask(id);

        task.setCompleted(!task.isCompleted());
        task.setCompletedAt(task.isCompleted() ? LocalDateTime.now() : null);

        return taskRepository.save(task);
    }

    public Task updateTaskTitle(long id, TaskUpdateRequest request) {
        Task task = getTask(id);
        task.setTitle(request.getTitle());

        return taskRepository.save(task);
    }

}
