package de.adorsys.ledgers.oba.rest.api.domain;

import java.util.List;

import de.adorsys.ledgers.middleware.api.domain.sca.ScaStatusTO;
import de.adorsys.ledgers.middleware.api.domain.um.ScaUserDataTO;

public class AuthorizeResponse extends OnlineBankingResponse  {

	/*
	 * The id of the business process, login, payment, consent.
	 */
	private String scaId;
	
	private List<ScaUserDataTO> scaMethods;
	
	/*
	 * The id of this authorisation instance.
	 */
	private String authorisationId;

	/*
	 * The sca status is used to manage authorisation flows.
	 */
	private ScaStatusTO scaStatus;
	
	public String getScaId() {
		return scaId;
	}

	public void setScaId(String scaId) {
		this.scaId = scaId;
	}

	public List<ScaUserDataTO> getScaMethods() {
		return scaMethods;
	}

	public void setScaMethods(List<ScaUserDataTO> scaMethods) {
		this.scaMethods = scaMethods;
	}

	public ScaStatusTO getScaStatus() {
		return scaStatus;
	}

	public void setScaStatus(ScaStatusTO scaStatus) {
		this.scaStatus = scaStatus;
	}

	public String getAuthorisationId() {
		return authorisationId;
	}

	public void setAuthorisationId(String authorisationId) {
		this.authorisationId = authorisationId;
	}

}
