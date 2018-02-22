/*
 * Copyright (C) 2015-2018 UTN-FRRe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ar.edu.utn.frre.dacs.loan.savings;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.utn.frre.dacs.loan.savings.dao.SavingsAccountRepository;
import ar.edu.utn.frre.dacs.loan.savings.model.SavingsAccount;

@RestController
public class Api {

	protected Logger logger = LoggerFactory.getLogger(Api.class.getName());

	@Autowired
	private SavingsAccountRepository repository;

	@RequestMapping(value = "/savings", method = RequestMethod.GET)
	@ResponseBody
	public List<SavingsAccount> findAll() {
		logger.info("Returning all savins account");
		
		return repository.findAll();
	}
	
	@RequestMapping(value = "/savings/{number}", method = RequestMethod.GET) 
	public ResponseEntity<?> findOne(
			@PathVariable("number") Long number) {
		logger.info("Returning saving account with number: " + number);
		
		SavingsAccount sa = repository.findOne(number);
		if(sa == null) {
			logger.info("Returning saving account with number: " + number + " not found!");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(sa, HttpStatus.FOUND);
	}
		
	@RequestMapping(value = "/savings", method = RequestMethod.POST)
	public ResponseEntity<?> createSavingsAccount(@RequestBody SavingsAccount client) {
		logger.info("Creating cliente: " + client);
		
		SavingsAccount c = repository.save(client);
		
		return new ResponseEntity<>(c, HttpStatus.CREATED);
	}
		
	@RequestMapping(value = "/savings", method = RequestMethod.PUT)
	public ResponseEntity<?> updateSavingsAccount(@RequestBody SavingsAccount savingsAccount) {
		logger.info("Updating saving account with number: " + savingsAccount.getNumber());
		
		SavingsAccount sa = null;
		
		if(savingsAccount.getNumber() != null)  {
			sa = repository.findOne(savingsAccount.getNumber());
		}
		
		if(sa == null) {
			logger.info("SavingsAccount: "+ sa + " not found!");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		repository.save(sa);
		
		return new ResponseEntity<>(sa, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/savings", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteSavingsAccount(@RequestBody SavingsAccount savingsAccount) {
		logger.info("Deleting cliente: " + savingsAccount);

		SavingsAccount c = repository.findOne(savingsAccount.getNumber());
		
		if(c == null) {
			logger.info("SavingsAccount: "+ savingsAccount + " not found!");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		repository.delete(c);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}	

	@RequestMapping(value = "/savings/{number}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteSavingsAccountById(@PathVariable("number") Long number) {
		logger.info("Deleting Savins Account with number: " + number);
		
		if(!repository.exists(number)) {
			logger.info("SavingsAccount with number: "+ number + " not found!");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		SavingsAccount client = repository.findOne(number);
		repository.delete(client);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}	
	
	@RequestMapping(value = "/savings/{clientId}", method = RequestMethod.GET)
	public ResponseEntity<?> findSavingsAccountByClientId(@PathVariable("clientId") Long clientId) {
		logger.info("Returning all savins account by client id:" + clientId);
		return new ResponseEntity<>(repository.findByClientId(clientId), HttpStatus.OK);
	}
}
