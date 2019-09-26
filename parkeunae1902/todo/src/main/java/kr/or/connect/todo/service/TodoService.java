package kr.or.connect.todo.service;

import java.util.List;

import kr.or.connect.todo.document.Todo;

public interface TodoService {

  public List<Todo> getTodoList();

  public Todo setTodo(Todo todo);

}