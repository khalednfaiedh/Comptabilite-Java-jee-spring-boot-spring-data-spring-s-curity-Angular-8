package com.spark.commun.user.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spark.commun.user.model.entity.User;

/**
 * User Data Access Object
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	/**
	 * 
	 * @param username
	 * @return
	 */
	User findByUsernameIgnoreCase(String username);

	/**
	 * 
	 * @param username
	 * @return
	 */
	@Query("SELECT user FROM User user LEFT JOIN FETCH user.role role WHERE UPPER(user.username) = UPPER(:username)")
	User findByUsernameIgnoreCaseFetchRole(@Param("username") String username);

	/**
	 * 
	 * @param username
	 * @param id
	 * @return
	 */
	User findByUsernameAndIdNot(String username, Long id);
	

	/**
	 * 
	 * @param email
	 * @return
	 */
	User findByEmailIgnoreCase(String email);
	

	/**
	 * 
	 * @param email
	 * @param id
	 * @return
	 */
	User findByEmailIgnoreCaseAndIdNot(String email, Long id);
}

