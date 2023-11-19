import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';

const productEndpoint = (router) => {

    /**
     * @openapi
     * /api/products/get/{filters}:
     *  get:
     *      summary: Get filtered products
     *      tags:
     *      - Product
     *      description: Get filtered products
     *      parameters:
     *      - name: filters
     *        in: path
     *        description: filters
     *        required: true
     *      responses:
     *          200:
     *              description: sends filtered products
     */

    router.get('/api/products/get', async (request, response, next) => {
        try {
            const result = await business.getProductManager(request).getFilteredProducts(request.query);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/products/available-filters:
     *  get:
     *      summary: Get available filters
     *      tags:
     *      - Product
     *      description: Get list of filters
     *      responses:
     *          200:
     *              description: sends list of available filters
     */

    router.get('/api/products/available-filters', async (request, response, next) => {
        try {
            const result = await business.getProductManager(request).getAvailableFilters();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/discount-code/{code}:
     *  get:
     *      summary: Check if discount code is valid
     *      tags:
     *      - Discount
     *      description: check if discount code is Valid
     *      parameters:
     *      - name: code
     *        in: path
     *        description: discount code
     *        required: true
     *      responses:
     *          200:
     *              description: sends information about this code if its valid
     */

    router.get('/api/discount-code', async (request, response, next) => {
        try {
            const result = await business.getProductManager(request).isDiscountCodeValid(request.query.code);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/products/find-product/{productId}:
     *  get:
     *      summary: Get product by id
     *      tags:
     *      - Product
     *      description: Get product by id
     *      parameters:
     *      - name: productId
     *        in: path
     *        description: id of product
     *        required: true
     *      responses:
     *          200:
     *              description: sends product as object if exists
     */

    router.get('/api/products/find-product', async (request, response, next) => {
        try {
            const result = await business.getProductManager(request).getProduct(request.query);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    /**
     * @openapi
     * /api/products/get-popular-products:
     *  get:
     *      summary: Get list of top 10 popular products
     *      tags:
     *      - Product
     *      description: Get list of popular products
     *      responses:
     *          200:
     *              description: sends list of popular products
     */

    router.get('/api/products/get-popular-products', async (request, response, next) => {
        try {
            const result = await business.getProductManager(request).getTop10ByOrdersAmount();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
};

export default productEndpoint;
