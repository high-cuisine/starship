/*
  Warnings:

  - You are about to drop the column `daysActiveBatch` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "daysActiveBatch",
ADD COLUMN     "daysActiveLast" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
