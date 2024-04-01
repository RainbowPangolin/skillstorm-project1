package com.skillstorm.project1.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "items")
public class Item {

    @Id
    private Long itemid;

    private String name;
    private String description;
    private Integer quantity;

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

    //TODO: Migrate to DTO that doesn't contain quantity. The Items table should not contain quantity, only the junction table.

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    
}