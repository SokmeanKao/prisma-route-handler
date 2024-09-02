import { NextResponse } from "next/server";
import { getCutomerByID } from "../../../../../../lib/prisma/orders-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  if (!isNaN(params.customerId)) {
    const payload = await getCutomerByID(params.customerId);
    if (payload.code === undefined) {
      return NextResponse.json(
        {
          status: 200,
          message: `Get order by Customer ID: ${params.customerId} has been founded`,
          payload,
        },
        { status: 200 }
      );
    } else if(payload.name === 'PrismaClientValidationError') {
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
        message: `Order by Customer Id: [ ${params.customerId} ] not found.`,
      },
      { stauts: 404 }
    );
  }
};
