package com.happy.buddy.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Gender {

    MALE(0),
    FEMALE(1);


    Gender(int gender) {
    }

//    private static final Map<String, Gender> FORMAT_MAP = Stream
//            .of(Gender.values())
//            .collect(Collectors.toMap(s -> s.gender, Function.identity()));
//
//
//    @JsonCreator
//    public static Gender fromString(String name) {
//        return Optional
//                .ofNullable(FORMAT_MAP.get(name))
//                .orElseThrow(() -> new IllegalArgumentException(name));
//    }
}
