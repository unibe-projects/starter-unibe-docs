import { useQuery } from '@apollo/client';
import { LIST_DOCUMENTS_all } from '../../../services/documents/documents';
import DocumentsList from '../../../components/documents/DocumentsList';

const DocumentsScreen = () => {
  const { loading, error, data } = useQuery(LIST_DOCUMENTS_all);
  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const items = data?.listActivities?.items || [];

  const item = items[0] || {};
  const period = item.Period;
  const proyect = item.Proyect;
  const documents = item.Documents?.items || [];

  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Documentos</h2>
      <DocumentsList documents={documents} period={period} proyect={proyect} />
    </div>
  );
};

export default DocumentsScreen;
