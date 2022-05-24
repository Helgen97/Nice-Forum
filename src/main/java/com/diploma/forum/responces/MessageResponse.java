package com.diploma.forum.responces;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageResponse {

    private String message;
    private boolean error;

}
