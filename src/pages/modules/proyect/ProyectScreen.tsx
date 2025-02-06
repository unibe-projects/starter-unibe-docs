import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  LIST_PROJECTS,
  CREATE_PROYECT,
  DELETE_PROYECT,
  UPDATE_PROYECT,
} from '../../../services/proyect/ProyectService';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import ProjectCard from '../../../components/proyect/ProjectCard';
import CreateProjectModal from '../../../components/proyect/CreateProyectModal';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import Message from '../../../error/messages/Message';
import NoDataMessage from '../../../components/common/NoContent/NoDataMessage';

export interface Proyect {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  path: string;
}

const ProyectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error: errorListProyect, refetch } = useQuery(LIST_PROJECTS);
  const [createProyect] = useMutation(CREATE_PROYECT);
  const [updateProyect] = useMutation(UPDATE_PROYECT);
  const [deleteProyect] = useMutation(DELETE_PROYECT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Proyect | null>(null);
  const { handleError, errorMessage, clearError } = useErrorHandler();

  const handleNavigate = (periodProyectId: string, nameProyect: string) => {
    navigate('/proyecto/periodo', {
      state: { periodProyectId, nameProyect },
    });
  };

  const handleRetryFetch = () => {
    refetch();
  };

  const handleCreateProyect = async (name: string, description: string, path: string) => {
    try {
      await createProyect({ variables: { name, description, path } });
      refetch();
      clearError();
    } catch (error) {
      handleError({ error });
    }
  };

  const handleUpdateProyect = async (id: string, name: string, description: string, path: string) => {
    try {
      await updateProyect({ variables: { id, name, description, path } });
      refetch();
      clearError();
    } catch (error) {
      handleError({ error });
    }
  };

  const handleEditProyect = (project: Proyect) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProyect = async (id: string) => {
    try {
      await deleteProyect({ variables: { id } });
      refetch();
    } catch (error) {
      handleError({ error });
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorListProyect) {
    return <ErrorMessage message="Intentalo otra vez." onRetry={handleRetryFetch} />;
  }

  const projects = data?.listProyects.items || [];

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-light-textSecondary font-bold">Proyectos</h1>
        <button
          className="bg-light-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Proyecto
        </button>
      </div>
      {errorMessage && <Message text={errorMessage} type="error" />}
      <div className="flex flex-col gap-6">
        {projects.length > 0 ? (
          projects.map((project: Proyect) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleNavigate}
              onDelete={handleDeleteProyect}
              onEdit={() => handleEditProyect(project)}
            />
          ))
        ) : (
          <NoDataMessage/>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleCreateProyect}
        onEdit={handleUpdateProyect}
        selectedProject={selectedProject}
      />
    </div>
  );
};

export default ProyectScreen;
