import mongoose from 'mongoose';
import { database } from '../config.js';

(async () => {
    try {
        await mongoose.connect(database);
    } catch (err) {
        console.log(err);
    }
})();
