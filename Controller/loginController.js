const Joi = require("joi");
const Item = require("../Model/Item");
const bcrypt = require('bcrypt');
const jsonwebservise = require("../error/jsonwebtoken");

const loginController = {

  async login(req, res, next) {

    const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Check email and password in the database
    try {
      const user = await Item.findOne({ email: req.body.email });
      if (!user) {
        return next(new Error('User not found'));
      }
      
      const passwordValid = await bcrypt.compare(req.body.password, user.password);
      if (!passwordValid) {
        return next(new Error('Password is incorrect'));
      }

      const access_jwt_token = jsonwebservise.sign({ id: user._id });
      res.json({ access_jwt_token });

    } catch (err) {
      return next(err);
    }

  }
};

module.exports = loginController;
