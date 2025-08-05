-- CreateTable
CREATE TABLE "public"."Route" (
    "id" SERIAL NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);
