import useResourcesController from '../../hooks/resource/resourcesController';
import { Period, Proyect } from '../../interface/activities/activities.interface';
import { DocumentsItems } from '../../interface/documents/activitiesDocument.interface';
import { getFileTypeIcon } from '../../utils/documents/getFileTypeIcon';

type DocumentCardProps = {
  document: DocumentsItems;
  period: Period;
  proyect: Proyect;
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document, period, proyect }) => {

  const { resourceUrl } = useResourcesController(document.documents.path ?? '');
  const fileIcon = getFileTypeIcon(
    Array.isArray(document.documents.tags) ? document.documents.tags : [document.documents.tags],
    resourceUrl,
  );

  return (
    <div className="bg-light-base100 shadow-md p-4 rounded-lg flex items-center gap-3">
      {fileIcon === resourceUrl && resourceUrl ? (
        <img src={fileIcon} alt="document" className="w-12 h-12 object-cover" />
      ) : (
        <span className="text-3xl">{fileIcon}</span>
      )}
      <div>
        <h3 className="font-semibold text-light-primary">Proyecto: {proyect.name}</h3>
        <p className="text-light-primary">
          periodo: {period.year}-{period.semester}
        </p>
        <h3 className="text-gray-600">Nombre del archivo: {document.documents.name}</h3>
        <p className="text-sm text-gray-500">Tipo: {document.documents.type}</p>
        <p className="text-sm text-gray-500">tags: {document.documents.tags.toString()}</p>
        <p className="text-xs text-gray-400">
          Creado: {new Date(document.documents.createdAt ?? '').toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">
          ultima actualizacion: {new Date(document.documents.updatedAt ?? '').toLocaleString()}
        </p>
        <a href={resourceUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
          Descargar
        </a>
      </div>
    </div>
  );
};

export default DocumentCard;
