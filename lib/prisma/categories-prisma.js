import { Prisma } from "@prisma/client";

const { default: prisma } = require("./prisma");

//Get all categories
export const getAllCategories = async () => {
  const payload = prisma.categories.findMany({
    orderBy: {
      category_id: "asc",
    },
  });
  return payload;
};

//Find categories by Id or Name
export const findCategory = async (categoryIdOrName) => {
  // Check if the categoryIdOrName is a number (ID) or a string (name)
  if (!isNaN(categoryIdOrName)) {
    // If it's a number (ID), parse it and find the category by ID
    const categoryById = await prisma.categories.findUnique({
      where: {
        category_id: parseInt(categoryIdOrName),
      },
    });
    return categoryById;
  } else {
    // If it's a string (name), find the category by name
    const categoryByName = await prisma.categories.findFirst({
      where: {
        category_name: categoryIdOrName,
      },
    });
    return categoryByName;
  }
};

//Create categories
export const createCategory = async (cateData) => {
  try {
    const payload = await prisma.categories.createMany({
      data: cateData,
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Update category by id
export const updateCategoryById = async (categoryId, newCateData) => {
  try {
    const payload = await prisma.categories.update({
      where: {
        category_id: parseInt(categoryId),
      },
      data: {
        category_name: newCateData.category_name,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};
