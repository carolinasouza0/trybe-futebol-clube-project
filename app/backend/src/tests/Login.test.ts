import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import jwtUtil from '../utils/jwtUtil';

import * as loginMock from './mocks/Login/login.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', function () {
    beforeEach(function () { sinon.restore() });
    const messageEmailOrPasswordEmpty = 'All fields must be filled';
    const messageEmailOrPasswordInvalid = 'Invalid email or password';
    it('should return an error if email is not provided', async function () {
        const httpRequestBody = loginMock.noEmailLoginBody;
        const response = await chai.request(app).post('/login').send(httpRequestBody);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal(messageEmailOrPasswordEmpty);
    });
    
    it('should return an error if password is not provided', async function () {
        const httpRequestBody = loginMock.noPasswordLoginBody;
        const response = await chai.request(app).post('/login').send(httpRequestBody);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal(messageEmailOrPasswordEmpty);
    });

    it('should return an error if the email does not exist', async function () {
        const httpRequestBody = loginMock.noExistingUserBody;
        sinon.stub(SequelizeUser, 'findOne').resolves(null);

        const response = await chai.request(app).post('/login').send(httpRequestBody);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal(messageEmailOrPasswordInvalid);
    });

    it('should return an error if password is not valid', async function () {
        const httpRequestBody = loginMock.existingUserWithWrongPasswordBody;
        const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
        sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

        const response = await chai.request(app).post('/login').send(httpRequestBody);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal(messageEmailOrPasswordInvalid);
    });

    it('should return a token if user exists and password is correct', async function () {
        const httpRequestBody = loginMock.validLoginBody;
        sinon.stub(SequelizeUser, 'findOne').returns(loginMock.existingUser as any);
        const response = await chai.request(app).post('/login').send(httpRequestBody);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');    
    });
});