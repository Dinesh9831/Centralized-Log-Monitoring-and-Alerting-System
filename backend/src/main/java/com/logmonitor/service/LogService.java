package com.logmonitor.service;

import com.logmonitor.model.LogEntry;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LogService {
    private final List<LogEntry> logs = new ArrayList<>();
    private final Random random = new Random();

    private final String[][] sampleMessages = {
            {"INFO", "Application Started"},
            {"INFO", "User Logged In"},
            {"INFO", "Data synced successfully"},
            {"WARN", "High Memory Usage Detected"},
            {"WARN", "API Response time is slow"},
            {"ERROR", "Database Connection Failed"},
            {"ERROR", "Unhandled Exception Occurred"},
            {"ERROR", "Payment Gateway Timeout"}
    };

    @Scheduled(fixedRate = 5000)
    public void generateRandomLog() {
        String[] randomLog = sampleMessages[random.nextInt(sampleMessages.length)];
        addLog(randomLog[0], randomLog[1]);
        System.out.println("Generated Log: [" + randomLog[0] + "] " + randomLog[1]);
    }

    public synchronized void addLog(String level, String message) {
        LogEntry newLog = new LogEntry(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                level,
                message
        );
        logs.add(newLog);

        if (logs.size() > 100) {
            logs.remove(0);
        }
    }

    public synchronized List<LogEntry> getAllLogs() {
        return new ArrayList<>(logs);
    }

    public synchronized List<LogEntry> getAlerts() {
        return logs.stream()
                .filter(log -> "ERROR".equals(log.getLevel()))
                .collect(Collectors.toList());
    }
}
