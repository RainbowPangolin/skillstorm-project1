package com.skillstorm.project1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillstorm.project1.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Modifying
    @Query("UPDATE Item i SET i.quantity = i.quantity + :quantityIncrement WHERE i.itemid = :itemId")
    void incrementQuantity(@Param("itemId") Long itemId, @Param("quantityIncrement") int quantityIncrement);

    @Modifying
    @Query("UPDATE Item i SET i.quantity = i.quantity - :quantityDecrement WHERE i.itemid = :itemId")
    void decrementQuantity(@Param("itemId") Long itemId, @Param("quantityDecrement") int quantityDecrement);

}