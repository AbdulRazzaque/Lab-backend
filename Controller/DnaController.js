const Joi = require("joi");
const Dna = require('../Model/Dna');
const date = require("date-and-time");

const DnaController = {
  async itemsDna(req, res, next) {
    let item;
    try {
      item = await Dna.find().sort({ _id: -1 });
      if (!item) {
        return next(new Error("items not found!"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(item);
  },

  async getPrevStockDna(req, res, next) {
    let pre;
    let d1 = date.parse(req.body.from, "YYYY/MM/DD");
    let d2 = date.parse(req.body.to, "YYYY/MM/DD");

    try {
      pre = await Dna.find({
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

  async addDna(req, res, next) {
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } = req.body;

    let product;
    try {
      product = await Dna.create({
        name,
        workOder,
        noofSample,
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

  async updateDna(req, res, next) {
    const { name, workOder, noofSample, requiredTest, sampleType, date, RequiredAnalysis, count } = req.body;
    console.log(req.body, 'reqbody')

    let product;
    try {
      product = await Dna.findByIdAndUpdate(
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
        }, { new: true }
      );
      console.log(product, 'product')
      console.log(req.params.id, 'id')

    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async deleteDna(req, res, next) {
    let product;
    try {
      product = await Dna.findByIdAndRemove({ _id: req.params.id });
      if (!product) {
        return next(new Error("Nothing to delete"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },
};

module.exports = DnaController;
