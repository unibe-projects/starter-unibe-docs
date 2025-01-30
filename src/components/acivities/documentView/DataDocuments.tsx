import useResourcesController from '../../../hooks/resource/resourcesController';

const DataDocuments: React.FC<{ name: string; path: string }> = ({ name, path }) => {
  const { resourceUrl } = useResourcesController(path);

  return (
    <>
      {name === 'Fotos' ? (
        <div>
          <img src={resourceUrl} alt={name} className="w-40 h-40 object-cover rounded-md" />
          <a href={resourceUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            Descargar {name}
          </a>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-gray-600">
            Este archivo no es una imagen o está en formato no soportado.
          </p>
          {/* Link para ver o descargar el archivo */}
          <a href={resourceUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            Descargar {name}
          </a>
        </div>
      )}
    </>
  );
};

export default DataDocuments;
