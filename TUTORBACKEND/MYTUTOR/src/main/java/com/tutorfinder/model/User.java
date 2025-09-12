package com.tutorfinder.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String email;
	private String password;
	private String phone;
	private String role;
	private String qualification;
	private String adminCode;
	
	public User() {
	}
	 public User(String name, String email, String password, String phone, String role, String qualification, String adminCode) {
	        this.name = name;
	        this.email = email;
	        this.password = password;
	        this.phone = phone;
	        this.role = role;
	        this.qualification = qualification;
	        this.adminCode = adminCode;
	    }
	 public Long getId() {
		    return id;
		}

		public void setId(Long id) {
		    this.id = id;
		}

		public String getName() {
		    return name;
		}

		public void setName(String name) {
		    this.name = name;
		}

		public String getEmail() {
		    return email;
		}

		public void setEmail(String email) {
		    this.email = email;
		}

		public String getPassword() {
		    return password;
		}

		public void setPassword(String password) {
		    this.password = password;
		}

		public String getPhone() {
		    return phone;
		}

		public void setPhone(String phone) {
		    this.phone = phone;
		}

		public String getRole() {
		    return role;
		}

		public void setRole(String role) {
		    this.role = role;
		}

		public String getQualification() {
		    return qualification;
		}

		public void setQualification(String qualification) {
		    this.qualification = qualification;
		}

		public String getAdminCode() {
		    return adminCode;
		}

		public void setAdminCode(String adminCode) {
		    this.adminCode = adminCode;
		}
	 
	
	
}
