const { get, isUndefined, isNull, omit, toNumber } = require('lodash');
const ObjectId = require('mongodb').ObjectId;
const { PRIORITY, STATE } = require('../constants/task');
const Task = require('../models/task');
const Category = require('../models/category');

exports.getAllTasks = async (req, res, next) => {
  const offset = get(req.query, 'offset', 0);
  const limit = get(req.query, 'limit', 5);
  const category = get(req.query, 'category', 'all');

  const findQuery = {};
  if (category !== 'all') {
    findQuery.category = category;
  }

  return await Task.find(findQuery)
    // .select('title description priority state createdAt modifiedAt')
    // .populate('category')
    .sort({ createdAt: 'desc' })
    .skip(toNumber(offset))
    .limit(toNumber(limit))
    .then((result) => {
      return res.status(200).send({ success: true, data: result });
    })
    .catch((error) => {
      return res.send({ error: error });
    });
};

exports.addTask = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const state = get(req.body, 'state', STATE.TO_DO);
  const priority = get(req.body, 'priority', PRIORITY.MEDIUM);
  const createdAt = new Date();
  const modifiedAt = createdAt;
  const categoryId = req.body.categoryId;
  let newCategoryName = req.body.newCategoryName;

  let category;

  if (categoryId && categoryId !== '') {
    newCategoryName = '';
    category = await Category.findById(categoryId);
  }
  if (newCategoryName && newCategoryName !== '') {
    let data;
    const existingCategory = await Category.findOne({
      title: newCategoryName,
    });
    if (existingCategory) {
      data = existingCategory;
    } else {
      const newCategorySchema = new Category({
        title: newCategoryName,
      });
      data = await newCategorySchema.save();
    }
    category = data;
  }
  const task = new Task({
    title,
    description,
    state,
    priority,
    createdAt,
    modifiedAt,
    category,
  });

  return await task
    .save()
    .then((result) => {
      return res.status(200).send({ succes: true, data: result });
    })
    .catch((err) => {
      return res.send({ error: err });
    });
};

exports.getOneTask = async (req, res, next) => {
  const id = req.params.id;

  return await Task.findById(id)
    // .populate('category')
    .then((result) => {
      if (result) {
        return res.status(200).send({ succes: true, data: result });
      } else {
        return res.status(404).send({ error: 'Task not found' });
      }
    })
    .catch((error) => {
      return error;
    });
};

exports.deleteTasks = async (req, res, next) => {
  const ids = req.body.ids;
  return await Task.deleteMany(
    { _id: { $in: ids.map((id) => ObjectId(id)) } },
    (error, result) => {
      if (error) {
        return res.send({ error: error });
      }
      return res.status(200).send({
        success: true,
        message: 'Delete task(s) successfully',
        data: {
          ids: ids,
        },
      });
    }
  );
};

exports.editTask = async function (req, res, next) {
  const id = req.params.id;

  // let catgoryData;
  // const categoryId = req.body.categoryId;
  // let newCategoryName = req.body.newCategoryName;

  // if (categoryId && categoryId !== '') {
  //   newCategoryName = '';
  //   catgoryData = await Category.findById(categoryId);
  // }
  // if (newCategoryName && newCategoryName !== '') {
  //   let data;
  //   const existingCategory = await Category.findOne({
  //     title: newCategoryName,
  //   });
  //   if (existingCategory) {
  //     data = existingCategory;
  //   } else {
  //     const newCategorySchema = new Category({
  //       title: newCategoryName,
  //     });
  //     data = await newCategorySchema.save();
  //   }
  //   catgoryData = data;
  // }

  // Task.findById(id)
  //   .then((result) => {
  //     console.log(result);
  //     if (isNull(result) || isUndefined(result)) {
  //       return res.status(404).send('Can not find task');
  //     }
  //     result.title = get(req.body, 'title', result.title);
  //     result.description = get(req.body, 'description', result.description);
  //     result.state = get(req.body, 'state', result.state);
  //     result.priority = get(req.body, 'priority', result.priority);
  //     result.createdAt = get(req.body, 'createdAt', result.createdAt);
  //     result.category = catgoryData;
  //     result.modifiedAt = new Date();
  //     return result.save();
  //   })
  //   .then((result) => {
  //     return res.status(200).send(result);
  //   })
  //   .catch((error) => res.send(error));

  const result = await Task.findById(id).exec();
  if (result) {
    let catgoryData;
    const categoryId = req.body.categoryId;
    let newCategoryName = req.body.newCategoryName;
    if (categoryId && categoryId !== '') {
      newCategoryName = '';
      catgoryData = await Category.findById(categoryId);
    }
    if (newCategoryName && newCategoryName !== '') {
      let data;
      const existingCategory = await Category.findOne({
        title: newCategoryName,
      });
      if (existingCategory) {
        data = existingCategory;
      } else {
        const newCategorySchema = new Category({
          title: newCategoryName,
        });
        data = await newCategorySchema.save();
      }
      catgoryData = data;
    }
    result.title = get(req.body, 'title', result.title);
    result.description = get(req.body, 'description', result.description);
    result.state = get(req.body, 'state', result.state);
    result.priority = get(req.body, 'priority', result.priority);
    result.createdAt = get(req.body, 'createdAt', result.createdAt);
    result.category = catgoryData;
    result.modifiedAt = new Date();
    result.save();
    return res.status(200).send({ success: true, data: result });
  } else {
    return res.status(404).send({ error: 'Can not find task' });
  }
};
