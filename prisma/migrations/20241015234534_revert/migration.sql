/*
  Warnings:

  - You are about to drop the column `createAt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ALTER COLUMN "userID" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "code",
DROP COLUMN "selling_price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product_code" TEXT,
ALTER COLUMN "userID" SET DEFAULT 1,
ALTER COLUMN "updateAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createAt",
DROP COLUMN "updateAt";
