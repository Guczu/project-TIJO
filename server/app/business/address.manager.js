import addressDAO from "../DAO/addressDAO.js";

function create(context) {

  async function addAddress(data) {
    const result = await addressDAO.addAddress(data);
    return result;
  }

  async function getAddress(userId) {
    const result = await addressDAO.getAddress(userId);
    return result;
  }

  return {
    addAddress: addAddress,
    getAddress: getAddress,
  };
}

export default {
  create: create
};
