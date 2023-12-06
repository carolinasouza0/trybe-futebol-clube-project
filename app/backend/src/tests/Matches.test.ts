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

        it('should return all matches in progress', async function() {
            const matches = matchesMock.matches.filter(match => match.inProgress);
            sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

            const { status, body } = await chai.request(app).get('/matches?inProgress=true');
            expect(status).to.equal(200);
            expect(body).to.deep.equal(matches);
        });
    });

    describe('PATCH /matches/:id/finish', function() {
        it('should return finished match', async function() {
            const match = matchesMock.matches[0];
            sinon.stub(SequelizeMatches, 'findOne').resolves(match as any);
            sinon.stub(SequelizeMatches, 'update').resolves([1]);
            const token = { token: loginMock.tokenValid.token };

            const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(200);
            expect(body).to.deep.equal({ message: 'Finished' });
        });

        it('should return not found when the match to update does not exists', async function() {
            sinon.stub(SequelizeMatches, 'findOne').resolves(null);
            const token = { token: loginMock.tokenValid.token };

            const { id, ...sendData} = matchesMock.matches[0];

            const { status, body } = await chai.request(app).patch('/matches/1/finish')
               .send(sendData).set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(404);
            expect(body).to.deep.equal({ message: `Match 1 not found` });
        });

        it('should return conflict when the match could not be updated', async function() {
            const match = matchesMock.matches[0];
            sinon.stub(SequelizeMatches, 'findOne').resolves(match as any);
            sinon.stub(SequelizeMatches, 'update').resolves([0]);
            const token = { token: loginMock.tokenValid.token };

            const { id, ...sendData} = matchesMock.matches[0];

            const { status, body } = await chai.request(app).patch('/matches/1/finish')
                .send(sendData).set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(409);
            expect(body).to.deep.equal({ message: `Match 1 could not be updated` });
        });
    });

    describe('PATCH /matches/:id', function() {
        it('should return updated match', async function() {
            const match = matchesMock.matches[0];
            sinon.stub(SequelizeMatches, 'findOne').resolves(match as any);
            sinon.stub(SequelizeMatches, 'update').resolves([1]);
            const token = { token: loginMock.tokenValid.token };

            const { status, body } = await chai.request(app).patch('/matches/1')
                .send({ homeTeamGoals: 2, awayTeamGoals: 2}).set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(200);
            expect(body).to.deep.equal({ message: 'Updated', match: match });
        });

        it('should return not found when the match to update does not exists', async function() {
            sinon.stub(SequelizeMatches, 'findOne').resolves(null);
            const token = { token: loginMock.tokenValid.token };

            const { id, ...sendData} = matchesMock.matches[0];

            const { status, body } = await chai.request(app).patch('/matches/1')
                .send(sendData).set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(404);
            expect(body).to.deep.equal({ message: `Match 1 not found` });
        });

        it('should return conflict when the match could not be updated', async function() {
            const match = matchesMock.matches[0];
            sinon.stub(SequelizeMatches, 'findOne').resolves(match as any);
            sinon.stub(SequelizeMatches, 'update').resolves([0]);
            const token = { token: loginMock.tokenValid.token };

            const { id, ...sendData} = matchesMock.matches[0];

            const { status, body } = await chai.request(app).patch('/matches/1')
                .send(sendData).set('Authorization', `Bearer ${token.token}`);

            expect(status).to.equal(409);
            expect(body).to.deep.equal({ message: `Match 1 could not be updated` });
        });
    });
});