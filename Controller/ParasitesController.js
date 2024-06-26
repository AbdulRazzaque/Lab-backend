const Joi = require("joi");
const Parasites = require("../Model/Parasites");
const date = require("date-and-time");

const ParasitesController = {
  async itemsParasites(req, res, next) {
    let item;
    try {
      item = await Parasites.find().sort({ _id: -1 });
      if (!item) {
        return next(new Error("items not found!"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(item);
  },

  async getPrevStockParasites(req, res) {
    let pre;
   
    let d1 = date.parse(req.body.from, "YYYY/MM/DD");
    let d2 = date.parse(req.body.to, "YYYY/MM/DD");
  
    try {
      pre = await Parasites.find({
        name: req.body.name,
        RequiredAnalysis: req.body.RequiredAnalysis,
        $and: [{ date: { $gte: d1 } }, { date: { $lte: d2 } }]
      });
    } catch (error) {
      return next(error);
    }
    res.status(200).send({ msg: "success", pre });
    console.log(pre);
  },

  async addParasites(req, res, next) {
    // const productsSchema = Joi.object({
    //   name: Joi.string().required(),
    //   workOder: Joi.string().required(),
    //   noofSample: Joi.string().required(),
    //   sampleType: Joi.string().required(),
    //   date: Joi.date().required(),
    //   RequiredAnalysis: Joi.string().required(),
    //   count: Joi.required(),
    // });
    // const { error } = productsSchema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } =
      req.body;

    let product;
    try {
      product = await Parasites.create({
        name,
        workOder,
        noofSample,
        sampleType,
        date,
        RequiredAnalysis,
        count
      });

      if (!product) {
        return next(new Error("Product Not Add"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async updateParasites(req, res, next) {
    // const updateSchema = Joi.object({
    //   name: Joi.string(),
    //   workOder: Joi.number(),
    //   noofSample: Joi.number(),
    //   requiredTest: Joi.string(),
    //   sampleType: Joi.string(),
    //   date: Joi.date(),
    // });
    // const { error } = updateSchema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } =
      req.body;
    console.log(req.body, 'reqbody');
    let product;
    try {
      product = await Parasites.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name,
          workOder,
          noofSample,
          requiredTest,
          sampleType,
          date,
          count,
          RequiredAnalysis
        }, { new: true }
      );
      console.log(product, 'product');
      console.log(req.params.id, 'id');
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async deleteParasites(req, res, next) {
    let product;
    try {
      product = await Parasites.findByIdAndRemove({ _id: req.params.id });
      if (!product) {
        return next(new Error("Noting to delete"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  }
};

module.exports = ParasitesController;
