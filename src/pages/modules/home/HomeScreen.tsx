import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../../../services/activities/activitiesServices';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import NoDataMessage from '../../../components/common/NoContent/NoDataMessage';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Activity {
  name: string;
  createdAt: string;
  Proyect: {
    id: string;
    name: string;
  };
  Period: {
    year: string;
    semester: string;
  };
}

interface GroupedByProject {
  [projectName: string]: {
    [period: string]: number;
    totalActivities: number;
  };
}

const HomeScreen = () => {
  const { loading, error, data, refetch } = useQuery(GET_ACTIVITIES);

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Intentalo otra vez." onRetry={handleRetryFetch} />;
  }

  const groupedByProject: GroupedByProject = data.listActivities.items.reduce(
    (acc: GroupedByProject, activity: Activity) => {
      const projectName = activity.Proyect?.name;
      const period = activity.Period
        ? `${activity.Period.year}-Semestre ${activity.Period.semester}`
        : null;

      if (!projectName || !period) {
        console.warn('Actividad omitida por falta de datos:', activity);
        return acc;
      }

      if (!acc[projectName]) {
        acc[projectName] = { totalActivities: 0 };
      }
      if (!acc[projectName][period]) {
        acc[projectName][period] = 0;
      }

      acc[projectName][period] += 1;
      acc[projectName].totalActivities += 1;

      return acc;
    },
    {}
  );

  const allPeriods = Object.values(groupedByProject).flatMap((project) =>
    Object.keys(project).filter((key) => key !== 'totalActivities')
  );
  const uniquePeriods = Array.from(new Set(allPeriods));

  const labels = uniquePeriods;

  const datasets = Object.entries(groupedByProject).map(([projectName, periodsData]) => {
    const periodData = uniquePeriods.map((period) => periodsData[period] || 0);

    return {
      label: projectName,
      data: periodData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      barPercentage: 0.5,
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItem: any) => {
            const projectName = tooltipItem[0].dataset.label;
            const periodIndex = tooltipItem[0].dataIndex;
            const period = labels[periodIndex];
            return `${projectName} - ${period}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4" data-testid="home-screen">
      <h2 className="text-2xl text-light-textSecondary font-bold mb-6">Análisis de actividades</h2>
      {data.listActivities.items.length > 0 ? (
        <>
          {Object.entries(groupedByProject).map(([projectName, periodsData]) => (
            <div key={projectName} className="bg-light-base100 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-light-primary">{projectName}</h3>
              <ul className="mt-4">
                {Object.entries(periodsData).map(([period, count]) => {
                  if (period !== 'totalActivities') {
                    return (
                      <li key={period} className="text-lg text-light-primaryContent">
                        {period} - Actividades: {count}
                      </li>
                    );
                  }
                  return null;
                })}
                <li className="font-bold text-lg text-light-accent mt-2">
                  Total de actividades: {periodsData.totalActivities}
                </li>
              </ul>
            </div>
          ))}

          <div
            className="chart-container mx-auto"
            style={{ maxWidth: '1200px', height: '500px', paddingTop: '40px' }}
          >
            <Bar data={chartData} options={options} />
          </div>
        </>
      ) : (
        <NoDataMessage mesagge="No hay Actividades realizadas para mostrar un analisis." />
      )}
    </div>
  );
};

export default HomeScreen;
