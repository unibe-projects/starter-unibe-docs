import React, { useState } from 'react';
import { Activities, Documents } from '../../../interface/activities/activities.interface';
import DocumentPreview from './DocumentPreview';
import HeaderTable from './HeaderTable';
import Pagination from './Pagination';
import TaskItem from './TaskItem';
import GeneralData from './GeneralData';
import GeneralObjective from './GeneralItems';
import GeneralItems from './GeneralItems';

interface PreviewSectionProps {
  previewData: Activities;
  iscreate: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ previewData, iscreate }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(previewData.documents.length / itemsPerPage);


  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="w-full p-8 bg-white shadow-lg border-t-4 overflow-hidden">
      <HeaderTable page={page} totalPages={totalPages} date={previewData.activity_date} />
      <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-1xl font-bold text-black">{previewData.name}</h1>
          <h1 className="text-1xl font-bold text-black">BIENESTAR UNIVERSITARIO</h1>
        </div>

      <div className="space-y-6 mt-4">
        <GeneralData previewData={previewData} />
        <GeneralItems name={previewData.general_objective} title='2. Objetivo General' />
        
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">3. Actividades Realizadas</h3>
          <div className="space-y-4">
            {previewData.tasks?.map((task, index) => (
              <TaskItem key={index} name={task.name} description={task.description} />
            ))}
          </div>
        </div>

        <GeneralItems name={previewData.number_participants} title='4.	Número de Participantes' />

        <GeneralItems name={previewData.budget_used} title='5.	Presupuesto utilizado' />
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">6. Anexos</h3>
          <DocumentPreview documents={previewData.documents} isCreate={iscreate} />
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onPrev={handlePrevPage} onNext={handleNextPage} />
    </div>
  );
};

export default PreviewSection;