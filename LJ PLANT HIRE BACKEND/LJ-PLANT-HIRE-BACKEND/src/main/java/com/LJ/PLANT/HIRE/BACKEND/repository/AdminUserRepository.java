package com.LJ.PLANT.HIRE.BACKEND.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LJ.PLANT.HIRE.BACKEND.model.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    Optional<AdminUser> findByUsername(String username);

}
