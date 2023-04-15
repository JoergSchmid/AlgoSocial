package de.algosocial.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String title;
    private String message;
    private Date creationDate;

    protected Post() {}

    public Post(String title, String message) {
        this.title = title;
        this.message = message;
        this.creationDate = new Date();
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", creationDate=" + creationDate +
                '}';
    }
}
