import mongoose from 'mongoose';
import * as _ from 'lodash';
import uniqueValidator from 'mongoose-unique-validator';

const orderItemSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    product_name: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    available_amount: { type: Number, required: true },
    producer: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const ordersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sessionId: { type: String, required: true},
    orderItems: [orderItemSchema],
    orderDate: { type: Date, default: Date.now },
},
{
    collection: "orders"
}
);

ordersSchema.plugin(uniqueValidator);

const OrdersModel = mongoose.model('Orders', ordersSchema);

async function addOrder(data) {
    try {
        const orderValues = {
            userId: data.userId,
            orderItems: data.products,
            sessionId: data.sessionId
        }

        const newOrder = new OrdersModel(orderValues);
        await newOrder.save();
        return newOrder;
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania zamówienia:', error);
        throw error;
    }
}

async function getOrders(userId) {
    try {
        const orders = await OrdersModel.find({ userId });
        return orders;
    } catch (error) {
        console.error('Wystąpił błąd podczas pobierania zamówień użytkownika:', error);
        throw error;
    }
}

async function deleteOrder(orderId) {
    try {
      const deletedOrder = await OrdersModel.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        throw new Error('Zamówienie o podanym identyfikatorze nie istnieje.');
      }
      return deletedOrder;
    } catch (error) {
      console.error('Wystąpił błąd podczas usuwania zamówienia:', error);
      throw error;
    }
}

export default {
  addOrder: addOrder,
  getOrders: getOrders,
  deleteOrder: deleteOrder,

  model: OrdersModel
};
