package com.skillstorm.project1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MockController {

    @GetMapping("/data")
    public List<String> getData() {
        // Mock data
        List<String> mockData = new ArrayList<>();
        mockData.add("Item 1");
        mockData.add("Item 2");
        mockData.add("Item 3");
        return mockData;
    }
}
