package com.example.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    boolean existsByTitle(String title);
    Page<Task> findAllByCompleted(boolean completed, Pageable pageable);
    long countByCompleted(boolean completed);

}
