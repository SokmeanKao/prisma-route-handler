import { NextResponse } from "next/server";
import {
  getCustomerByID,
  updateCustomerById,
  deleteCustomerByID,
} from "../../../../../lib/prisma/customers-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  if (!isNaN(params.customerId)) {
    const payload = await getCustomerByID(params.customerId);
    if (payload) {
      return NextResponse.json(
        {
          status: 200,
          message: `Customer ID: ${params.customerId} has been founded`,
          payload,
        },
        { status: 200 }
      );
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
        message: `Customer Id: [ ${params.customerId} ] not found.`,
      },
      { stauts: 404 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  if (!isNaN(params.customerId)) {
    const payload = await updateCustomerById(params.customerId, body);
    if (payload.code === undefined) {
      return NextResponse.json({
        status: 200,
        message: `Customer Id: ${params.customerId} have been updated successfully`,
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
        message: `Customer Id: [ ${params.customerId} ] not found.`,
      },
      { stauts: 404 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  if (!isNaN(params.customerId)) {
    const payload = await deleteCustomerByID(params.customerId);
    if (payload.code === undefined) {
      return NextResponse.json(
        {
          message: `Customer ID: ${params.proId} have been deleted`,
          payload,
          stauts: 200,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Customer ID: [ ${params.customerId} ] not found.`,
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        status: 404,
        message: `Customer Id: [ ${params.customerId} ] not found.`,
      },
      { stauts: 404 }
    );
  }
};
