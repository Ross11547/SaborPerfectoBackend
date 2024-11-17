-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmaPasswrod" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receta" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tiempo" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "favoritos" BOOLEAN NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tiempo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioReceta" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "IdReceta" INTEGER NOT NULL,

    CONSTRAINT "UsuarioReceta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecetaProducto" (
    "id" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "IdReceta" INTEGER NOT NULL,

    CONSTRAINT "RecetaProducto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "UsuarioReceta" ADD CONSTRAINT "UsuarioReceta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioReceta" ADD CONSTRAINT "UsuarioReceta_IdReceta_fkey" FOREIGN KEY ("IdReceta") REFERENCES "Receta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecetaProducto" ADD CONSTRAINT "RecetaProducto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecetaProducto" ADD CONSTRAINT "RecetaProducto_IdReceta_fkey" FOREIGN KEY ("IdReceta") REFERENCES "Receta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
