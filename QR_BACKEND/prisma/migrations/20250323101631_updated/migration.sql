/*
  Warnings:

  - You are about to drop the column `passDetails` on the `Pass` table. All the data in the column will be lost.
  - You are about to drop the column `qrCode` on the `Pass` table. All the data in the column will be lost.
  - Added the required column `qrCodeUrl` to the `Pass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_userId_fkey";

-- AlterTable
ALTER TABLE "Pass" DROP COLUMN "passDetails",
DROP COLUMN "qrCode",
ADD COLUMN     "passUrl" TEXT,
ADD COLUMN     "qrCodeUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
