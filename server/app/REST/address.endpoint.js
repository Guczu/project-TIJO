import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';

const addressEndpoint = (router) => {

     /**
     * @openapi
     * /api/address/add:
     *  post:
     *      summary: Add user's address
     *      tags:
     *      - Address
     *      description: adds user's address to db
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: adds user's address to db
     */

    router.post('/api/address/add', async (request, response, next) => {
        try {
            const result = await business.getAddressManager(request).addAddress(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/address/get/{userId}:
     *  get:
     *      summary: Get address of user
     *      tags:
     *      - Address
     *      description: Get address of user
     *      parameters:
     *      - name: userId
     *        in: path
     *        description: user get by id
     *        required: true
     *      responses:
     *          200:
     *              description: sends user's address
     */

    router.get('/api/address/get', async (request, response, next) => {
        try {
            const result = await business.getAddressManager(request).getAddress(request.query.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

};

export default addressEndpoint;
