const ApiError = require('../error/ApiError');
const productService = require('../services/product.service');

class ProductController {
  async create(req, res, next) {
    try {
      const data = req.body;
      if (!req.files) {
        return next(ApiError.badRequest('Не отправили фото'));
      }
      if (!data.price) {
        return next(ApiError.badRequest('Не отправили цены'));
      }
      const images = [req.files.img].flat();

      const product = await productService.createProduct(data, images);

      return res.json(product);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { limit, page, sortBy, ...data } = req.query;
      const filterParams = Object.keys(data).reduce((acc, product) => {
        if (data[product]) {
          acc[product] = data[product].split('-');
        }
        return acc;
      }, {});
      const products = await productService.getAllProducts(
        limit,
        page,
        sortBy,
        filterParams,
      );

      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async search(req, res, next) {
    try {
      const { search } = req.query;
      if (!search) return;
      const result = await productService.searchProduct(search.toLowerCase());

      return res.json(result);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const products = await productService.getOneProduct(id);
      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!data.price) {
        return next(ApiError.badRequest('Не отправили цены'));
      }

      await productService.editProduct(id, data);
      return res.json('Product was edited');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      return res.json('Product was removed');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProductController();
