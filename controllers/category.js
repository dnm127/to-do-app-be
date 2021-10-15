const { get, isUndefined, isNull } = require('lodash');
const ObjectId = require('mongodb').ObjectId;
const Category = require('../models/category');

exports.getAllCategories = async (req, res, next) => {
  return await Category.find()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      return res.send(error);
    });
};

exports.addCategory = async (req, res, next) => {
  const title = req.body.title;

  const category = new Category({
    title,
  });

  return await category
    .save()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

exports.getOneCategory = async (req, res, next) => {
  const id = req.params.id;

  return await Category.findById(id)
    .then((result) => {
      const data = result;
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send('Category not found');
    })
    .catch((error) => {
      return error;
    });
};

exports.deleteCategories = async (req, res, next) => {
  const ids = req.body.ids;
  return await Category.deleteOne(
    { _id: { $in: ids.map((id) => ObjectId(id)) } },
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      const text = ids.length > 1 ? 'categories' : 'category';
      return res.status(200).send(`Delete ${text} successfully`);
    }
  );
};

exports.editCategory = async function (req, res, next) {
  const id = req.params.id;
  Category.findById(id)
    .then((result) => {
      if (isNull(result) || isUndefined(result)) {
        return res.status(404).send('Can not find category');
      }
      result.title = get(req.body, 'title', result.title);

      return result.save();
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => res.send(error));
};
