package com.spark.tools.auth.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.spark.tools.auth.rest.dto.PermissionDto;
import com.spark.tools.auth.rest.dto.RoleDto;
import com.spark.tools.auth.rest.dto.UserDto;

import lombok.Getter;

public class MyUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Getter
	private final UserDto user;
	
	@Getter
	private RoleDto role;

	public MyUserDetails(UserDto user, RoleDto role) {
		this.user = user;
		this.role = role;
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		final List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		if (role != null) {
			for (PermissionDto authoritie : role.getPermissions()) {
				authorities.add(new SimpleGrantedAuthority(authoritie.getCode()));
			}
		}
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return user.getActive() == Boolean.TRUE;
	}

}
