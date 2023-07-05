const User = require('../models/User');
const { hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, dob, house_address, password } = req.body;

    // Validate input
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      dob: Joi.date().required(),
      house_address: Joi.string().required(),
      password: Joi.string()
        .min(6)
        .required()
        .regex(/^(?=.*[!@#$%^&*])/, 'at least one special character')
        .messages({
          'string.pattern.base': 'Password must contain at least one special character',
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = `Bad Request ${error.details[0].message}`;
      return res.status(400).json({ error: errorMessage });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Invalid email account, Email already exists" });
    }

    // Generate UUID for the user ID
    const userId = uuidv4();

    // Create the user
    const newUser = new User({
      _id: userId,
      first_name,
      last_name,
      phone,
      email,
      dob,
      house_address,
      password: await hashPassword(password) // Assuming you have a hashPassword function
    });

    try {
        console.log(newUser); // Check the newUser object
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (saveError) {
        console.error(saveError); // Log the saveError object for debugging
      return res.status(500).json({ error: "Failed to save user to the database" });
    }
    } catch (error) {
    if (error.name === 'MongoTimeoutError') {
      return res.status(500).json({ error: "Query timeout. Please try again later." });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
    }
};