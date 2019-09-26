package kr.or.connect.todo.service;

import java.util.List;

import kr.or.connect.todo.document.Todo;

public interface TodoService {

  public List<Todo> getTodoListByType(String type);

  public Todo setTodo(Todo todo);

}