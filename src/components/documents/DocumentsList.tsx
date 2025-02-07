import React, { useState } from 'react';
import { ActivityDocuments } from '../../interface/documents/activitiesDocument.interface';
import DocumentCard from './DocumentCard';
import Pagination from './Pagination';

type DocumentsListProps = {
  documents: ActivityDocuments[];
};

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 9;
  const allDocuments = documents.flatMap((doc) =>
    doc.Documents.items.map((documentItem: any) => ({
      ...documentItem,
      period: doc.Period,
      proyect: doc.Proyect,
    }))
  );
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = allDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentDocuments.map((documentItem, docIndex) => (
          <DocumentCard
            key={`${documentItem.path}-${docIndex}`}
            document={documentItem}
            period={documentItem.period}
            proyect={documentItem.proyect}
          />
        ))}
      </div>
      <Pagination
        documentsPerPage={documentsPerPage}
        totalDocuments={allDocuments.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DocumentsList;
