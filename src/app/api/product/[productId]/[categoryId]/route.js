import { NextResponse } from "next/server";
import { getProductByCategoryId } from "../../../../../../lib/prisma/products-prisma";
import { PrismaClient } from "@prisma/client";

export const GET = async (req, { params }) => {
  if (!isNaN(params.categoryId)) {
    const products = await getProductByCategoryId(params.categoryId);
    if (products.length !== 0) {
      return NextResponse.json(
        {
          status: 200,
          message: `Get Products by category: [ ${params.categoryId} ] successfully.`,
          payload: products,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Products by category: [ ${params.categoryId} ] not found.`,
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: `Products by category: [ ${params.categoryId} ] not found.`,
      },
      { status: 404 }
    );
  }
};
