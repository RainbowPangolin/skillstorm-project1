package com.skillstorm.project1.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;


@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long warehouseid;
    private String name;
    private String location;
    private String description;

    @OneToMany(mappedBy = "warehouse")
    private Set<WarehouseItem> warehouseItem;



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

    public Set<WarehouseItem> getWarehouseItem() {
        return warehouseItem;
    }

    public void setWarehouseItem(Set<WarehouseItem> warehouseItem) {
        this.warehouseItem = warehouseItem;
    }


    
}