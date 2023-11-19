import userEndpoint from './user.endpoint.js';
import productEndpoint from './product.endpoint.js'
import newsletterEndpoint from './newsletter.endpoints.js';
import addressEndpoint from './address.endpoint.js';
import paymentsEndpoint from './payments.endpoint.js';
import ordersEndpoint from './orders.endpoints.js';

const routes = function (router) {
    userEndpoint(router);
    productEndpoint(router);
    newsletterEndpoint(router);
    addressEndpoint(router);
    paymentsEndpoint(router);
    ordersEndpoint(router);
};

export default routes;
