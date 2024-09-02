import { NextResponse } from "next/server";
import {
  getOrderByID,
  updateOrderById,
  deleteOrderByID,
} from "../../../../../lib/prisma/orders-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  if (!isNaN(params.orderId)) {
    const payload = await getOrderByID(params.orderId);
    if (payload) {
      return NextResponse.json({
        status: 200,
        message: `Order ID: ${params.orderId} has been founded`,
        payload,
        status: 200,
      });
    } else {
      return NextResponse.json(
        {
          status: 404,
          payload: payload.meta.cause,
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: `Order Id: [ ${params.orderId} ] not found.`,
      },
      { stauts: 404 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const payload = await updateOrderById(params.orderId, body);
  return NextResponse.json(
    {
      status: 200,
      message: `Order Id: ${params.orderId} have been updated successfully`,
      payload,
    },
    { stauts: 200 }
  );
};

export const DELETE = async (req, { params }) => {
  const payload = await deleteOrderByID(params.orderId);
  return NextResponse.json(
    {
      message: `Order ID: ${params.orderId} have been deleted`,
      payload,
      stauts: 200,
    },
    { status: 200 }
  );
};
