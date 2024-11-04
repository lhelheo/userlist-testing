-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_clientID_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "clientID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
