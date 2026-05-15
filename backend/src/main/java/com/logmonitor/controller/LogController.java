package com.logmonitor.controller;

import com.logmonitor.model.LogEntry;
import com.logmonitor.service.LogService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from our React frontend
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping("/logs")
    public List<LogEntry> getLogs() {
        return logService.getAllLogs();
    }

    @GetMapping("/alerts")
    public List<LogEntry> getAlerts() {
        return logService.getAlerts();
    }
}
