import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { awayLeaderBoard, homeLeaderBoard, allLeaderBoard } from './mocks/Leaderboard/leader.mock';
import { matches } from './mocks/Matches/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
    beforeEach(() => {
        sinon.restore();
    });
    describe('GET /leaderboard/home', () => {
        it('should return the home leaderboard', async () => {
            sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
            const { status, body } = await chai.request(app).get('/leaderboard/home');
            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(homeLeaderBoard);
        });
    });

    describe('GET /leaderboard/away', () => {
        it('should return the away leaderboard', async () => {
            sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
            const { status, body } = await chai.request(app).get('/leaderboard/away');
            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(awayLeaderBoard);
        });
    });

    describe('GET /leaderboard', () => {
        it('should return the all leaderboard', async () => {
            sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
            const { status, body } = await chai.request(app).get('/leaderboard');
            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(allLeaderBoard);
        });
    });
});