import { NextResponse } from "next/server";
import {
  findCategory,
  updateCategoryById,
} from "../../../../../lib/prisma/categories-prisma";

export const GET = async (req, { params }) => {
  // Call findCategory function to search for the category
  const category = await findCategory(params.categoryIdOrName);
  if (category) {
    return NextResponse.json({
      status: 200,
      message: `Get category [ ${params.categoryIdOrName} ] successfully.`,
      payload: category,
    });
  } else {
    // If category is not found, return 404
    return NextResponse.json(
      {
        status: 404,
        message: `Category [ ${params.categoryIdOrName} ] not found.`,
      },
      { status: 404 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const payload = await updateCategoryById(params.categoryIdOrName, body);
  if (!isNaN(params.categoryIdOrName)) {
    if (payload.code == undefined) {
      return NextResponse.json(
        {
          status: 200,
          message: `Category Id: [ ${params.categoryIdOrName} ] have been updated successfully.`,
          payload,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Category Id: [ ${params.categoryIdOrName} ] not found to update.`,
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: `Category Id: [ ${params.categoryIdOrName} ] not found to update.`,
      },
      { status: 404 }
    );
  }
};
