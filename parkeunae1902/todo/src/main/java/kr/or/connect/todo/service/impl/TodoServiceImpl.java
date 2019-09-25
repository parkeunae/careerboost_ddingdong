package kr.or.connect.todo.service.impl;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import kr.or.connect.todo.document.Todo;

@Service
public class TodoServiceImpl {
  private final MongoTemplate mongoTemplate;

  public TodoServiceImpl(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  public List<Todo> allTodos() {
    Query query = new Query()
                  .addCriteria(Criteria.where("type").is("todo"))
                  .with(Sort.by(Sort.Order.desc("id")))
                  .limit(3);
    return mongoTemplate.find(query, Todo.class);
  }
}