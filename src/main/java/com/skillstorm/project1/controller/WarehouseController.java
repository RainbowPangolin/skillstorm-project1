package com.skillstorm.project1.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.model.Item;
import com.skillstorm.project1.model.Warehouse;
import com.skillstorm.project1.service.WarehouseService;

@RestController
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    // @GetMapping("/warehouse/{id}")
    // public Warehouse getWarehouse(@PathVariable Long id) {
    //     return warehouseService.getWarehouseById(id);
    // }

    @GetMapping("/warehouse/{name}")
    public Warehouse getWarehouse(@PathVariable String name) {
        return warehouseService.getWarehouseByName(name);
    }

    @GetMapping("/warehouses")
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @GetMapping("/item/{id}")
    public Item getItem(@PathVariable Long id) {
        return warehouseService.getItemById(id);
    }

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return warehouseService.getAllItems();
    }

    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);        
    }

    @PostMapping("/addItem")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = warehouseService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.OK);        
    }

    @PostMapping("/{warehouseName}/item")
    public ResponseEntity<String> addItemToWarehouse(@RequestBody Item item, @PathVariable String warehouseName) {
        try {
            // Retrieve the warehouse
            Warehouse warehouse = warehouseService.getWarehouseByName(warehouseName);
            if (warehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.insertItemIntoWarehouse(item, warehouse);

            return new ResponseEntity<>("Item added to warehouse successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add item to warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{warehouseName}/{itemName}")
    public ResponseEntity<String> deleteItemFromWarehouse(@PathVariable String itemName, @PathVariable String warehouseName) {
        try {
            // Retrieve the warehouse
            Warehouse warehouse = warehouseService.getWarehouseByName(warehouseName);
            if (warehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.deleteItemFromWarehouse(itemName, warehouseName);

            return new ResponseEntity<>("Item removed successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to remove item from warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{warehouseName}")
    public ResponseEntity<String> deleteWarehouse (@PathVariable String warehouseName) {
        try {
            Warehouse warehouse = warehouseService.getWarehouseByName(warehouseName);
            if (warehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.destroyWarehouseCascade(warehouse);

            return new ResponseEntity<>("Warehouse deleted successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{warehouseName}")
    public ResponseEntity<String> updateWarehouse(@PathVariable String warehouseName, @RequestBody Warehouse warehouse) {
        try {
            // Retrieve the warehouse
            Warehouse existingWarehouse = warehouseService.getWarehouseByName(warehouseName);
            if (existingWarehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.updateWarehouse(warehouseName, warehouse);

            return new ResponseEntity<>("Warehouse updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}