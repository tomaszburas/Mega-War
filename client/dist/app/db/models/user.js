import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Given username already exists'],
        minLength: [3, 'Username must be longer than 3 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be longer than 5 characters']
    },
    params: {
        strength: { type: Number, default: 0 },
        defense: { type: Number, default: 0 },
        resilience: { type: Number, default: 0 },
        agility: { type: Number, default: 0 },
    },
    warrior: { type: String, default: '' },
    wins: { type: Number, default: 0 },
    loses: { type: Number, default: 0 },
});
userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});
userSchema.path('username').set((value) => {
    return value.trim();
});
userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        error.message = 'This username exists in the database';
    }
    next(error);
});
userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map