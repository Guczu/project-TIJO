import mongoose from 'mongoose';
import * as _ from 'lodash';
import uniqueValidator from 'mongoose-unique-validator';

const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    locality: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true }
},
{
    collection: "address"
}
);

addressSchema.plugin(uniqueValidator);

const AddressModel = mongoose.model('Address', addressSchema);

async function addAddress(data) {
    try {
        const { userId, ...addressData } = data;
        const existingAddress = await AddressModel.findOne({ userId });

        if (existingAddress) {
            await AddressModel.findOneAndUpdate({ userId }, { $set: addressData });
            return addressData;
        } else {
            const newAddress = new AddressModel({ userId, ...addressData });
            await newAddress.save();
            return newAddress;
        }
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania/aktualizowania adresu:', error);
        throw error;
    }
}

async function getAddress(userId) {
    try {
        const address = await AddressModel.findOne({ userId });

        if (!address) {
            throw new Error('Nie znaleziono adresu dla podanego userId.');
        }

        return address;
    } catch (error) {
        console.error('Wystąpił błąd podczas pobierania adresu:', error);
        throw error;
    }
}


export default {
  addAddress: addAddress,
  getAddress: getAddress,


  model: AddressModel
};
