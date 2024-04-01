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

    public Long getWarehouseid() {
        return warehouseid;
    }

    public void setWarehouseid(Long warehouseid) {
        this.warehouseid = warehouseid;
    }

    public Long getItemid() {
        return itemid;
    }

    public void setItemid(Long itemid) {
        this.itemid = itemid;
    }

}
