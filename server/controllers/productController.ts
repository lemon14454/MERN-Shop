import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          $or: [
            {
              name: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              brand: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return res.json({ message: "找不到產品" });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.json({ message: "找不到產品" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      return res.json({ message: "商品移除" });
    } else {
      return res.json(product);
    }
  } catch (error) {
    return res.json({ message: "找不到產品" });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user?._id,
      image: "sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      stock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();
    return res.json(createdProduct);
  } catch (error) {
    return res.json({ message: "建立商品時發生錯誤" });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price, description, image, brand, category, stock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.stock = stock;

      const updatedProduct = await product.save();
      return res.json(updatedProduct);
    } else {
      return res.json({ message: "找不到商品" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "找不到商品" });
  }
};

export const createProductReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating } = req.body;

    const product = await Product.findById(req.params.id);

    product.rating = (rating * product.numReviews) / (product.numReviews + 1);
    product.numReviews += 1;

    await product.save();
    return res.json({ message: "新增評價" });
  } catch (error) {
    return res.json({ message: "找不到商品" });
  }
};

export const getTopProducts = async (_: AuthRequest, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};
