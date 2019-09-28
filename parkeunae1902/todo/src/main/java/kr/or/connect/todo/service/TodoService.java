package kr.or.connect.todo.service;

import java.util.List;

import org.bson.types.ObjectId;

import kr.or.connect.todo.document.Todo;

public interface TodoService {

  public List<Todo> getTodoListByType(String type);

  public Todo setTodo(Todo todo);

  public Todo modifyTodo(ObjectId id, String contents);

  public Todo modifyTypes(Todo todo);

}