import ordersDAO from "../DAO/ordersDAO.js";

function create(context) {

  async function addOrder(data) {
    const result = await ordersDAO.addOrder(data);
    return result;
  }

  async function getOrders(userId) {
    const result = await ordersDAO.getOrders(userId);
    return result;
  }

  async function deleteOrder(orderId) {
    const result = await ordersDAO.deleteOrder(orderId);
    return result;
  }

  return {
    addOrder: addOrder,
    getOrders: getOrders,
    deleteOrder: deleteOrder,
  };
}

export default {
  create: create
};
