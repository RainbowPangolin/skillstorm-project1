package com.skillstorm.project1.service;
import java.util.List;

import static com.skillstorm.project1.service.UniqueHash.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project1.model.Item;
import com.skillstorm.project1.model.Warehouse;
import com.skillstorm.project1.model.WarehouseItem;
import com.skillstorm.project1.model.WarehouseItemKey;
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
        long nameHash = warehouseName.hashCode();
        return warehouseRepository.findById(nameHash).orElse(null);
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    //TODO Transactional services

    public Warehouse saveWarehouse (Warehouse warehouse){
        String warehouseName = warehouse.getName();
        Long hash = (long) warehouseName.hashCode();
        warehouse.setWarehouseid(hash);
        System.out.println( "\n\n\n" + warehouse.getWarehouseid());
        return warehouseRepository.save(warehouse);
    }

    public Item saveItem (Item item){
        String warehouseName = item.getName();
        Long hash = (long) warehouseName.hashCode();
        item.setItemid(hash);
        System.out.println( "\n\n\n" + item.getItemid());
        return itemRepository.save(item);
    }

    public Long saveItemReturnId (Item item){
        String warehouseName = item.getName();
        Long hash = (long) warehouseName.hashCode();
        item.setItemid(hash);
        System.out.println( "\n\n\n item id: " + item.getItemid());
        return item.getItemid();
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Transactional
    public void insertItemIntoWarehouse(Item item, Warehouse warehouse){
        try{
            //if no warehouse, throw error. HTTP Response should say "no warehouse"

            //attempt inserting item

            // TODO Hash collision

            Integer newQuantity = item.getQuantity();

            Item curItem = this.saveItem(item);

            System.out.println(item.getItemid()  + " | " + warehouse.getWarehouseid());


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

        } catch (NullPointerException e){
            System.out.println("----- ERROR NPE-------- \n\n\n");
        } catch (Exception e){
            System.out.println("----- ERROR F -------- \n\n\n" + e);
        }

    }

    @Transactional
    public void updateWarehouse(String oldWarehouseName, Warehouse warehouse){

        Long old_w_id = (long) returnUniqueHash(oldWarehouseName);

        Warehouse oldWarehouse = warehouseRepository.getById(old_w_id);


        //Add new warehouse
        this.saveWarehouse(warehouse);

        //Reassign warehouseID's in warehouseItem table

        List<Item> listOfItems = warehouseItemRepository.findItemsByWarehouse(oldWarehouse);
        for (Item i : listOfItems){
            this.insertItemIntoWarehouse(i, warehouse);
        }

        //Delete old warehouse
        List<Long> oldIds = warehouseItemRepository.findAllIdsByWarehouse(oldWarehouse);
        for(Long o : oldIds){
            warehouseItemRepository.deleteById(o);
        }

        warehouseRepository.deleteById(old_w_id);


    }

    @Transactional
    public void destroyWarehouseCascade(Warehouse warehouse){
        Long w_id = warehouse.getWarehouseid();
        warehouseRepository.deleteById(w_id);
        List<Long> wi_id_list = warehouseItemRepository.findAllIdsByWarehouse(warehouse);
        System.out.println(wi_id_list.size());
        for (Long id : wi_id_list){
            warehouseItemRepository.deleteRowById(id);
        }
    }

    @Transactional
    public void deleteItemFromWarehouse(String itemName, String warehouseName){

        Long itemId = (long) itemName.hashCode();
        Long warehouseId = (long) warehouseName.hashCode();
        Long wi_id = warehouseItemRepository.findWarehouseItemIdByWarehouseIdAndItemId(warehouseId, itemId);

        warehouseItemRepository.deleteById(wi_id);

        //TODO Check if any warehouse still has item. If not, delete from items table. 

    }

}
