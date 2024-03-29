package com.skillstorm.project1.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemid;

    private String name;
    private String description;
    private String quantity;

    
    @OneToMany(mappedBy = "item")
    private Set<WarehouseItem> warehouseItem;


    private Item() {}

    public Long getItemid() {
        return itemid;
    }
    public void setItemid(Long itemid) {
        this.itemid = itemid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Set<WarehouseItem> getWarehouseItem() {
        return warehouseItem;
    }

    public void setWarehouseItem(Set<WarehouseItem> warehouseItem) {
        this.warehouseItem = warehouseItem;
    }

    
}