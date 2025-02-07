import { Documents } from '../../../interface/activities/activities.interface';
import DataDocuments from './DataDocuments';

const DocumentPreview: React.FC<{ documents: Documents[]; isCreate: boolean }> = ({
  documents,
  isCreate,
}) => {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  return (
    <div className="grid grid-cols-2 gap-4">
      {isCreate ? (
        <div>
          {documents
            .filter((doc) =>
              imageExtensions.includes(doc.file.name.split('.').pop()?.toLowerCase() ?? ''),
            )
            .map((doc, index) => (
              <div key={index} className="rounded-lg p-4 flex flex-col items-center">
                <p className="text-gray-700 font-semibold text-center">{doc.type}</p>
                {doc.file && (
                  <img
                    src={URL.createObjectURL(doc.file)}
                    alt={doc.type}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                )}
              </div>
            ))}
        </div>
      ) : (
        <div>
          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc, index) => {
                return (
                  <div
                    key={index}
                    className="border border-gray-400 rounded-lg p-4 shadow-md overflow-hidden"
                  >
                    <p className="text-gray-700 font-semibold">{doc.type}</p>

                    <DataDocuments name={doc.type ?? ''} path={doc.path ?? ''} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
