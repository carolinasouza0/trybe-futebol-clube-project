import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Teams/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', function () {
  it('GET /teams', async () => {
    sinon
      .stub(SequelizeTeam, 'findAll')
      .resolves(teams as any);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.eq(teams);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('GET /teams/:id', async () => {
    sinon
      .stub(SequelizeTeam, 'findOne')
      .resolves(team as any);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.eq(team);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('should return NOT FOUND when team is not found', async () => {
    sinon
      .stub(SequelizeTeam, 'findOne')
      .resolves(null);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Team 1 not found' });
    expect(chaiHttpResponse.status).to.be.eq(404);
  });
  afterEach(() => {
    sinon.restore();
  });
});
