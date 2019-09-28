package kr.or.connect.todo.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
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
    Date currentDate = new Date();
    SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String stringDate = transFormat.format(currentDate);

    todo.setType("todo");
    todo.setCreateDate(stringDate);

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

  
}