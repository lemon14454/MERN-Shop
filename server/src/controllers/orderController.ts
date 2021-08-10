import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Order from "../models/Order";

export const addOrderItems = async (req: AuthRequest, res: Response) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.json({ error: "購物車為空" });
    } else {
      const order = new Order({
        orderItems,
        user: req.user?._id,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();
      return res.json(createdOrder);
    }
  } catch (error) {
    console.error(error);
    return res.json({ error: "找不到產品" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    return res.json(order);
  } else {
    return res.json({ error: "找不到訂單" });
  }
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } else {
    return res.json({ error: "找不到訂單" });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ user: req.user?._id });
  return res.json(orders);
};

export const getOrders = async (_: AuthRequest, res: Response) => {
  const orders = await Order.find({}).populate("user", "id name");
  return res.json(orders);
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } else {
    return res.json({ error: "找不到訂單" });
  }
};
