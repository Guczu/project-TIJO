import newsletterDAO from "../DAO/newsletterDAO.js";

function create(context) {

  async function addUser(email) {
    const result = await newsletterDAO.addUser(email);
    return result;
  }

  async function removeUser(email) {
    const result = await newsletterDAO.removeUser(email);
    return result;
  }

  return {
    addUser: addUser,
    removeUser: removeUser,
  };
}

export default {
  create: create
};
