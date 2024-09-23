const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    nic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    patientCondition: {
        type: String,
    },
    doctorsNotes: {
        type: String,
    },
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
