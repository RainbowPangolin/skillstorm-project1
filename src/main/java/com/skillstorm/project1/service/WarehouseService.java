package com.skillstorm.project1.service;
import java.util.ArrayList;
import java.util.List;

import static com.skillstorm.project1.service.UniqueHash.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project1.model.Item;
import com.skillstorm.project1.model.Warehouse;
import com.skillstorm.project1.model.WarehouseItem;
import com.skillstorm.project1.repository.ItemRepository;
import com.skillstorm.project1.repository.WarehouseItemRepository;
import com.skillstorm.project1.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private WarehouseItemRepository warehouseItemRepository;

    public Warehouse getWarehouseById(Long id) {
        return warehouseRepository.findById(id).orElse(null);
    }

    public Warehouse getWarehouseByName(String warehouseName) {
        long nameHash = returnUniqueHash(warehouseName);
        return warehouseRepository.findById(nameHash).orElse(null);
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    public Item getItemByName(String name) {
        Long itemid = (long) returnUniqueHash(name);
        return this.getItemById(itemid);
    }

    public Warehouse saveWarehouse (Warehouse warehouse){
        String warehouseName = warehouse.getName();
        Long hash = (long) returnUniqueHash(warehouseName);

        Warehouse existingWarehouse = this.getWarehouseByName(warehouseName);

        try{
            if (existingWarehouse.getName().equals(warehouseName)){
                throw new RuntimeException("Warehouse exists, cannot overwrite (use EDIT to change warehouse details)");
            }
        } catch(NullPointerException e){
            System.out.println("No warehouse exists, adding new warehouse");
        } 


        warehouse.setWarehouseid(hash);
        return warehouseRepository.save(warehouse);
    }

    public Item saveItem (Item item){
        String warehouseName = item.getName();
        Long hash = (long) returnUniqueHash(warehouseName);
        item.setItemid(hash);
        return itemRepository.save(item);
    }

    public Long saveItemReturnId (Item item){
        String warehouseName = item.getName();
        Long hash = (long) returnUniqueHash(warehouseName);
        item.setItemid(hash);
        return item.getItemid();
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getAllItemsFromWarehouse(Warehouse warehouse) {
        List<Object[]> results = warehouseItemRepository.findItemsWithStoredQuantityByWarehouse(warehouse);
        List<Item> items = new ArrayList<>();

        for (Object[] result : results) {
            Item item = (Item) result[0];
            int storedQuantity = (int) result[1];
            item.setQuantity(storedQuantity); // Replace the item's quantity with the stored quantity
            items.add(item);
        }


        return items;
    }

    public List<Item> getAllItemsFromWarehouseName(String warehouseName) {
        Warehouse warehouse = this.getWarehouseByName(warehouseName);
        return this.getAllItemsFromWarehouse(warehouse);
    }

    @Transactional
    public Integer getWarehouseUtilization(Warehouse warehouse){
        return warehouseItemRepository.findUtilizationOfWarehouseCapacity(warehouse);
    }

    @Transactional
    public Integer getWarehouseUtilizationByName(String warehouseName){
        Warehouse warehouse = this.getWarehouseByName(warehouseName);
        return warehouseItemRepository.findUtilizationOfWarehouseCapacity(warehouse);
    }

    @Transactional
    public void insertItemIntoWarehouse(Item item, Warehouse warehouse){
        try{
            Integer newQuantity = item.getQuantity();

            Integer curUtilization = warehouseItemRepository.findUtilizationOfWarehouseCapacity(warehouse);

            if(curUtilization + newQuantity > warehouse.getCapacity()){
                throw new RuntimeException("Adding the item would surpass the capacity of the warehouse");
            }

            Item curItem = this.saveItem(item);

            boolean itemExistsInWarehouse = false;
            for (Item i : warehouseItemRepository.findItemsByWarehouse(warehouse)){
                if (i.getItemid() == curItem.getItemid()) {
                    itemExistsInWarehouse = true;
                    break;
                }
            }

            if(itemExistsInWarehouse){
                warehouseItemRepository.incrementQuantity(warehouse, curItem, item.getQuantity());
            } else {
                WarehouseItem newWarehouseItem = new WarehouseItem();

                newWarehouseItem.setItem(curItem);
                newWarehouseItem.setWarehouse(warehouse);
                newWarehouseItem.setQuantity(newQuantity);
                warehouseItemRepository.save(newWarehouseItem);
            }

        } 
        catch (NullPointerException e){
            System.out.println("----- ERROR NPE-------- \n\n\n");
        } 


    }

    @Transactional
    public void updateWarehouse(String oldWarehouseName, Warehouse warehouse){
        Long old_w_id = (long) returnUniqueHash(oldWarehouseName);

        Warehouse oldWarehouse = warehouseRepository.getById(old_w_id);

        // Add new warehouse to replace old one
        this.saveWarehouse(warehouse); 

        // Reassign warehouseID's in warehouseItem table
        List<Item> listOfItems = warehouseItemRepository.findItemsByWarehouse(oldWarehouse);
        for (Item i : listOfItems){
            this.insertItemIntoWarehouse(i, warehouse);
        }

        // Delete old warehouse
        List<Long> oldIds = warehouseItemRepository.findAllIdsByWarehouse(oldWarehouse);
        for(Long o : oldIds){
            warehouseItemRepository.deleteById(o);
        }

        warehouseRepository.deleteById(old_w_id);


    }

    @Transactional
    public void deleteItemFromAllWarehouses(String itemName){
        Item searchItem = this.getItemByName(itemName);
        List<Warehouse> remainingWarehouses = warehouseItemRepository.findWarehousesByItem(searchItem);

        for (Warehouse w : remainingWarehouses){
            this.deleteItemFromWarehouse(itemName, w.getName());
        }
    }

    @Transactional
    public void deleteItemFromWarehouse(String itemName, String warehouseName){
        Long itemId = (long) returnUniqueHash(itemName);
        Long warehouseId = (long) returnUniqueHash(warehouseName);
        Long wi_id = warehouseItemRepository.findWarehouseItemIdByWarehouseIdAndItemId(warehouseId, itemId);

        warehouseItemRepository.deleteById(wi_id);

        Item searchItem = this.getItemById(itemId);

        List<Warehouse> remainingWarehouses = warehouseItemRepository.findWarehousesByItem(searchItem);

        if(remainingWarehouses.size() <= 0){
            itemRepository.deleteById(itemId);
        }

    }


    
    @Transactional
    public void destroyWarehouseCascade(Warehouse warehouse){
        List<Item> listOfItems = this.getAllItemsFromWarehouseName(warehouse.getName());

        for (Item i : listOfItems){
            this.deleteItemFromWarehouse(i.getName(), warehouse.getName());
        }

        Long w_id = warehouse.getWarehouseid();
        warehouseRepository.deleteById(w_id);
    }

    @Transactional
    public void updateWarehouseItem(Warehouse warehouse, Item oldItem, Item newItem){
        Long oldItemId = oldItem.getItemid();
        Long warehouseId = warehouse.getWarehouseid();
        System.out.printf(" ---------- \n\n %d \n\n -------------- \n", oldItemId); 
        Long wi_id = warehouseItemRepository.findWarehouseItemIdByWarehouseIdAndItemId(warehouseId, oldItemId);
        warehouseItemRepository.deleteById(wi_id);;
        this.insertItemIntoWarehouse(newItem, warehouse);

    }


    @Transactional
    public void updateItem(String oldItemName, Item newItem){
        Long old_i_id = (long) returnUniqueHash(oldItemName); 

        Item oldItem = itemRepository.getById(old_i_id);

        List<Warehouse> listOfWarehouses = warehouseItemRepository.findWarehousesByItem(oldItem);

        //For each warehouse, add new item, delete old one
        for (Warehouse w : listOfWarehouses){
            Integer oldQuantity = warehouseItemRepository.findItemQuantityInWarehouse(oldItem, w);

            System.out.println("\n\n" + oldQuantity + "\n\n");
            Item tempItem = newItem.deepCopy();
            tempItem.setQuantity(oldQuantity);

            System.out.println(tempItem.getName());

            this.insertItemIntoWarehouse(tempItem, w);
            this.deleteItemFromWarehouse(oldItemName, w.getName());
        }

    }

    @Transactional
    public void cleanDatabase(){
        warehouseItemRepository.deleteAll();

        warehouseRepository.deleteAll();;
        itemRepository.deleteAll();
        }

}
