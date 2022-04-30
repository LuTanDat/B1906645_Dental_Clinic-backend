const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');
const Doctor = require("../models/doctor.model");

// Create and Save a new doctors
exports.create = async (req, res, next) => { // .create: tao document trong collection doctor (new doctor)

    // Validate request
    if(!req.body.name) {
        return next(new BadRequestError(404, "Name can not be empty"));
    }

    // Create a doctors
    const doctor = new Doctor({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        position: req.body.position,
        educationLevel: req.body.educationLevel,
        experience: req.body.experience,
        numberOfSeatsAvailable: req.body.numberOfSeatsAvailable,
    });

    try {
        // Save doctors in the database
        const document = await doctor.save();
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while creating the doctors"
            )
        );
    }
};

// Retrieve all doctorss of a user from the database
exports.findAll = async (req, res, next) => {

    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" };
    }

    try {
        const document = await Doctor.find(condition);
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while retrieving doctors"
            )
        );
    }
};


// Find a single doctors with an id
exports.findOne = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Doctor.findOne(condition);
        if(!document) {
            return next(new BadRequestError(404, "Doctors not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error retrieving doctors with id = ${req.params.id}`
            )
        );
    }
};

// Update a doctors by the id in the request
exports.update = async (req, res, next) => {

    if(Object.keys(req.body).length === 0) {
        return next(
            new BadRequestError(400,"Data to update can not be empty"));
    }

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Doctor.findOneAndUpdate(condition, req.body, {
            new: true,
        });
        if(!document) {
            return next(new BadRequestError(404, "doctors not found"));
        }
        return res.send({ message: "doctors was updated successfully", });
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error updating doctors with id=${req.params.id}`
            )
        );
    }
};


// Delete a doctors with the specified id in the request
exports.delete = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };


    try {
        const document = await Doctor.findOneAndDelete(condition);
        if(!document) {
            return next(new BadRequestError(404, "doctors not found"));
        }
        return res.send({ message: "doctors was deleted successfully", });  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Could not delete doctors with id=${req.params.id}`
            )
        );
    }
};

// Delete all doctors of a user from the database
exports.deleteAll = async(req, res, next) => {

    try {
        const data = await Doctor.deleteMany({});
        return res.send({
            message: `${data.deletedCount} doctors was deleted successfully`
        }); 
    } catch (error) {
        return next(
            new BadRequestError(
                500,`An error occurred while removing all doctors`
            )
        );
    }
};