package com.skillstorm.project1.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class WarehouseItemKey implements Serializable {
    @Column(name = "warehouseid")
    Long warehouseid;

    @Column(name = "itemid")
    Long itemid;

}
