-- CreateTable
CREATE TABLE "Desenvolvedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "datanascimento" DATE NOT NULL,
    "hobby" TEXT NOT NULL,
    "nivelId" INTEGER NOT NULL,

    CONSTRAINT "Desenvolvedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nivel" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Desenvolvedor" ADD CONSTRAINT "Desenvolvedor_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
