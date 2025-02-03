import useResourcesController from '../../hooks/resource/resourcesController';
import { Documents, Period, Proyect } from '../../interface/activities/activities.interface';
import { getFileTypeIcon } from '../../utils/documents/getFileTypeIcon';

type DocumentCardProps = {
  document: Documents;
  period: Period;
  proyect: Proyect;
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document, period, proyect }) => {
  const { resourceUrl } = useResourcesController(document.path ?? '');
  const fileIcon = getFileTypeIcon(
    Array.isArray(document.tags) ? document.tags : [document.tags],
    resourceUrl,
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg flex items-center gap-3">
      {fileIcon === resourceUrl && resourceUrl ? (
        <img src={fileIcon} alt="document" className="w-12 h-12 object-cover" />
      ) : (
        <span className="text-3xl">{fileIcon}</span>
      )}
      <div>
        <h3 className="font-semibold">Tipo: {document.type}</h3>
        <h3 className="font-semibold">Nombre: {document.name}</h3>
        <p className="text-sm text-gray-500">proyecto: {proyect.name}</p>
        <p className="text-sm text-gray-500">
          periodo: {period.year}-{period.semester}
        </p>
        <p className="text-sm text-gray-500">tags: {document.tags.toString()}</p>
        <p className="text-xs text-gray-400">
          Creado: {new Date(document.createdAt ?? '').toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">
          ultima actualizacion: {new Date(document.updatedAt ?? '').toLocaleString()}
        </p>
        <a href={resourceUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
          Descargar
        </a>
      </div>
    </div>
  );
};

export default DocumentCard;
