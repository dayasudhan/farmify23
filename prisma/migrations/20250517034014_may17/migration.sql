/*
  Warnings:

  - The values [POSTHOLEDIGGER] on the enum `TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TYPE_new" AS ENUM ('ENGINE', 'TRAILER', 'CULTIVATOR', 'ROTAVATOR', 'PLOUGH', 'HARROW', 'SEEDER', 'SPRAYER', 'LEVELLER', 'DIGGER', 'FULL_SET', 'OTHER');
ALTER TABLE "item" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "item" ALTER COLUMN "type" TYPE "TYPE_new" USING ("type"::text::"TYPE_new");
ALTER TYPE "TYPE" RENAME TO "TYPE_old";
ALTER TYPE "TYPE_new" RENAME TO "TYPE";
DROP TYPE "TYPE_old";
ALTER TABLE "item" ALTER COLUMN "type" SET DEFAULT 'OTHER';
COMMIT;
