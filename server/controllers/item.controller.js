const { Item, ItemImg, ItemPrice } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const { INCLUDES_MODELS } = require("../constants/consts");
const makeEntitiesForFilters = require("../utils/makeEntitiesForFilters");
const { convertAndSavePic, removePic } = require("../utils/saveAndRemovePic");

class ItemController {
  async create(req, res, next) {
    try {
      let { price, ...data } = req.body;
      if (!req.files) {
        next(ApiError.badRequest("Не отправили фото"));
      }
      let { img } = req.files;

      const item = await Item.create({
        ...data,
      });

      makeEntitiesForFilters(item);

      if (price) {
        price = JSON.parse(price);
        price.forEach(
          async (i) =>
            await ItemPrice.create({
              weight: i.weight,
              value: i.value,
              ItemId: item.id,
            }),
        );
      }

      Array.isArray(img) ? img : (img = [img]);
      img.forEach(async (i) => {
        let fileName = uuid.v4() + ".jpg";
        convertAndSavePic(i, fileName);

        await ItemImg.create({
          name: fileName,
          ItemId: item.id,
        });
      });

      return res.json(item);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page, ...data } = req.query;
      const filterParams = Object.keys(data).reduce((acc, item) => {
        if (data[item]) {
          acc[item] = data[item].split("-");
        }
        return acc;
      }, {});

      let offset = page * limit - limit;
      let items;

      if (!Object.keys(filterParams).length) {
        items = await Item.findAndCountAll({
          include: INCLUDES_MODELS,
          order: [[{ model: ItemPrice, as: "price" }, "value", "ASC"]],
        });
      }
      if (Object.keys(filterParams).length) {
        items = await Item.findAndCountAll({
          where: { ...filterParams },
          limit,
          offset,
          include: INCLUDES_MODELS,
          order: [[{ model: ItemPrice, as: "price" }, "value", "ASC"]],
        });
      }

      return res.json(items);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const items = await Item.findOne({
        where: { id },
        include: INCLUDES_MODELS,
      });
      return res.json(items);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      let data = req.body;

      await Item.update(data, { where: { id } });
      const item = await Item.findOne({ where: { id } });

      makeEntitiesForFilters(item);

      if (data.price) {
        const price = JSON.parse(data.price);
        price.forEach(async (i) =>
          i.ItemId
            ? await ItemPrice.update(
                {
                  weight: i.weight,
                  value: i.value,
                },
                { where: { id: i.id } },
              )
            : await ItemPrice.create({
                weight: i.weight,
                value: i.value,
                ItemId: id,
              }),
        );
      }
      return res.json(item);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const img = await ItemImg.findAll({ where: { ItemId: id } });

      img.forEach(async (i) => {
        await removePic(i.name);
      });

      makeEntitiesForFilters(id);
      await ItemImg.destroy({ where: { ItemId: id } });
      await ItemPrice.destroy({ where: { ItemId: id } });
      await Item.destroy({ where: { id } });
      return res.json("Item was removed");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ItemController();
