package com.tasklist.repository;

import com.tasklist.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskDAO extends JpaRepository<Task, Long> {
    Page<Task> findAll(Pageable pageable);
    Optional<Task> findById(Long id);
}
