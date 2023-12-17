package com.omnia.Involutio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

@Entity
@Data
@Slf4j
@NoArgsConstructor
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String type;
    private LocalDate date;
    private Long manager_id;
    private boolean processed;

    public FileEntity(String name, String type, Long manager_id) {
        this.name = name;
        this.type = type;
        this.date = LocalDate.now();
        this.manager_id = manager_id;
        this.processed = false;
    }
}
