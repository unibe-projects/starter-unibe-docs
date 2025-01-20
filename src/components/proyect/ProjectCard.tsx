import React from 'react';
import { Proyect } from '../../pages/modules/proyect/ProyectScreen';

interface ProjectCardProps {
  project: Proyect;
  onClick: (id: string, name: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onEdit, onDelete }) => {
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(project.id, project.name);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(project.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(project.id);
  };

  return (
    <div
      className="relative group rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onClick(project.id, project.name)}
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-64 object-cover"
        onClick={handleImageClick}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-white text-xl font-semibold">{project.name}</h3>
      </div>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          onClick={handleEditClick}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={handleDeleteClick}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
