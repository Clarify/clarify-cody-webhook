'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Healthcheck = require('../index');
const Wreck = require('wreck');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('healthcheck', () => {

    it('test healthcheck request', (done) => {

        var testPort = 15346;

        const server = new Hapi.Server();
        server.connection({ port: testPort });

        server.register(
            {
                register: Healthcheck,
                options: {}
            },
            (err) => {

                expect(err).to.not.exist();

                server.start((err) => {

                    expect(err).to.not.exist();

                    var checkPath = '/hc';

                    Wreck.get('http://localhost:' + testPort + checkPath, {}, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString('utf8')).to.equal('OK');

                        server.stop((err) => {
                            expect(err).to.not.exist();
                            done();
                        });
                    });

                });
            });
    });
});
