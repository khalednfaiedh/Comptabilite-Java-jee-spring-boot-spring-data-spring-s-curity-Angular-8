package com.spark.commun.user.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.spark.commun.user.exception.EmailExistsException;
import com.spark.commun.user.exception.RoleNameExistsException;
import com.spark.commun.user.exception.RoleNotFoundException;
import com.spark.commun.user.exception.UserNotFoundException;
import com.spark.commun.user.exception.UsernameExistsException;
import com.spark.commun.user.model.entity.Role;
import com.spark.commun.user.model.entity.User;
import com.spark.commun.user.model.enumeration.StatusEnum;
import com.spark.commun.user.repository.RoleRepository;
import com.spark.commun.user.repository.UserRepository;
import com.spark.commun.user.service.UserService;

/**
 * User Service
 */
@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public User saveUser(User user) {
		testDuplicateUser(user);
		if(!StringUtils.isEmpty(user.getPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		if(user.getRole() != null) {
			Role role = getRole(user.getRole().getId());
			user.setRole(role);
		}
		
		user.setStatus(StatusEnum.INACTIVE);
		user = userRepository.save(user);
		return user;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public User activateUser(Long  userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if(!userOptional.isPresent()) {
			throw new UserNotFoundException();
		}
		User user = userOptional.get();
		user.setStatus(StatusEnum.ACTIVE);
		user = userRepository.save(user);
		return user;
	}
	

	/**
	 * {@inheritDoc}
	 */
	@Override
	public User findUserByUsername(String username) {
		User user = userRepository.findByUsernameIgnoreCaseFetchRole(username);
		if(user == null) {
			throw new UserNotFoundException();
		}
		return user;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public User findUserById(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if(!userOptional.isPresent()) {
			throw new UserNotFoundException();
		}
		return userOptional.get();
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public Role saveRole(Role role) {
		testDuplicateRole(role);
		role = roleRepository.save(role);
		return role;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Role getRole(Integer id) {
		Optional<Role> roleOptional = roleRepository.findById(id);
		if(!roleOptional.isPresent()) {
			throw new RoleNotFoundException();
		}
		return roleOptional.get();
	}
	
	private void testDuplicateUser(User user) {
		
		// Search by username
		User duplicateUsername = null;
		if(user.getId() == null) {
			duplicateUsername = userRepository.findByUsernameIgnoreCase(user.getUsername());
		} else {
			duplicateUsername = userRepository.findByUsernameAndIdNot(user.getUsername(), user.getId());
		}
		if(duplicateUsername != null) {
			throw new UsernameExistsException();
		}
		
		// Search by email
		User duplicateUsermail = null;
		if(user.getId() == null) {
			duplicateUsermail = userRepository.findByEmailIgnoreCase(user.getEmail());
		} else {
			duplicateUsermail = userRepository.findByEmailIgnoreCaseAndIdNot(user.getEmail(), user.getId());
		}
		if(duplicateUsermail != null) {
			throw new EmailExistsException();
		}
	}

	private void testDuplicateRole(Role role) {
		Role duplicateRole = null;
		if(role.getId() == null) {
			duplicateRole = roleRepository.findByName(role.getName());
		} else {
			duplicateRole = roleRepository.findByNameIgnoreCaseAndIdNot(role.getName(), role.getId());
		}
		
		if(duplicateRole != null) {
			throw new RoleNameExistsException();
		}
	}
	
}
