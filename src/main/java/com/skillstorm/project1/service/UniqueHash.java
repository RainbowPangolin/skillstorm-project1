package com.skillstorm.project1.service;


//TODO Consider improving hash collision
public class UniqueHash {
    public static Long returnUniqueHash(String name){
        return (long) name.hashCode();
    }
}
