import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_DOCUMENTS_all } from '../../../services/documents/documents';
import DocumentsList from '../../../components/documents/DocumentsList';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import DocumentFilter from '../../../components/documents/DocumentFilterProps';

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

  const filteredDocuments = activitiesData
  .map((activity: any) => {
    const { Proyect, Period, Documents } = activity;
    const filteredDocs = Documents.items.filter((doc: any) => {
      const docType = doc.documents.type.toLowerCase();
      const docName = doc.documents.name.toLowerCase();
      const docTags = Array.isArray(doc.documents.tags)
        ? doc.documents.tags.join(', ').toLowerCase()
        : doc.documents.tags.toLowerCase();

      return (
        (!filters.documentType || docType.includes(filters.documentType.toLowerCase())) &&
        (!filters.searchTerm || docName.includes(filters.searchTerm.toLowerCase()) || docTags.includes(filters.searchTerm.toLowerCase()))
      );
    });
    const isMatchingProject = !filters.projectName || Proyect.name.toLowerCase().includes(filters.projectName.toLowerCase());
    const isMatchingYear = !filters.periodYear || Period.year.toString() === filters.periodYear;
    const isMatchingSemester = !filters.periodSemester || Period.semester.toString() === filters.periodSemester;
    return filteredDocs.length > 0 && isMatchingProject && isMatchingYear && isMatchingSemester
      ? { ...activity, Documents: { ...Documents, items: filteredDocs } }
      : null;
  })
  .filter(Boolean);

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <h2 className="text-2xl text-light-textSecondary text-start">Lista de Documentos</h2>
      <DocumentFilter filters={filters} onFilterChange={(e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      }} />

      <div className="pt-4">
        {filteredDocuments.length > 0 ? (
          <DocumentsList documents={filteredDocuments} />
        ) : (
          <div>No se encontraron documentos.</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsScreen;
