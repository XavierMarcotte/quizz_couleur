-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "main" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hue" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);
