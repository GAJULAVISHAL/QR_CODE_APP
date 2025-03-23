/*
  Warnings:

  - The primary key for the `Pass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `passUrl` on the `Pass` table. All the data in the column will be lost.
  - The `id` column on the `Pass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingDate` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personName` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Pass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_userId_fkey";

-- AlterTable
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_pkey",
DROP COLUMN "passUrl",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "personName" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pass_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";
