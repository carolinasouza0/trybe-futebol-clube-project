import * as bcrypt from 'bcryptjs';
const validPassword = '1234567';
const validEmail = 'email@email.com';

const noEmailLoginBody = {
    email: '',
    password: validPassword,
};

const noPasswordLoginBody = {
    email: validEmail,
    password: '',
};

const noExistingUserBody = {
    email: 'notfound@notfound.com',
    password: validPassword,
};

const existingUserWithWrongPasswordBody = {
    email: validEmail,
    password: 'wrongpassword',
};

const hashedPassword = bcrypt.hashSync(validPassword, 10);

const existingUser = {
    id: 2,
    email: validEmail,
    password: hashedPassword,
    role: 'user',
    username: 'User',
};

const validLoginBody = {
    email: validEmail,
    password: validPassword,
};

export {
    noEmailLoginBody,
    noPasswordLoginBody,
    noExistingUserBody,
    existingUserWithWrongPasswordBody,
    existingUser,
    validLoginBody,
};