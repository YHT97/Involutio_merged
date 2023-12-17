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
public class ManagerRatingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating;
    private Long managerId;
    private LocalDate date;

    public ManagerRatingEntity(int rating, Long managerId) {
        this.rating = rating;
        this.managerId = managerId;
        this.date = LocalDate.now();
    }
}
