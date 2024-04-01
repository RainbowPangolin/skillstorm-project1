package com.skillstorm.project1.service;


//TODO Manage as spring service?
public class UniqueHash {
    public static Long returnUniqueHash(String name){
        return (long) name.hashCode();
    }
}
