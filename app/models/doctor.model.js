const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Doctor name is required"],
        },
        slug: {
            type: String,
            require: [true, "Doctor name is required"],
        },
        image: {
            type: String,
            require: [true, "Doctor name is required"],
        },
        position: {// chuc vu
            type: String,
            require: [true, "Doctor name is required"],
        },
        educationLevel: {
            type: String,
            require: [true, "Doctor name is required"],
        },
        experience: {
            type: String,
            require: [true, "Doctor name is required"],
        },
        numberOfSeatsAvailable: {
            type: Number,
            require: [true, "Doctor name is required"],
        },
    },
    { timestamp: true,}
);

// Replace _id with id and remove __V
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("doctor", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema