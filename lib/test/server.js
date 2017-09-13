'use strict';

// Load modules
const Config = require('../../config');
const Code = require('code');
const Lab = require('lab');
const Wreck = require('wreck');
const Compose = require('../compose');
const Nock = require('nock');
const Mocks = require('./mocks');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


var internals = {
};


describe('server compose', () => {

    lab.before((done) => {

        Config.test_mode = true;

        Config.clarify_cody.apiKey = 'ccdkey_test_key';

        Compose((err, server) => {
            expect(err).to.not.exist();
            expect(server).to.exist();

            internals.server = server;

            internals.baseUrl = 'http://localhost:' + server.connections[0].settings.port;

            server.start(() => {
                done();
            });
        });

    });


    lab.after((done) => {

        internals.server.stop({ timeout: 60 * 1000 }, function(err) {
            expect(err).to.not.exist();
            done();
        });
    });


    it('test server and healthcheck', {timeout:2000}, (done) => {

        var checkPath = '/hc';

        Wreck.get(internals.baseUrl + checkPath, {}, (err, res, payload) => {

            expect(err).to.not.exist();
            expect(payload.toString('utf8')).to.equal('OK');
            done();
        });
    });


    it('test invalid webhook payload', {timeout:2000}, (done) => {

        var opt = {
            method: 'post',
            url: '/cody_webhook',
            payload: {
                conversation_id: 'e710e290-33f6-468e-807a-b392af7cdd62',
                _links: {
                    self: {
                        // missing href
                    }
                }
            }
        };

        internals.server.select('webhook').inject(opt, (res) => {
            expect(res.statusCode).to.equal(400);
            var payload = JSON.parse(res.payload);
            expect(payload.statusCode).to.equal(400);
            done();
        });
    });


    it('test webhook ', {timeout:2000}, (done) => {

        var opt = {
            method: 'post',
            url: '/cody_webhook',
            payload: {
                conversation_id: 'e710e290-33f6-468e-807a-b392af7cdd62',
                external_id: 'call_id_001',
                _links: {
                    self: {
                        href: '/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62'
                    },
                    'insight:media': {
                        href: '/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/media'
                    }
                }
            }
        };

        Mocks.mockServer();

        internals.server.select('webhook').inject(opt, (res) => {
            var payload = JSON.parse(res.payload);
            // console.log(payload);
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('test webhook with media errors', {timeout:2000}, (done) => {

        var opt = {
            method: 'post',
            url: '/cody_webhook',
            payload: {
                conversation_id: '00000000-33f6-468e-807a-b392af7cdd62',
                external_id: 'call_id_001',
                _links: {
                    self: {
                        href: '/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62'
                    },
                    'insight:media': {
                        href: '/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62/insights/media'
                    }
                }
            }
        };

        Mocks.mockServer();

        internals.server.select('webhook').inject(opt, (res) => {
            var payload = JSON.parse(res.payload);
            // console.log(payload);
            expect(res.statusCode).to.equal(200);
            done();
        });
    });


    it('test webhook error get conversation', {timeout:2000}, (done) => {

        var opt = {
            method: 'post',
            url: '/cody_webhook',
            payload: {
                conversation_id: 'e710e290-33f6-468e-807a-b392af7cdd62',
                external_id: 'call_id_001',
                _links: {
                    self: {
                        href: '/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62'
                    }
                }
            }
        };

        Nock.cleanAll();
        Nock(Mocks.baseUrl).get('/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62')
            .query({'embed': '*'})
            .reply(503, {statusCode: 503, error: 'Service unavailable'});

        internals.server.select('webhook').inject(opt, (res) => {
            expect(res.statusCode).to.equal(503);
            var payload = JSON.parse(res.payload);
            expect(payload.statusCode).to.equal(503);
            done();
        });
    });
});
