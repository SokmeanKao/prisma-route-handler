import {
  getAllOrders,
  createOrder,
} from "../../../../lib/prisma/orders-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload = await getAllOrders();
  return NextResponse.json({
    status: 200,
    message: "Get all orders successfully",
    payload,
    status: 200,
  });
};

export const POST = async (req) => {
  const requsetBody = await req.json();
  const payload = await createOrder(requsetBody);
  console.log(payload);
  if (payload.code === undefined) {
    return NextResponse.json(
      {
        status: 201,
        message: "A new order is created successfully",
        payload,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: "Error creating order",
      },
      { status: 404 }
    );
  }
};
