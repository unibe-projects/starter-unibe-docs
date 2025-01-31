import { useState } from 'react';
import DocumentCard from './DocumentCard';
import Pagination from './Pagination';
import { Documents, Period, Proyect } from '../../interface/activities/activities.interface';

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
  const itemsPerPage = 10;
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const paginatedDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedDocuments.map((doc) => (
          <DocumentCard
            key={doc.documents.path}
            document={doc.documents}
            period={period}
            proyect={proyect}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default DocumentsList;
