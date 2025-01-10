import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth/useUser";

// Enum de roles
export enum RoleEnum {
  ADMIN = "Admin",
  PATIENTS = "patients",
}

const CreateUserScreen = () => {
  const { handleCreateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: RoleEnum.ADMIN,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCreateUser(formData);
      alert("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Hubo un error al crear el usuario.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value={RoleEnum.ADMIN}>{RoleEnum.ADMIN}</option>
            <option value={RoleEnum.PATIENTS}>{RoleEnum.PATIENTS}</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUserScreen;
