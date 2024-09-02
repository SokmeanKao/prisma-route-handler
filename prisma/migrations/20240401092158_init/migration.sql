/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "customers";

-- CreateTable
CREATE TABLE "Categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" SERIAL NOT NULL,
    "order_total" DOUBLE PRECISION NOT NULL,
    "order_qty" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "money_spent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "Categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Products_product_name_key" ON "Products"("product_name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
