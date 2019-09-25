package kr.or.connect.todo.document;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todo")
public class Todo {
  @Id
  private int id;
  private String type;
  private String contents;
  private boolean star_flag;
  private boolean delete_flag;
  private String create_date;
  private String modify_date;

  public Todo(int id, String type, String contents) {
    this.id = id;
    this.type = type;
    this.contents = contents;
    this.star_flag = false;
    this.delete_flag = false;

    Date currentDate = new Date();
    SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String stringDate = transFormat.format(currentDate);
    
    this.create_date = stringDate;
    this.modify_date = stringDate;
  }

  public int getId() {
    return id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public boolean isStar_flag() {
    return star_flag;
  }

  public void setStar_flag(boolean star_flag) {
    this.star_flag = star_flag;
  }

  public boolean isDelete_flag() {
    return delete_flag;
  }

  public void setDelete_flag(boolean delete_flag) {
    this.delete_flag = delete_flag;
  }

  public String getCreate_date() {
    return create_date;
  }

  public void setCreate_date(String create_date) {
    this.create_date = create_date;
  }

  public String getModify_date() {
    return modify_date;
  }

  public void setModify_date(String modify_date) {
    this.modify_date = modify_date;
  }
}