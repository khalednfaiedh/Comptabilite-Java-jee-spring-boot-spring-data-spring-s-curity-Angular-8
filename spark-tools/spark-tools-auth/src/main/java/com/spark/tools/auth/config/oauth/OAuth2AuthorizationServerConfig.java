package com.spark.tools.auth.config.oauth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;

import com.spark.tools.auth.utils.AuthenticationUtilities;

/**
 * Oauth server configuration
 */
@Configuration
@EnableAuthorizationServer
public class OAuth2AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private JwtServerConfig jwtServerConfig;

	@Autowired
	@Qualifier("authenticationManagerBean")
	private AuthenticationManager authenticationManager;

	@Autowired
	private Environment env;

    /**
     * {@inheritDoc}
     */
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory()
				.withClient(AuthenticationUtilities.WEB_CLIENT_USERNAME).secret(AuthenticationUtilities.WEB_CLIENT_PASSWORD)
				.authorizedGrantTypes("refresh_token", "password", "authorization_code")
				.scopes(AuthenticationUtilities.WEB_CLIENT_SCOOP)
				.accessTokenValiditySeconds(env.getProperty("jwt.tocken.access.validity", Integer.class, 600))
				.refreshTokenValiditySeconds(env.getProperty("jwt.tocken.refresh.validity", Integer.class, 1200));
	}

    /**
     * {@inheritDoc}
     */
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
		tokenEnhancerChain.setTokenEnhancers(Arrays.asList(jwtServerConfig.tokenEnhancer(), jwtServerConfig.jwtTokenEnhancer()));
		endpoints.tokenStore(jwtServerConfig.tokenStore())
			.tokenEnhancer(tokenEnhancerChain)
				.authenticationManager(authenticationManager);
	}

    /**
     * {@inheritDoc}
     */
	@Override
	public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
		oauthServer.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
	}
	
	
}
