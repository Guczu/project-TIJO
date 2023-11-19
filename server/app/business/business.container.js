'use strict';

import userManager from './user.manager.js';
import productManager from './product.manager.js';
import newsletterManager from './newsletter.manager.js';
import addressManager from './address.manager.js';
import paymentsManager from './payments.manager.js';
import ordersManager from './orders.manager.js';

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getProductManager: getter(productManager),
    getNewsletterManager: getter(newsletterManager),
    getAddressManager: getter(addressManager),
    getPaymentsManager: getter(paymentsManager),
    getOrdersManager: getter(ordersManager),
};
