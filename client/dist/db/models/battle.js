import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const battleSchema = new Schema({
    winner: {
        type: String,
    },
    loser: {
        type: String,
    },
    date: {
        type: Date,
    }
});
export const Battle = mongoose.model('Battle', battleSchema);
//# sourceMappingURL=battle.js.map