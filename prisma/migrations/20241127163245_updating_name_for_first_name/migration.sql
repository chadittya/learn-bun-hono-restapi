/*
  Warnings:

  - You are about to drop the column `firstname` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `firstname`,
    ADD COLUMN `firstName` VARCHAR(100) NOT NULL;
