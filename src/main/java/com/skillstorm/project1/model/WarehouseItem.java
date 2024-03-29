package com.skillstorm.project1.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "warehouses_items")

public class WarehouseItem {

    @EmbeddedId
    WarehouseItemKey id;
    
    @ManyToOne
    @MapsId("warehouseid")
    @JoinColumn(name="warehouseid")
    Warehouse warehouse;

    @ManyToOne
    @MapsId("itemid")
    @JoinColumn(name="itemid")
    Item item;

    int quantity;

    
}
