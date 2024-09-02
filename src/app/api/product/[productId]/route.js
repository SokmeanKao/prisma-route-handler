import { NextResponse } from "next/server";
import {
  findProduct,
  updateProductById,
  deleteProductByID,
} from "../../../../../lib/prisma/products-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  // Call findproduct function to search for the product
  const product = await findProduct(params.productId);
  // If product is found, return that product
  if (product) {
    return NextResponse.json({
      status: 200,
      message: `Get products [ ${params.productId} ] successfully.`,
      payload: product,
    });
  } else {
    // If product is not found, return 404
    return NextResponse.json(
      {
        status: 404,
        message: `Product [ ${params.productId} ] not found.`,
      },
      { status: 404 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const payload = await updateProductById(params.productId, body);
  if (!isNaN(params.productId)) {
    if (payload.code === undefined) {
      return NextResponse.json(
        {
          status: 200,
          message: `Product Id: ${params.productId} have been updated successfully`,
          payload,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: payload.meta.cause,
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: `Product Id: [ ${params.productId} ] not found.`,
      },
      { status: 404 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const payload = await deleteProductByID(params.productId);
  if (!isNaN(params.productId)) {
    if (payload.code === undefined) {
      return NextResponse.json({
        status: 200,
        message: `Product ID: ${params.productId} have been deleted`,
        payload,
        stauts: 200,
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
        message: `Product ID: [ ${params.productId} ] not found to delete.`,
      },
      { stauts: 404 }
    );
  }
};
