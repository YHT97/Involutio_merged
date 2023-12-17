package com.omnia.Involutio.controllers;

import com.omnia.Involutio.entity.ManagerEntity;
import com.omnia.Involutio.entity.UserEntity;
import com.omnia.Involutio.entity.WorkerEntity;
import com.omnia.Involutio.service.ManagerMaster;
import com.omnia.Involutio.service.ManagerRatingMaster;
import com.omnia.Involutio.service.WorkerMaster;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/manager")
@Slf4j
public class ManagerController {
    final private ManagerMaster managerMaster;
    final private WorkerMaster workerMaster;
    final private ManagerRatingMaster managerRatingMaster;

    public ManagerController(ManagerMaster managerMaster, WorkerMaster workerMaster, ManagerRatingMaster managerRatingMaster) {
        this.managerMaster = managerMaster;
        this.workerMaster = workerMaster;
        this.managerRatingMaster = managerRatingMaster;
    }

    @GetMapping("/all")
    ResponseEntity<List<ManagerEntity>> getAll(){
        return ResponseEntity.ok(managerMaster.getAll());
    }

    @GetMapping
    ResponseEntity<ManagerEntity> getManager(Authentication authentication){
        Long userId = ((UserEntity) authentication.getPrincipal()).getId();
        return ResponseEntity.ok(managerMaster.getWithUser(userId));
    }

    @GetMapping("/{manager_id}")
    ResponseEntity<ManagerEntity> getManagerById(@PathVariable Long manager_id){
        return ResponseEntity.ok(managerMaster.getWithManagerId(manager_id));
    }

    @GetMapping("/{managerId}/workers")
    ResponseEntity<List<WorkerEntity>> getWorkers(@PathVariable Long managerId){
        return ResponseEntity.ok(workerMaster.getAllWithManager(managerId));
    }

    @GetMapping("/{managerId}/stat")
    ResponseEntity<?> getStatistic(@RequestParam("start") LocalDate start, @RequestParam ("end") LocalDate end, @PathVariable Long managerId){
        return ResponseEntity.ok(managerRatingMaster.getStatistic(start,end, managerId));
    }
}
