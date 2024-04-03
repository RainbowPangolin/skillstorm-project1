package com.skillstorm.project1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillstorm.project1.model.Item;
import com.skillstorm.project1.model.Warehouse;
import com.skillstorm.project1.model.WarehouseItem;

public interface WarehouseItemRepository extends JpaRepository<WarehouseItem, Long> {

    @Query("SELECT wi.item FROM WarehouseItem wi WHERE wi.warehouse = :warehouse")
    List<Item> findItemsByWarehouse(@Param("warehouse") Warehouse warehouse);

    @Query("SELECT wi.quantity FROM WarehouseItem wi WHERE wi.warehouse = :warehouse AND wi.item = :item")
    Integer findItemQuantityInWarehouse(@Param("item") Item item, @Param("warehouse") Warehouse warehouse);


    @Query("SELECT wi.item, wi.quantity FROM WarehouseItem wi WHERE wi.warehouse = :warehouse")
    List<Object[]> findItemsWithStoredQuantityByWarehouse(@Param("warehouse") Warehouse warehouse);


    @Query("SELECT wi.id FROM WarehouseItem wi WHERE wi.warehouse = :warehouse")
    List<Long> findAllIdsByWarehouse(@Param("warehouse") Warehouse warehouse);

    @Query("SELECT wi.warehouse FROM WarehouseItem wi WHERE wi.item = :item")
    List<Warehouse> findWarehousesByItem(@Param("item") Item item);

    @Query("SELECT CASE WHEN COUNT(wi) > 0 THEN true ELSE false END FROM WarehouseItem wi WHERE wi.warehouse.id = :warehouseId AND wi.item.id = :itemId")
    boolean existsByWarehouseAndItem(@Param("warehouseId") Long warehouseId, @Param("itemId") Long itemId);
    
    @Modifying
    @Query("UPDATE WarehouseItem wi SET wi.quantity = wi.quantity + :quantityIncrement " + "WHERE wi.warehouse = :warehouse AND wi.item = :item")
    void incrementQuantity(@Param("warehouse") Warehouse warehouse, 
                        @Param("item") Item item, 
                        @Param("quantityIncrement") int quantityIncrement);


    @Query("SELECT wi.id FROM WarehouseItem wi WHERE wi.warehouse.id = :warehouseId AND wi.item.id = :itemId")
    Long findWarehouseItemIdByWarehouseIdAndItemId(@Param("warehouseId") Long warehouseId, @Param("itemId") Long itemId);
    
    @Modifying
    @Query("DELETE FROM WarehouseItem wi WHERE wi.id = :warehouseItemId")
    void deleteRowById(@Param("warehouseItemId") Long warehouseItemId);
    


    
}