package com.LJ.PLANT.HIRE.BACKEND.util;

import java.security.SecureRandom;

public class ReferenceTokenGenerator {

    private static final String CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generate() {

        StringBuilder sb = new StringBuilder("LJPH-");
        for (int i = 0; i < 6; i++) {

            sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
        }
        return sb.toString();

    }

}
