/*
  Warnings:

  - Added the required column `scores` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "scores" INTEGER NOT NULL;
