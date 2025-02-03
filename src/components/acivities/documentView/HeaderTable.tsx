import UnibeLogo from '../../../assets/header/LogoUnibe.png';

const HeaderTable: React.FC<{ page: number; totalPages: number; date: string }> = ({
  page,
  totalPages,
  date,
}) => (
  <div className="border border-gray-500 border-2 overflow-hidden">
    <table className="w-full border-collapse">
      <tbody>
        <tr>
          <td className="w-1/4 p-2 border border-gray-500 align-top">
            <img src={UnibeLogo} alt="UNIB.E Logo" className="max-h-16 max-w-full object-contain" />
          </td>
          <td className="w-2/4 border border-gray-500 text-center">
            <p className="font-bold">BIENESTAR UNIVERSITARIO</p>
            <div className="border-t border-gray-500 mt-2 pt-1">
              <p>INFORME DE ACTIVIDADES REALIZADAS</p>
            </div>
          </td>
          <td className="w-1/4 text-left align-top">
            <div className="pt-1">
              <p>CÓDIGO:</p>
            </div>
            <div className="border border-gray-300 border-l-0 p-1">
              <p>
                PÁGINA: {page} DE {totalPages}
              </p>
            </div>
            <div className="border border-gray-300 border-l-0 p-1">
              <p>VERSIÓN: 001</p>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-2 border border-gray-500">
            FECHA DE ACTUALIZACIÓN: {date}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default HeaderTable;
