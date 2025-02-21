/*
  Warnings:

  - Added the required column `bbc` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `bbc` INTEGER NOT NULL;
