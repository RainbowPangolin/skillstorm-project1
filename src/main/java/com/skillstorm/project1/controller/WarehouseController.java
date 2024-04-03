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
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.model.Item;
import com.skillstorm.project1.model.Warehouse;
import com.skillstorm.project1.service.WarehouseService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping("/api/warehouse/{name}")
    public Warehouse getWarehouse(@PathVariable String name) {
        return warehouseService.getWarehouseByName(name);
    }

    @GetMapping("/api/warehouses")
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @GetMapping("/api/item/{id}")
    public Item getItem(@PathVariable Long id) {
        return warehouseService.getItemById(id);
    }

    @GetMapping("/api/items")
    public List<Item> getAllItems() {
        return warehouseService.getAllItems();
    }

    @GetMapping("/api/itemlist")
    public List<Item> getItemList() {
        return warehouseService.getAllItems();
    }

    @GetMapping("/api/warehouseutilization/{warehouseName}")
    public Integer getUtilization(@PathVariable String warehouseName) {
        return warehouseService.getWarehouseUtilizationByName(warehouseName);
    }
    

    @GetMapping("/api/items/{warehouseName}")
    public List<Item> getAllItemsFromWarehouse(@PathVariable String warehouseName) {
        return warehouseService.getAllItemsFromWarehouseName(warehouseName);
    }

    @PostMapping("/api/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);        
    }

    @PostMapping("/api/addItem")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = warehouseService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.OK);        
    }

    @PostMapping("/api/items/{warehouseName}")
    public ResponseEntity<String> addItemToWarehouse(@RequestBody Item item, @PathVariable String warehouseName) {
        try {
            // Retrieve the warehouse
            Warehouse warehouse = warehouseService.getWarehouseByName(warehouseName);
            if (warehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.insertItemIntoWarehouse(item, warehouse);

            return new ResponseEntity<>("Item added to warehouse successfully", HttpStatus.CREATED);
        } 
        catch (RuntimeException e) {
            return new ResponseEntity<>("Adding this item exceeds the capacity of the warehouse.", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Failed to add item to warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/{warehouseName}/{itemName}")
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

    @DeleteMapping("/api/{warehouseName}")
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

    @DeleteMapping("/api/itemlist/{itemName}")
    public ResponseEntity<String> deleteItem(@PathVariable String itemName) {
        try {
            // Retrieve the warehouse
            Item existingItem = warehouseService.getItemByName(itemName);
            if (existingItem == null) {
                return new ResponseEntity<>("item with name " + itemName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.deleteItemFromAllWarehouses(itemName);

            return new ResponseEntity<>("Item deleted from all warehouses successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/api/{warehouseName}")
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

    @PutMapping("/api/itemlist/{itemName}")
    public ResponseEntity<String> updateItem(@PathVariable String itemName, @RequestBody Item item) {
        try {
            // Retrieve the warehouse
            Item existingItem = warehouseService.getItemByName(itemName);
            if (existingItem == null) {
                return new ResponseEntity<>("item with name " + itemName + " not found", HttpStatus.NOT_FOUND);
            }

            warehouseService.updateItem(itemName, item);

            return new ResponseEntity<>("Item updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PutMapping("/api/items/{warehouseName}/{itemName}")
    public ResponseEntity<String> editWarehouseItem(@RequestBody Item newItem, @PathVariable String warehouseName, @PathVariable String itemName) {
        try {
            // Retrieve the warehouse
            Warehouse warehouse = warehouseService.getWarehouseByName(warehouseName);
            if (warehouse == null) {
                return new ResponseEntity<>("Warehouse with id " + warehouseName + " not found", HttpStatus.NOT_FOUND);
            }

            // Retrieve the old item
            Item oldItem = warehouseService.getItemByName(itemName);
            warehouseService.updateWarehouseItem(warehouse, oldItem, newItem);

            return new ResponseEntity<>("Item added to warehouse successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add item to warehouse: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
