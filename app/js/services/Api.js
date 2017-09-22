define(['jquery'], function($) {

	'use strict';

	var Api = function() {
		this.baseUrl = 'https://api.tvmaze.com/';
		this.endpoints = {
			singleSearch: {
				endpoint: this.baseUrl + 'singlesearch/shows',
				querystring: {
					mandatory: {
						q: '{query}'
					},
					embed: ['cast']
				}
			},
			castCredits: {
				endpoint: this.baseUrl + 'people/{query}/castcredits',
				querystring: {
					embed: ['show']
				}
			}
		};
	};

	Api.prototype.getParams = function(endpoint, embed) {
		var self = this,
			querystring = {
				embed: []
			};
		if (this.endpoints[endpoint].querystring.mandatory) {
			for (var query in this.endpoints[endpoint].querystring.mandatory) {
				querystring[query] = this.endpoints[endpoint].querystring.mandatory[query];
			}
		}
		if (embed) {
			embed.forEach(function(query) {
				if ($.inArray(query, self.endpoints[endpoint].querystring.embed) !== -1) querystring.embed.push(query);
			});
		}
		return decodeURIComponent($.param(querystring));
	};

	Api.prototype.getEndPoint = function(endpoint, query, embed) {
		var url = this.endpoints[endpoint].endpoint;
		url = url + '?' + this.getParams(endpoint, embed);
		return $.getJSON(url.replace('{query}', query));
	};

	Api.prototype.singleSearch = function(query, embed) {
		return this.getEndPoint('singleSearch', query, embed);
	};

	Api.prototype.castCredits = function(query, embed) {
		return this.getEndPoint('castCredits', query, embed);
	};

	return Api;

});