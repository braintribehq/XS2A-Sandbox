package de.adorsys.ledgers.oba.rest.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adorsys.ledgers.middleware.client.rest.OauthRestClient;
import de.adorsys.ledgers.oba.rest.server.auth.oba.oauth.OauthCodeSecurityFilter;
import de.adorsys.ledgers.oba.rest.server.auth.oba.oauth.OauthTokenSecurityFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import static de.adorsys.ledgers.oba.rest.server.auth.oba.PermittedResources.APP_WHITELIST;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class OauthWebSecurityConfig {

    @Order(2)
    @Configuration
    @RequiredArgsConstructor
    public static class AuthorizeSecurityConfig extends WebSecurityConfigurerAdapter {
        private final OauthRestClient oauthRestClient;
        private final ObjectMapper mapper;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/oauth/authorise")
                .authorizeRequests()
                .antMatchers(APP_WHITELIST).permitAll()
                .and()
                .authorizeRequests().anyRequest()
                .authenticated();

            http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            http.headers().frameOptions().disable();

            http.addFilterBefore(new OauthCodeSecurityFilter(mapper, oauthRestClient), BasicAuthenticationFilter.class);
        }
    }

    @Order(3)
    @Configuration
    @RequiredArgsConstructor
    public static class TokenSecurityConfig extends WebSecurityConfigurerAdapter {
        private final OauthRestClient oauthRestClient;
        private final ObjectMapper mapper;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/oauth/token")
                .authorizeRequests()
                .antMatchers(APP_WHITELIST).permitAll()
                .and()
                .authorizeRequests().anyRequest()
                .authenticated();

            http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            http.headers().frameOptions().disable();

            http.addFilterBefore(new OauthTokenSecurityFilter(mapper, oauthRestClient), BasicAuthenticationFilter.class);
        }
    }
}