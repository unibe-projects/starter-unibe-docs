import { ActivityDocuments } from '../../interface/documents/activitiesDocument.interface';
import DocumentCard from './DocumentCard';

type DocumentsListProps = {
  documents: ActivityDocuments[];
};

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {documents.map((doc, index) =>
        doc.Documents.items.map((documentItem: any, docIndex: number) => (
          <DocumentCard
            key={`${documentItem.path}-${docIndex}`}
            document={documentItem}
            period={doc.Period}
            proyect={doc.Proyect}
          />
        ))
      )}
    </div>
  );
};

export default DocumentsList;
