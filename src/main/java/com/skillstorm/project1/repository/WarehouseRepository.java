package com.skillstorm.project1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.project1.model.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}