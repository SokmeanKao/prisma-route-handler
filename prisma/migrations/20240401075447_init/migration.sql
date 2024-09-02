-- CreateTable
CREATE TABLE "customers" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "money_spent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);
