import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findMany({});

    res.json({
      data: usuario,
      mensaje: "usuarios obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer los usuarios",
      error: error.mensaje,
    });
  }
});

app.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      data: usuario,
      mensaje: "usuario obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer el usuario",
      error: error.mensaje,
    });
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const { nombre, correo, password, confirmaPasswrod } = req.body;
    if (nombre === "" || password === "" || confirmaPasswrod === "") {
      res.json({
        mensaje: "Este campo es obligatorio.",
      });
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !correoValido.test(correo)) {
      res.json({
        mensaje: "El correo es obligatorio y debe tener un formato válido.",
      });
      return;
    }

    if (password !== confirmaPasswrod) {
      res.json({
        mensaje: "Las contraseñas no coinciden.",
      });
      return;
    }

    const usuarioExis = await prisma.usuario.findUnique({
      where: {
        correo: correo,
      },
    });

    if (usuarioExis) {
      res.json({
        mensaje: "El correo que ingreso ya fue registrado.",
      });
      return;
    }
    const usuarioCreado = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password,
        confirmaPasswrod,
      },
    });
    res.json({
      mensaje: "Usuario agregado correctamente",
      data: usuarioCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar usuario",
      error: error.mensaje,
    });
  }
});

app.put("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json({
      data: usuario,
      mensaje: "usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario",
      error: error.mensaje,
    });
  }
});

app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      data: usuario,
      mensaje: "usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar usuario",
      error: error.mensaje,
    });
  }
});

app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const login = await prisma.usuario.findFirst({
    where: {
      correo: correo,
      password: password,
    },
  });
  if (!login) {
    res.json({
      message: "Usuario no autorizado",
      error: "Usuario no autorizado",
    });
    return;
  }
  login.password = undefined;
  res.json({
    message: "Inicio de sesion correcto",
    data: login,
  });
});

export default app;
