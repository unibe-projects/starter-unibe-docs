type Patient = {
  cedula_patient: string;
  name: string;
  last_name: string;
};

type Props = {
  patients: Patient[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PatienceTable = ({ patients, currentPage, totalPages, onPageChange }: Props) => {
  return (
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-4">Lista de Pacientes</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Cédula</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Apellido</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{patient.cedula_patient}</td>
              <td className="px-4 py-2 border-b">{patient.name}</td>
              <td className="px-4 py-2 border-b">{patient.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatienceTable;
