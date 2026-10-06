const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true
        },

        purpose: {
            type: String,
            required: true,
            trim: true
        },

        personToMeet: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        checkIn: {
            type: Date,
            default: Date.now
        },

        checkOut: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["Checked In", "Checked Out"],
            default: "Checked In"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Visitor", visitorSchema);