package com.insurance.jhipster.application.web.rest;

import com.insurance.jhipster.application.domain.InsuranceForm;
import com.insurance.jhipster.application.repository.InsuranceFormRepository;
import com.insurance.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.insurance.jhipster.application.domain.InsuranceForm}.
 */
@RestController
@RequestMapping("/api")
public class InsuranceFormResource {

    private final Logger log = LoggerFactory.getLogger(InsuranceFormResource.class);

    private static final String ENTITY_NAME = "insuranceForm";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InsuranceFormRepository insuranceFormRepository;

    public InsuranceFormResource(InsuranceFormRepository insuranceFormRepository) {
        this.insuranceFormRepository = insuranceFormRepository;
    }

    /**
     * {@code POST  /insurance-forms} : Create a new insuranceForm.
     *
     * @param insuranceForm the insuranceForm to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new insuranceForm, or with status {@code 400 (Bad Request)} if the insuranceForm has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/insurance-forms")
    public ResponseEntity<InsuranceForm> createInsuranceForm(@Valid @RequestBody InsuranceForm insuranceForm) throws URISyntaxException {
        log.debug("REST request to save InsuranceForm : {}", insuranceForm);
        if (insuranceForm.getId() != null) {
            throw new BadRequestAlertException("A new insuranceForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InsuranceForm result = insuranceFormRepository.save(insuranceForm);
        return ResponseEntity.created(new URI("/api/insurance-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /insurance-forms} : Updates an existing insuranceForm.
     *
     * @param insuranceForm the insuranceForm to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated insuranceForm,
     * or with status {@code 400 (Bad Request)} if the insuranceForm is not valid,
     * or with status {@code 500 (Internal Server Error)} if the insuranceForm couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/insurance-forms")
    public ResponseEntity<InsuranceForm> updateInsuranceForm(@Valid @RequestBody InsuranceForm insuranceForm) throws URISyntaxException {
        log.debug("REST request to update InsuranceForm : {}", insuranceForm);
        if (insuranceForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InsuranceForm result = insuranceFormRepository.save(insuranceForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, insuranceForm.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /insurance-forms} : get all the insuranceForms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of insuranceForms in body.
     */
    @GetMapping("/insurance-forms")
    public List<InsuranceForm> getAllInsuranceForms() {
        log.debug("REST request to get all InsuranceForms");
        return insuranceFormRepository.findAll();
    }

    /**
     * {@code GET  /insurance-forms/:id} : get the "id" insuranceForm.
     *
     * @param id the id of the insuranceForm to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the insuranceForm, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/insurance-forms/{id}")
    public ResponseEntity<InsuranceForm> getInsuranceForm(@PathVariable Long id) {
        log.debug("REST request to get InsuranceForm : {}", id);
        Optional<InsuranceForm> insuranceForm = insuranceFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(insuranceForm);
    }

    /**
     * {@code DELETE  /insurance-forms/:id} : delete the "id" insuranceForm.
     *
     * @param id the id of the insuranceForm to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/insurance-forms/{id}")
    public ResponseEntity<Void> deleteInsuranceForm(@PathVariable Long id) {
        log.debug("REST request to delete InsuranceForm : {}", id);
        insuranceFormRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
