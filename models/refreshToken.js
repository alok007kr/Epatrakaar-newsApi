import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    tokens: {type: String, unique: true}
}, {timestamps: false})

export default mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens')