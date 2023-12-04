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

const tokenValid = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwMTczMTI1MH0.l1Tiv6pSj-92F1K-TyoEQzk2bod0dx9sIySSpLaFpPI"
}

export {
    noEmailLoginBody,
    noPasswordLoginBody,
    noExistingUserBody,
    existingUserWithWrongPasswordBody,
    existingUser,
    validLoginBody,
    tokenValid,
};