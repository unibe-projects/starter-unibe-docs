import { Documents } from "../../../interface/activities/activities.interface";

const DocumentPreview: React.FC<{ documents: Documents[] }> = ({ documents }) => {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  
    return (
      <div className="grid grid-cols-2 gap-4">
        {documents
          .filter(doc => imageExtensions.includes(doc.file.name.split('.').pop()?.toLowerCase() ?? ''))
          .map((doc, index) => (
            <div key={index} className="rounded-lg p-4 flex flex-col items-center">
              <p className="text-gray-700 font-semibold text-center">{doc.name}</p>
              {doc.file && (
                <img
                  src={URL.createObjectURL(doc.file)}
                  alt={doc.name}
                  className="w-40 h-40 object-cover rounded-md"
                />
              )}
            </div>
          ))}
      </div>
    );
  };

  export default DocumentPreview;
  