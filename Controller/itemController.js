const Joi = require("joi");
const Item = require("../Model/Item");
const Product = require("../Model/Product");
const date = require("date-and-time");

const itemController = {
  async items(req, res, next) {
    let item;
    try {
      item = await Product.find({}).sort({ _id: -1 });
      if (!item) {
        return next(new Error("items not found!"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(item);
  },

  async getPrevStockInInfo(req, res, next) {
    let pre;
    let d1 = date.parse(req.body.from, "YYYY/MM/DD");
    let d2 = date.parse(req.body.to, "YYYY/MM/DD");

    try {
      pre = await Product.find({
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

  async add(req, res, next) {
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } = req.body;

    let product;
    try {
      product = await Product.create({
        name,
        workOder,
        noofSample,
        // requiredTest,
        sampleType,
        date,
        RequiredAnalysis,
        count,
      });

      if (!product) {
        return next(new Error("Product Not Add"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async update(req, res, next) {
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } = req.body;
    console.log(req.body, 'reqbody');

    let product;
    try {
      product = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name,
          workOder,
          noofSample,
          requiredTest,
          sampleType,
          date,
          count,
          RequiredAnalysis,
        },
        { new: true }
      );
      console.log(product, 'product');
      console.log(req.params.id, 'id');

    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async delete(req, res, next) {
    let product;
    try {
      product = await Product.findByIdAndRemove({ _id: req.params.id });
      if (!product) {
        return next(new Error("Nothing to delete"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },
};

module.exports = itemController;
