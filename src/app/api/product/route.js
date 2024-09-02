import {
  getAllProducts,
  insertProduct,
} from "../../../../lib/prisma/products-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload = await getAllProducts();
  return NextResponse.json(
    {
      status: 200,
      message: "Get all products successfully",
      payload,
    },
    { status: 200 }
  );
};

export const POST = async (req) => {
  const requsetBody = await req.json();
  const payload = await insertProduct(requsetBody);
  if (payload.code === undefined) {
    return NextResponse.json(
      {
        status: 201,
        message: "Create new product successfully.",
        payload,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: "Error creating product.",
      },
      { status: 404 }
    );
  }
};
