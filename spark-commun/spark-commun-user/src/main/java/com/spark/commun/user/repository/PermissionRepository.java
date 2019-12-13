package com.spark.commun.user.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spark.commun.user.model.entity.Permission;

/**
 * Permission Data Access Object
 */
@Repository
public interface PermissionRepository extends CrudRepository<Permission, String> {

}

