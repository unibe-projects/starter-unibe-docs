import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_DOCUMENTS_all } from '../../../services/documents/documents';
import DocumentsList from '../../../components/documents/DocumentsList';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import DocumentFilter from '../../../components/documents/DocumentFilterProps';
import { filterDocuments } from '../../../utils/documents/documentFilter';
import NoDataMessage from '../../../components/common/NoContent/NoDataMessage';

const DocumentsScreen = () => {
  const [filters, setFilters] = useState({
    periodYear: '',
    periodSemester: '',
    documentType: '',
    searchTerm: '',
    projectName: '',
  });

  const { loading, error, data, refetch } = useQuery(LIST_DOCUMENTS_all);

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message="Inténtalo otra vez." onRetry={handleRetryFetch} />;
  }

  const activitiesData = data?.listActivities?.items || [];
  const filteredDocuments = filterDocuments(activitiesData, filters);

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <h2 className="text-2xl text-light-textSecondary text-start">Lista de Documentos</h2>
      <DocumentFilter
        filters={filters}
        onFilterChange={(e) => {
          const { name, value } = e.target;
          setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
          }));
        }}
      />

      <div className="pt-4">
        {filteredDocuments.length > 0 ? (
          <DocumentsList documents={filteredDocuments} />
        ) : (
          <NoDataMessage/>
        )}
      </div>
    </div>
  );
};

export default DocumentsScreen;
