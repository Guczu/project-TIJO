import paymentsDAO from "../DAO/paymentsDAO.js";
import productDAO from "../DAO/productDAO.js";

function create(context) {

  async function createPayment(data) {
    const result = await paymentsDAO.createPayment(data);
    await productDAO.updateOrdersAmount(data);
    return result;
  }

  async function checkSession(data) {
    const result = await paymentsDAO.checkSession(data);
    return result;
  }

  return {
    createPayment: createPayment,
    checkSession: checkSession
  };
}

export default {
  create: create
};
