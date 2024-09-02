import {
  getAllCustomers,
  createCustomer,
} from "../../../../lib/prisma/customers-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload = await getAllCustomers();
  return NextResponse.json(
    {
      status: 200,
      message: "Get all customers successfully",
      payload,
    },
    { status: 200 }
  );
};

export const POST = async (req) => {
  const requsetBody = await req.json();
  const payload = await createCustomer(requsetBody);
  if (payload.code === undefined) {
    return NextResponse.json(
      {
        status: 201,
        message: "New customer is created successfully",
        payload,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: "Error creating customer",
        payload,
      },
      { status: 404 }
    );
  }
};
