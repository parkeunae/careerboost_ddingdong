package kr.or.connect.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.document.Todo;
import kr.or.connect.todo.service.TodoService;


@RestController
@RequestMapping("/api")
public class TodoController {
  @Autowired
  private TodoService todoService;
  
  @GetMapping("/todolist/{type}")
  public List<Todo> getTodoListByType(@PathVariable(name = "type") String type) {
    return todoService.getTodoListByType(type);
  }

  @PostMapping("/todolist")
  public Todo setTodo(@RequestBody Todo todo) {
    System.out.println("todo = "+todo);
    return todoService.setTodo(todo);
  }
}