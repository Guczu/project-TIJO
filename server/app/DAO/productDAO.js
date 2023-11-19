import mongoose from 'mongoose';
import * as _ from 'lodash';
import applicationException from '../service/applicationException.js';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter.js'

const productSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    product_name: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    available_amount: { type: Number, required: true },
    producer: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: String, required: true },
    ordersAmount: { type: Number, default: 0 },
  });

const discountCodesSchema = new mongoose.Schema({
  code: { type: String, required: true },
  freeShip: { type: Boolean, required: true },
  priceDiscount: { type: Boolean, required: true },
  discountValue: { type: Number, required: true },
}, {
  collection: 'discountCodes'
});

productSchema.plugin(uniqueValidator);
discountCodesSchema.plugin(uniqueValidator);

const ProductModel = mongoose.model('Product', productSchema);
const DiscountModel = mongoose.model('Discount', discountCodesSchema);

function getByFilters(data) {
    const { name, shop_name, category, minPrice, maxPrice, page, perPage } = data;
    const skip = (page - 1) * perPage;
    const query = {};

    if (shop_name && shop_name.length > 0) {
      query.shop_name = { $in: shop_name };
    }

    if (category && category.length > 0) {
      query.category = { $in: category };
    }
  
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
  
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
  
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }

    if (name && name.length > 0) {
      query.product_name = { $regex: new RegExp(name, 'i') };
    }
  
    return ProductModel.find(query)
      .skip(skip)
      .limit(parseInt(perPage))
      .exec()
      .then((products) => {
        return products;
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania produktów:', error);
        throw applicationException.errorHandler(error);
      });
}

async function getAvailableFilters() {
    try {
      const shops = await ProductModel.distinct('shop_name');
      const categories = await ProductModel.distinct('category');
  
      return { 
        available_shops: shops,
        available_categories: categories
      };
    } catch (err) {
      console.error('Błąd podczas pobierania dostępnych sklepów:', err);
      throw err;
    }
}

async function isDiscountCodeValid(discountCode) {
  try {
    const result = await DiscountModel.findOne({ code: discountCode })

    if (result) {
      return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Nie znaleziono kodów rabatowych');

  } catch (err) {
    console.error('Błąd podczas pobierania kodów rabatowych:', err);
    throw err;
  }
}

async function getProduct(product) {
  try {
    const result = await ProductModel.find({ product_name: { $regex: new RegExp(product.name, 'i') } });

    if (result.length > 0) {
      return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Nie znaleziono produktów');

  } catch (err) {
    console.error('Błąd podczas pobierania produktów:', err);
    throw err;
  }
}

async function updateOrdersAmount(data) {
  try {
    const productId = data.items.map((product) => product._id);

    await ProductModel.updateMany(
      { _id: { $in: productId } },
      { $inc: { ordersAmount: 1 } }
    );

  } catch (err) {
    console.error('Błąd podczas aktualizacji "ordersAmount" dla produktów:', err);
    throw err;
  }
}

async function getTop10ByOrdersAmount() {
  try {
    const topProducts = await ProductModel.find({})
      .sort({ ordersAmount: -1 })
      .limit(10);

    return topProducts;
  } catch (err) {
    console.error('Błąd podczas pobierania 10 produktów z największą ilością "ordersAmount":', err);
    throw err;
  }
}

export default {
  getByFilters: getByFilters,
  getAvailableFilters: getAvailableFilters,
  isDiscountCodeValid: isDiscountCodeValid,
  getProduct: getProduct,
  updateOrdersAmount: updateOrdersAmount,
  getTop10ByOrdersAmount: getTop10ByOrdersAmount,

  model: ProductModel
};
