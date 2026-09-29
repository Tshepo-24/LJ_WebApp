package com.LJ.PLANT.HIRE.BACKEND.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LJ.PLANT.HIRE.BACKEND.model.Equipment;
import com.LJ.PLANT.HIRE.BACKEND.repository.EquipmentRepository;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment() {

        return equipmentRepository.findAll();
    }

    public Optional<Equipment> getById(Long id) {

        return equipmentRepository.findById(id);
    }
}
