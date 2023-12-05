import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import * as matchesMock from './mocks/Matches/matches.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import * as loginMock from './mocks/Login/login.mock';
import jwtUtil from '../utils/jwtUtil';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', function() {
    this.beforeEach(function () {
        sinon.restore();
        sinon.stub(jwtUtil, 'verify').resolves({id: 1, username: 'Admin'});
    });

    describe('GET /matches', function() {
        it('should return all matches', async function() {
            sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.matches as any);

            const { status, body } = await chai.request(app).get('/matches');

            expect(status).to.equal(200);
            expect(body).to.deep.equal(matchesMock.matches);
        });
    });
});