const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    }, username: {
        type: String,
        required: true
    }, createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    toJSON: {
        getters: true
    },
    id: false
}
);
model.exports = reactionSchema;