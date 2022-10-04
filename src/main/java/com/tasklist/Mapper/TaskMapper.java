package com.tasklist.Mapper;


import com.tasklist.domain.Task;
import com.tasklist.so.TaskSo;
import org.mapstruct.*;

@Mapper(
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        collectionMappingStrategy = CollectionMappingStrategy.ACCESSOR_ONLY,
        componentModel = "spring"
)
public interface TaskMapper {

    Task mapToEntity(TaskSo taskSo);

    TaskSo mapToSo(Task task);

}
