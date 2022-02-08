import * as mongoose from 'mongoose';
import { database } from '../config';

(async () => {
    try {
        await mongoose.connect(database);
    } catch (err) {
        console.log(err);
    }
})();
