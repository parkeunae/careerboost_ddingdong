package kr.or.connect.todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import kr.or.connect.todo.document.Todo;

public interface TodoRepository extends MongoRepository<Todo, String> {
  
}