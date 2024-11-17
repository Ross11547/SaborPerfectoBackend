const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/receta/id", async (req, res) => {
    try {
        const receta = await prisma.receta.findMany({
            where: {
                id: Number(req.params.id)
            },
            include: {
                RecetaProducto: {
                    include: {
                        producto: true
                    }
                }
            }
        });

        res.json({
            data: receta,
            mensaje: "recetas obtenidos correctamente",
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los recetas",
            error: error.mensaje
        });
    }
});