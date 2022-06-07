package com.diploma.forum.services;

import com.diploma.forum.entities.Section;
import com.diploma.forum.repositories.SectionRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    private static final Logger LOGGER = LogManager.getLogger(SectionService.class.getName());

    private final SectionRepository sectionRepository;

    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @Transactional(readOnly = true)
    public List<Section> getAll() {
        LOGGER.info("Getting list of sections.");
        return sectionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Section> getOne(Long id) {
        LOGGER.info("Get section with id: " + id + ".");
        return sectionRepository.findById(id);
    }

    @Transactional
    public Section create(Section section) {
        LOGGER.info("Creating new section.");
        return sectionRepository.save(section);
    }

    @Transactional
    public Optional<Section> update(Section section, Long id) {
        LOGGER.info("Updating section with id: " + id + ".");
        Optional<Section> oldSection = sectionRepository.findById(id);
        if (oldSection.isPresent()) {
            oldSection.get().setTitle(section.getTitle());
            oldSection.get().setDescription(section.getDescription());
            return oldSection;
        }
        return oldSection;
    }

    @Transactional
    public void delete(Long id) {
        LOGGER.info("Deleting sections with id: " + id + ".");
        sectionRepository.deleteById(id);
    }

}
