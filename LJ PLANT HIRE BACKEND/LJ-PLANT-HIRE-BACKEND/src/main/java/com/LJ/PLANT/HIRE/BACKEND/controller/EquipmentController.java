package com.LJ.PLANT.HIRE.BACKEND.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LJ.PLANT.HIRE.BACKEND.model.Equipment;
import com.LJ.PLANT.HIRE.BACKEND.service.EquipmentService;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @GetMapping
    public List<Equipment> getAll() {

        return equipmentService.getAllEquipment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getById(@PathVariable Long id) {

        return equipmentService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}