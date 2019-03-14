/*
 * Copyright 2018-2018 adorsys GmbH & Co KG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package de.adorsys.ledgers.oba;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

import de.adorsys.ledgers.middleware.client.rest.AccountRestClient;

@EnableFeignClients(basePackageClasses=AccountRestClient.class)
@ComponentScan(basePackages = {"de.adorsys.ledgers.oba", "de.adorsys.psd2.consent"})
@SpringBootApplication
@EnableAutoConfiguration
public class LedgersXs2aObaApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(LedgersXs2aObaApplication.class).run(args);
    }
}
