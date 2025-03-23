/*
  Warnings:

  - Changed the type of `passDetails` on the `Pass` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pass" DROP COLUMN "passDetails",
ADD COLUMN     "passDetails" JSONB NOT NULL;
