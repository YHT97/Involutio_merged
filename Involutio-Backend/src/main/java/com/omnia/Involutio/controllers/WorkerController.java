package com.omnia.Involutio.controllers;

import com.omnia.Involutio.service.WorkerMaster;
import com.omnia.Involutio.service.WorkerRatingMaster;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/worker")
@Slf4j
public class WorkerController {
    final private WorkerMaster workerMaster;
    final private WorkerRatingMaster workerRatingMaster;

    public WorkerController(WorkerMaster workerMaster, WorkerRatingMaster workerRatingMaster) {
        this.workerMaster = workerMaster;
        this.workerRatingMaster = workerRatingMaster;
    }

    @GetMapping("/{workerId}")
    ResponseEntity<?> getWorker(@PathVariable Long workerId) {
        return ResponseEntity.ok(workerMaster.getWorker(workerId));
    }

    @GetMapping("/{workerId}/stat")
    ResponseEntity<?> getStatistic(@RequestParam("start") LocalDate start, @RequestParam("end") LocalDate end, @PathVariable Long workerId) {
        return ResponseEntity.ok(workerRatingMaster.getStatistic(start, end, workerId));
    }
}
