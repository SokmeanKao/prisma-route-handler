import { findProduct } from "./products-prisma";

const { parseUrl } = require("next/dist/shared/lib/router/utils/parse-url");
const { default: prisma } = require("./prisma");

//Get all categories
export const getAllOrders = async () => {
  const payload = prisma.orders.findMany({
    orderBy: {
      order_id: "asc",
    },
  });
  return payload;
};

export const getOrderByID = async (ordId) => {
  try {
    const payload = await prisma.orders.findUnique({
      where: {
        order_id: parseInt(ordId),
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

export const getCutomerByID = async (cusId) => {
  try {
    const payload = await prisma.orders.findMany({
      where: {
        customer_id: parseInt(cusId),
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Create customer by id
export const createOrder = async (orderData) => {
  try {
    const product = await findProduct(orderData.product_id);
    const payload = await prisma.orders.create({
      data: {
        order_qty: orderData.order_qty,
        product_id: orderData.product_id,
        customer_id: orderData.customer_id,
        order_total: product.price * orderData.order_qty,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Update order by id
export const updateOrderById = async (orderId, newOrderData) => {
  try {
    const orId = parseInt(orderId);
    const product = await findProduct(newOrderData.product_id);
    const payload = await prisma.orders.update({
      where: {
        order_id: orId,
      },
      data: {
        order_qty: newOrderData.order_qty,
        product_id: newOrderData.product_id,
        customer_id: newOrderData.customer_id,
        order_total: product.price * newOrderData.order_qty,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Delete a order
export const deleteOrderByID = async (orderId) => {
  try {
    const orId = parseInt(orderId);
    const payload = prisma.orders.delete({
      where: {
        order_id: orId,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};
