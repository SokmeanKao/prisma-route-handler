const { parseUrl } = require("next/dist/shared/lib/router/utils/parse-url");
const { default: prisma } = require("./prisma");

//Get all customers
export const getAllCustomers = async () => {
  const payload = prisma.customers.findMany({
    orderBy: {
      customer_id: "asc",
    },
  });
  return payload;
};

//Get customer by id
export const getCustomerByID = async (cusId) => {
  try {
    const payload = await prisma.customers.findUnique({
      where: {
        customer_id: parseInt(cusId),
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Create customer
export const createCustomer = async (cusData) => {
  try {
    const payload = await prisma.customers.create({
      data: {
        first_name: cusData.first_name,
        last_name: cusData.last_name,
        birth_date: cusData.birth_date,
        money_spent: cusData.money_spent,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Update customer by id
export const updateCustomerById = async (customerId, newCusData) => {
  try {
    const cusId = parseInt(customerId);
    const payload = await prisma.customers.update({
      where: {
        customer_id: cusId,
      },
      data: {
        first_name: newCusData.first_name,
        last_name: newCusData.last_name,
        birth_date: newCusData.birth_date,
        money_spent: newCusData.money_spent,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Delete a customer
export const deleteCustomerByID = async (cusId) => {
  try {
    const customerId = parseInt(cusId);
    const payload = await prisma.customers.delete({
      where: {
        customer_id: customerId,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};
