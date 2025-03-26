import AnnualReportForm from '../../../components/acivities/half-yearly-report/AnnualReportForm';
import Instructions from '../../../components/acivities/half-yearly-report/Instructions';

const AnnualReportScreen = () => {
  return (
    <div className="flex items-start justify-center min-h-screen py-8">
      <Instructions />
      <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-12 border border-gray-300">
        <h3 className="text-2xl font-bold text-center text-light-primary">
          Informe de Proyecto Semestral
        </h3>
        <AnnualReportForm />
      </div>
    </div>
  );
};

export default AnnualReportScreen;
