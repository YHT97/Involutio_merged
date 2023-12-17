package com.omnia.Involutio.controllers;

import com.omnia.Involutio.service.ManagerMaster;
import com.omnia.Involutio.service.file.FileMaster;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@Slf4j
@RequestMapping("/files")
public class FileController {
    final private FileMaster fileMaster;

    public FileController(FileMaster fileMaster) {
        this.fileMaster = fileMaster;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(fileMaster.getAll());
    }

    @GetMapping("/pdf")
    public ResponseEntity<?> getAllPDF(){
        return ResponseEntity.ok(fileMaster.getAllPDF());
    }

    @GetMapping("/csv")
    public ResponseEntity<?> getAllCSV(){
        return ResponseEntity.ok(fileMaster.getAllCSV());
    }

    @PostMapping("/upload/{manager_id}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Long manager_id) {
        try {
            var fileEntity = fileMaster.create(file, manager_id);
            return ResponseEntity.ok(fileEntity.toString());
        } catch (Exception ex) {
            return ResponseEntity.status(400).build();
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam("fileId") Long fileId) throws IOException {

        var file = fileMaster.download(fileId);

        var resource = new InputStreamResource(Files.newInputStream(file));
        String mimeType = Files.probeContentType(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName().toString())
                .header(HttpHeaders.CONTENT_TYPE, mimeType)
                .body(resource);
    }
}
