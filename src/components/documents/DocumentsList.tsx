import { useState } from 'react';
import DocumentCard from './DocumentCard';
import Pagination from './Pagination';
import { Documents, Period, Proyect } from '../../interface/activities/activities.interface';
import DocumentFilter from './DocumentFilterProps';

export interface DocumentDetails {
  documents: Documents;
}

type DocumentsListProps = {
  documents: DocumentDetails[];
  period: Period;
  proyect: Proyect;
};

const DocumentsList: React.FC<DocumentsListProps> = ({ documents, period, proyect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    periodYear: period.year,
    periodSemester: period.semester,
    projectName: '',
    documentType: '',
    searchTerm: '',
  });

  const itemsPerPage = 10;
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };
  const filteredDocuments = documents.filter((doc) => {
    const { periodYear, periodSemester, projectName, documentType, searchTerm } = filters;

    const matchesPeriod = period.year === periodYear && period.semester === periodSemester;
    const matchesProject = projectName ? proyect.name === projectName : true;
    const matchesType = documentType ? doc.documents.type === documentType : true;
    const matchesSearchTerm =
      doc.documents.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documents.tags.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPeriod && matchesProject && matchesType && matchesSearchTerm;
  });
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <DocumentFilter filters={filters} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedDocuments.length > 0 ? (
          paginatedDocuments.map((doc) => (
            <DocumentCard
              key={doc.documents.path}
              document={doc.documents}
              period={period}
              proyect={proyect}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No hay documentos disponibles.</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DocumentsList;
