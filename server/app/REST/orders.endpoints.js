import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';

const ordersEndpoint = (router) => {

    /**
     * @openapi
     * /api/orders/add:
     *  post:
     *      summary: Create an order
     *      tags:
     *      - Order
     *      description: creates order
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: creates an order in db
     */

    router.post('/api/orders/add', async (request, response, next) => {
        try {
            const result = await business.getOrdersManager(request).addOrder(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/orders/get/{userId}:
     *  get:
     *      summary: Get all orders of user
     *      tags:
     *      - Order
     *      description: Get orders of user
     *      parameters:
     *      - name: userId
     *        in: path
     *        description: userId
     *        required: true
     *      responses:
     *          200:
     *              description: sends all orders of user
     */

    router.get('/api/orders/get', async (request, response, next) => {
        try {
            const result = await business.getOrdersManager(request).getOrders(request.query.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/orders/delete/{orderId}:
     *  delete:
     *      summary: Delete order of user
     *      tags:
     *      - Order
     *      description: delete order
     *      parameters:
     *      - name: orderId
     *        in: path
     *        description: orderId
     *        required: true
     *      responses:
     *          200:
     *              description: deletes order
     */
    
    router.delete('/api/orders/delete/:orderId', async (request, response, next) => {
        try {
          const orderId = request.params.orderId;
          const result = await business.getOrdersManager(request).deleteOrder(orderId);
          response.status(200).send(result);

        } catch (error) {
          applicationException.errorHandler(error, response);
        }
      });

};

export default ordersEndpoint;
