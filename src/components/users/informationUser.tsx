import { useAuth } from '../../hooks/auth/useUser';

const InformationUser = () => {
  const { user } = useAuth();
  const role = user?.['custom:role'];
  const name = user?.['custom:name'];
  return (
    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <p className="text-gray-800 text-sm font-medium">
          <span className="font-semibold">Rol:</span> {role}
        </p>
        <p className="text-gray-800 text-sm font-medium">
          <span className="font-semibold">Usuario:</span> {name || 'N/A'}
        </p>
        <p className="text-gray-800 text-sm font-medium">
          <span className="font-semibold">Email:</span> {user?.email || 'N/A'}
        </p>
      </div>
    </div>
  );
};
export default InformationUser;
