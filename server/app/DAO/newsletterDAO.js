import mongoose from 'mongoose';
import * as _ from 'lodash';
import uniqueValidator from 'mongoose-unique-validator';

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true },
});

newsletterSchema.plugin(uniqueValidator);

const NewsletterModel = mongoose.model('Newsletter', newsletterSchema);

async function addUser(email) {
    try {
        const existingUser = await NewsletterModel.findOne({ email });
    
        if (existingUser) {
          console.log('Użytkownik o tym adresie e-mail już istnieje w bazie.');
          return existingUser;
        }

        const newUser = new NewsletterModel({ email });
        await newUser.save();
    
        return newUser;
      } catch (error) {
        console.error('Błąd podczas dodawania użytkownika do bazy danych:', error);
        throw error;
    }
}

async function removeUser(email) {
    try {
        const result = await NewsletterModel.deleteOne({ email });
    
        if (result.deletedCount === 1) {
            return true;
          } else {
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas usuwania użytkownika z bazy danych:', error);
        throw error;
    }
}

export default {
  addUser: addUser,
  removeUser: removeUser,


  model: NewsletterModel
};
