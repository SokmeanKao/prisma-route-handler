/*
  Warnings:

  - You are about to alter the column `category_name` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "category_name" SET DATA TYPE VARCHAR(50);
