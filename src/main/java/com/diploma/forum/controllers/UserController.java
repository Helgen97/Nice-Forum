package com.diploma.forum.controllers;

import com.diploma.forum.dto.UserDTO;
import com.diploma.forum.entities.User;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Controller", description = "Controller for working with users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserDTO> getAll(@RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "100") int limit) {
        return userService.getAll(page, limit);
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

    @PutMapping("/role/{id}")
    public UserDTO updateUserRole(@PathVariable Long id, @RequestParam String role) {
        return UserDTO.of(userService.updateUserRole(id, role).orElseThrow(NotFoundException::new));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
