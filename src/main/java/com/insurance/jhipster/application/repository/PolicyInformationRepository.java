package com.insurance.jhipster.application.repository;

import com.insurance.jhipster.application.domain.PolicyInformation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PolicyInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PolicyInformationRepository extends JpaRepository<PolicyInformation, Long> {

}
