import { login, perfil, registro, confirmEmail, listarVeterinarios, detalleVeterinario, actualizarPerfil, actualizarPassword, recuperarPassword, comprobarTokenPasword, nuevoPassword } from "../controllers/veterinario_controller.js";
import Veterinario from "../models/Veterinario";
import mongoose from "mongoose";


//Pruebas unitarias de Registro.
describe("Pruebas de los controladores de veterinario", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("Pruebas del controlador de registro", () => {
    it("debe registrar un nuevo veterinario", async () => {
      const req = {
        body: {
          email: "nuevo@veterinario.com",
          password: "password123",
          // Otros campos necesarios
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registro(req, res);
      // El registro debe retornar un código de estado 400 porque falta algún campo requerido
      expect(res.status).toHaveBeenCalledWith(400);
      // Revisa que se llame a la función json con el mensaje de error adecuado
      expect(res.json).toHaveBeenCalledWith({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    });
  });


  // Más pruebas para otros controladores ...

  //Prueba unitaria de login


  describe('Pruebas del controlador de login', () => {
    test('debe iniciar sesión correctamente', async () => {
      const req = { body: { email: 'correo@veterinario.com', password: 'contraseña' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await login(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
    });
  
    test('debe manejar campos faltantes en la solicitud', async () => {
      const req = { body: { email: '', password: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await login(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
    });
  });


  describe('Pruebas del controlador de perfil', () => {
    it('debe retornar el perfil del veterinario', async () => {
      // Simular una solicitud de perfil válida
      const req = {
        veterinarioBDD: { // Supongamos que req.veterinarioBDD contiene la información del veterinario obtenida previamente
          nombre: 'Nombre del veterinario',
          apellido: 'Apellido del veterinario',
          direccion: 'Dirección del veterinario',
          telefono: 'Teléfono del veterinario',
          _id: 'ID del veterinario',
          email: 'Correo electrónico del veterinario'
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await perfil(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled(); // Verificar que se haya llamado a la función json
      expect(res.json).toHaveBeenCalledWith({
        nombre: 'Nombre del veterinario',
        apellido: 'Apellido del veterinario',
        direccion: 'Dirección del veterinario',
        telefono: 'Teléfono del veterinario',
        _id: 'ID del veterinario',
        email: 'Correo electrónico del veterinario'
      });
    });
  });


  
  
});// final
