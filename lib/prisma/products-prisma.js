const { parseUrl } = require("next/dist/shared/lib/router/utils/parse-url");
const { default: prisma } = require("./prisma");

//Get all categories
export const getAllProducts = async () => {
  const payload = await prisma.products.findMany({
    orderBy: {
      product_id: "asc",
    },
  });
  return payload;
};

//Insert Products to database
export const insertProduct = async (proData) => {
  try {
    const payload = await prisma.products.create({
      data: {
        category_id: proData.category_id,
        product_name: proData.product_name,
        price: proData.price,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Get product by id or name
export const findProduct = async (proId) => {
  try{
    if (!isNaN(proId)) {
      // If it's a number (ID), parse it and find the product by ID
      const productId = parseInt(proId);
      const productById = await prisma.products.findUnique({
        where: {
          product_id: productId,
        },
      });
      return productById;
    } else {
      // If it's a string (name), find the product by name
      const productByName = await prisma.products.findFirst({
        where: {
          product_name: proId,
        },
      });
      return productByName;
    }
  }catch(e){
    return e;
  }
};

//Get product by category
export const getProductByCategoryId = async (cateId) => {
  try {
    const payload = await prisma.products.findMany({
      where: {
        category_id: parseInt(cateId),
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};

//Update prduct by id
export const updateProductById = async (proId, newProData) => {
  const productId = parseInt(proId);
  try{
    const payload = await prisma.products.update({
      where: {
        product_id: productId,
      },
      data: {
        category_id: newProData.category_id,
        product_name: newProData.product_name,
        price: newProData.price,
      },
    });
    return payload;
  }catch(e){
    return e;
  }
};

//Delete a product by id
export const deleteProductByID = async (proId) => {
  const productId = parseInt(proId);
  try {
    const payload = await prisma.products.delete({
      where: {
        product_id: productId,
      },
    });
    return payload;
  } catch (e) {
    return e;
  }
};
