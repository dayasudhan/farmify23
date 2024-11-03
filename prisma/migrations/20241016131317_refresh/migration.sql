-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('ENGINE', 'TRAILER', 'CULTIVATOR', 'ROTAVATOR', 'PLOUGH', 'HARROW', 'SEEDER', 'SPRAYER', 'LEVELLER', 'POSTHOLEDIGGER', 'OTHER');

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_urls" TEXT[],
    "price" INTEGER,
    "availability" BOOLEAN,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "seller_name" TEXT,
    "address" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" INTEGER,
    "phone" TEXT,
    "makeYear" TEXT,
    "registrationYear" TEXT,
    "hoursDriven" INTEGER,
    "no_of_owners" INTEGER,
    "vehicleNo" INTEGER,
    "dealerId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "model" TEXT,
    "make" TEXT,
    "hypothecation_status" TEXT,
    "loan_status" TEXT,
    "insurance_status" BOOLEAN,
    "rc_present" BOOLEAN,
    "fitnessCertificate" BOOLEAN,
    "fc_approximate_cost" INTEGER,
    "tailor_attached" BOOLEAN,
    "condition" TEXT,
    "battery_condition" TEXT,
    "tyre_condition" TEXT,
    "rto" TEXT,
    "loan_availability" BOOLEAN,
    "implements" TEXT,
    "type" "TYPE" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enquiry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" INTEGER,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" INTEGER,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dealer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgpassword" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "deviceToken" TEXT DEFAULT '',
    "allowPhoneNumberToCall" BOOLEAN NOT NULL DEFAULT true,
    "allowWhatsAppMessages" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "dealer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_itemId_key" ON "order"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "dealer_username_key" ON "dealer"("username");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enquiry" ADD CONSTRAINT "enquiry_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
