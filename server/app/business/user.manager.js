import PasswordDAO from '../DAO/passwordDAO.js';
import TokenDAO from '../DAO/tokenDAO.js';
import userDAO from '../DAO/userDAO.js';
import UserDAO from '../DAO/userDAO.js';
import addressDAO from '../DAO/addressDAO.js'
import applicationException from '../service/applicationException.js';
import sha1 from 'sha1';

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const token = await TokenDAO.create(userData);
    return {...getToken(token), userId: user.id}
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function getTokenByUserId(userId) {
    const token = await TokenDAO.getByUserId(userId);
    if(token) {
      return token;
    }
    else {
      throw applicationException.new(applicationException.NOT_FOUND, 'Token not found'); 
    }
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    const address = await addressDAO.addAddress({
      userId: user.id,
      firstName: ' ', 
      lastName: ' ',
      locality: ' ',
      postalCode: ' ',
      city: ' ',
      phoneNumber: ' '
    });

    if (await userData.password && address) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  async function getUser(userId) {
    return await userDAO.get(userId);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    getTokenByUserId: getTokenByUserId,
    getUser: getUser
  };
}

export default {
  create: create
};
