import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_PATIENT,
  EXIST_CEDULA,
  LIST_PATIENTS,
} from '../../../services/patience/patienceService';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import PatienceForm from '../../../components/patience/PatienceForm';
import PatienceTable from '../../../components/patience/PatienceTable';

type FormValues = {
  cedula_patient: string;
  name: string;
  last_name: string;
};

const PatienceScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: patientsData, loading: loadingPatients } = useQuery(LIST_PATIENTS);
  const { handleError, errorMessage, handleSuccess, successMessage, clearError, clearSuccess } =
    useErrorHandler();
  const { refetch: refetchCedula } = useQuery(EXIST_CEDULA, {
    skip: true,
  });
  const [createPatient, { loading: isLoading }] = useMutation(CREATE_PATIENT, {
    refetchQueries: [{ query: LIST_PATIENTS }],
  });

  const handleCreatePatience = async (values: FormValues): Promise<void> => {
    try {
      const { data } = await refetchCedula({ cedula_patient: values.cedula_patient });

      if (data?.listPatients?.items?.length > 0) {
        handleSuccess('La cédula ingresada ya está registrada');
        return;
      }
      await createPatient({
        variables: {
          cedula_patient: values.cedula_patient,
          last_name: values.last_name,
          name: values.name,
        },
      });
      clearError();
      clearSuccess();
    } catch (error) {
      handleError({ error });
    }
  };

  const totalPatients = patientsData?.listPatients?.items.length || 0;
  const totalPages = Math.ceil(totalPatients / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems =
    patientsData?.listPatients?.items.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="flex p-8 gap-8">
      <PatienceForm
        onSubmit={handleCreatePatience}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isLoading={isLoading}
      />
      {!loadingPatients && (
        <PatienceTable
          patients={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PatienceScreen;
