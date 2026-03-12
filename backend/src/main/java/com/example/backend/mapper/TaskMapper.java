package com.example.backend.mapper;

import org.mapstruct.Mapper;

import com.example.backend.dto.request.TaskCreationRequest;
import com.example.backend.entity.Task;

@Mapper(componentModel="spring")
public interface TaskMapper {
    Task toTask(TaskCreationRequest request);

}
