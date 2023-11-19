import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';

const newsletterEndpoint = (router) => {

    /**
     * @openapi
     * /api/newsletter/add:
     *  post:
     *      summary: Add email to newsletter
     *      tags:
     *      - Newsletter
     *      description: adds email to db
     *      requestBody:
     *       required: true
     *      responses:
     *          200:
     *              description: Adds user's email to db
     */

    router.post('/api/newsletter/add', async (request, response, next) => {
        try {
            const result = await business.getNewsletterManager(request).addUser(request.body.email);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/newsletter/delete/{email}:
     *  delete:
     *      summary: Delete email from newsletter
     *      tags:
     *      - Newsletter
     *      description: delete email from newsletter
     *      parameters:
     *      - name: email
     *        in: path
     *        description: email
     *        required: true
     *      responses:
     *          200:
     *              description: deletes user's email from db
     */

    router.delete('/api/newsletter/delete/:email', async (request, response, next) => {
        try {
            const userEmail = request.params.email.slice(1);
            const result = await business.getNewsletterManager(request).removeUser(userEmail);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

};

export default newsletterEndpoint;
