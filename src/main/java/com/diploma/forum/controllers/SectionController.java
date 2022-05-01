package com.diploma.forum.controllers;

import com.diploma.forum.dto.SectionDTO;
import com.diploma.forum.entities.Section;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.services.SectionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("sections")
@Tag(name = "Section Controller", description = "Controller for working with sections")
public class SectionController {

    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public List<SectionDTO> getAll() {
        return sectionService.getAll().stream().map(SectionDTO::of).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public SectionDTO get(@PathVariable Long id) {
        return SectionDTO.of(sectionService.getOne(id).orElseThrow(NotFoundException::new));
    }

    @PostMapping
    public SectionDTO create(@RequestBody Section section) {
        return SectionDTO.of(sectionService.create(section));
    }

    @PutMapping("{id}")
    public SectionDTO update(@RequestBody Section section, @PathVariable Long id) {
        return SectionDTO.of(sectionService.update(section, id).orElseThrow(NotFoundException::new));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        sectionService.delete(id);
    }


}
