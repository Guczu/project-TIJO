import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';
import auth from '../middleware/auth.js';

const userEndpoint = (router) => {

    /**
     * @openapi
     * /api/user/auth:
     *  post:
     *      summary: Authenticate user
     *      tags:
     *      - User
     *      description: authenticate user
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: sends user's token
     */

    router.post('/api/user/auth', async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).authenticate(request.body.name, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/user/create:
     *  post:
     *      summary: Create new user
     *      tags:
     *      - User
     *      description: create new user
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: new user is created
     */

    router.post('/api/user/create', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/user/token/{userId}:
     *  get:
     *      summary: Get user's token
     *      tags:
     *      - User
     *      description: Get user's token
     *      parameters:
     *      - name: userId
     *        in: path
     *        description: user get by id
     *        required: true
     *      responses:
     *          200:
     *              description: sends user's token
     */

    router.get('/api/user/token', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).getTokenByUserId(request.query.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/user/logout:
     *  post:
     *      summary: Logout user
     *      tags:
     *      - User
     *      description: logout user
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: user's token removed from db
     */

    router.post('/api/user/logout', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

     /**
     * @openapi
     * /api/user/isauth:
     *  post:
     *      summary: Check if user is authenticated
     *      tags:
     *      - User
     *      description: check if user is authenticated
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: returns true or false
     */

    router.post('/api/user/isauth', auth, async (request, response, next) => {
        try {
            response.status(200).send(request.isValid);
        } catch (error) {
            response.status(error.status).send(request.isValid);
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/user/get-user/{userId}:
     *  get:
     *      summary: Get user by id
     *      tags:
     *      - User
     *      description: Get user with id
     *      parameters:
     *      - name: userId
     *        in: path
     *        description: user get by id
     *        required: true
     *      responses:
     *          200:
     *              description: user fetched successfully
     */

    router.get('/api/user/get-user', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).getUser(request.query.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

};

export default userEndpoint;
