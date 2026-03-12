package com.example.backend.dto.response;

import org.springframework.data.domain.Page;

import com.example.backend.entity.Task;

import lombok.Data;

@Data
public class TaskListResponse {
    private Page<Task> page;
    private long activeCount;
    private long completedCount;
}