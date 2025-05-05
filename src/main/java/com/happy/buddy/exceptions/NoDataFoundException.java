package com.happy.buddy.exceptions;


public class NoDataFoundException extends Exception{

        public NoDataFoundException(String message){
            super(message);
        }

        public NoDataFoundException(String message, Throwable cause){
            super(message, cause);
        }

}
