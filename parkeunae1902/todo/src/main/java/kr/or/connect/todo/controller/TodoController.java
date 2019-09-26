package kr.or.connect.todo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.document.Todo;
import kr.or.connect.todo.service.TodoService;


@RestController
public class TodoController {
  @Autowired
  private TodoService todoService;
  
  @GetMapping("/todolist")
  public Map<String, Object> getTodoList() {
    List<Todo> todoList = todoService.getTodoList();

    Map<String, Object> map = new HashMap<>();
    map.put("todoList", todoList);
    return map;
  }
}