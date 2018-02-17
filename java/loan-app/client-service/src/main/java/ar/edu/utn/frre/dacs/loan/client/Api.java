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
package ar.edu.utn.frre.dacs.loan.client;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.utn.frre.dacs.loan.client.dao.ClientRepository;
import ar.edu.utn.frre.dacs.loan.client.model.Client;

@RestController
@RequestMapping("/client")
public class Api {

	protected Logger logger = LoggerFactory.getLogger(Api.class.getName());
	
	@Autowired
	private ClientRepository repository;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Client> findAll() {
		logger.info("Client Service: " + System.currentTimeMillis());
		
		return repository.findAll();
	}		
}
