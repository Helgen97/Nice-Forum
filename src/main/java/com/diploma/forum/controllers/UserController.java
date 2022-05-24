package com.diploma.forum.controllers;

import com.diploma.forum.dto.UserDTO;
import com.diploma.forum.entities.User;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(value = "http://localhost:3000", maxAge = 3600)
@Tag(name = "User Controller", description = "Controller for working with users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAll() {
        return userService.getAll().stream().map(UserDTO::of).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public UserDTO getOne(@PathVariable Long id) {
        return UserDTO.of(userService.getOne(id).orElseThrow(NotFoundException::new));
    }

    @PostMapping
    public UserDTO create(@RequestBody User user) {
        return UserDTO.of(userService.create(user));
    }

    @PutMapping("{id}")
    public UserDTO update(@RequestBody User user, @PathVariable Long id) {
        return UserDTO.of(userService.updatePersonalInfo(user, id).orElseThrow(NotFoundException::new));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
