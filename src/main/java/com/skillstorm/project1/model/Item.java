package com.skillstorm.project1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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

    //TODO: Consider migrating to DTO that doesn't contain quantity. The Items table currently has a pseudo-quantity field, but can do without it.
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Item deepCopy() {
        Item copy = new Item();
        copy.setItemid(this.getItemid());
        copy.setName(this.getName());
        copy.setDescription(this.getDescription());
        copy.setQuantity(this.getQuantity());
        return copy;
    }
    
}