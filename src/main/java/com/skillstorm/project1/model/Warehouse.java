package com.skillstorm.project1.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    private Long warehouseid;
    private String name;
    private String location;
    private String description;
    private Integer capacity;

    private Warehouse() {}

    public Long getWarehouseid() {
        return warehouseid;
    }
    public void setWarehouseid(Long warehouseid) {
        this.warehouseid = warehouseid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    
}