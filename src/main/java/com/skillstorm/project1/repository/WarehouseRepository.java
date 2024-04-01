package com.skillstorm.project1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillstorm.project1.model.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

}