import {
  createCategory,
  getAllCategories,
} from "../../../../lib/prisma/categories-prisma";
import { NextResponse } from "next/server";

//Get all categories
export const GET = async () => {
  const payload = await getAllCategories();
  return NextResponse.json({
    status: 200,
    message: "Get all categories successfully",
    payload,
  },{status: 200});
};

//Post a new category
export const POST = async (req) => {
  const requsetBody = await req.json();
  const payload = await createCategory(requsetBody);
  if(payload.code === undefined){
    return NextResponse.json({
      status: 201,
      message: "New categories are created successfully",
      payload,
    },{status: 201});
  }else{
    return NextResponse.json({
      status: 404,
      message: "Error creating category",
    },{status: 404});
  }
};
