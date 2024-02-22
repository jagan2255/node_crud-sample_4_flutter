const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(

    {

        title: String,
        description: String,
        isActive: {
            type: Boolean,
            default: true
        }

    });

module.exports = mongoose.model('Users', UserSchema);