-- AlterTable
ALTER TABLE "products" ADD COLUMN     "cost_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Disponivel',
ADD COLUMN     "supplier" TEXT NOT NULL DEFAULT 'Não informado';
