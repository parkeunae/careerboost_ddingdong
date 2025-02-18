package kr.or.connect.todo.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.todo.document.Todo;
import kr.or.connect.todo.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {
  private final MongoTemplate mongoTemplate;

  public TodoServiceImpl(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  @Override
  @Transactional(readOnly = true)
  public List<Todo> getTodoListByType(String type) {
    Query query = new Query()
                  .addCriteria(Criteria.where("type").is(type))
                  .with(Sort.by(Sort.Order.asc("createDate")));

    return mongoTemplate.find(query, Todo.class);
  }

  @Override
  @Transactional
  public Todo setTodo(Todo todo) {
    LocalDateTime currentDate = LocalDateTime.now();
    String formattedCurrentDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		
    todo.setType("todo");
    todo.setCreateDate(formattedCurrentDate);

    return mongoTemplate.insert(todo);
  }

  @Override
  @Transactional
  public Todo modifyTodo(ObjectId id, String contents) {
    Query query = new Query().addCriteria(Criteria.where("_id").is(id));
    Update update = new Update();
    update.set("contents", contents);

    return mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), Todo.class);
  }

  @Override
  @Transactional
  public void deleteTodo(Todo todo) {
    mongoTemplate.remove(todo);
  }

  @Override
  @Transactional
  public Todo modifyTypes(Todo todo) {
    Query query = new Query().addCriteria(Criteria.where("_id").is(todo.getId()));
    Update update = new Update();
    update.set("type", todo.getType());

    return mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), Todo.class);
  }

  
}