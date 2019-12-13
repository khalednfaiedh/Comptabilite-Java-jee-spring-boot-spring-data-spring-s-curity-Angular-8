package com.spark.commun.user.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spark.commun.user.model.entity.Role;

/**
 * Role Data Access Object
 */
@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {

	/**
	 * 
	 * @param name
	 * @return
	 */
	Role findByName(String name);

	/**
	 * 
	 * @param name
	 * @param id
	 * @return
	 */
	Role findByNameIgnoreCaseAndIdNot(String name, Integer id);
	
}

