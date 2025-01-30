import { Activities } from "../../../interface/activities/activities.interface";

const GeneralData: React.FC<{ previewData: Activities }> = ({ previewData }) => (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">1. Datos Generales</h3>
      <div className="border border-gray-400 rounded-lg p-4 shadow-md">
        <p><strong>Nombre del Proyecto:</strong> {previewData.project_name}</p>
        <p><strong>Institución Ejecutora:</strong> {previewData.executing_institution}</p>
        <p><strong>Responsable del Proyecto:</strong> {previewData.project_manager}</p>
        <p><strong>Cargo:</strong> {previewData.charge}</p>
        <p><strong>Unidad:</strong> {previewData.unit}</p>
        <p><strong>Período del informe:</strong> {previewData.report_period}</p>
      </div>
    </div>
  );


  export default GeneralData;