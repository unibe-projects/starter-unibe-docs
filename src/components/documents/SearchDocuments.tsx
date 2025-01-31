// SearchDocuments.tsx
import React, { useState } from "react";

interface SearchDocumentsProps {
  projects: string[];  // Lista de proyectos disponibles
  periods: string[];    // Lista de periodos disponibles
  years: number[];      // Lista de años disponibles
  onSearch: (filters: {
    project: string;
    period: string;
    year: number | string;
  }) => void;
}

const SearchDocuments: React.FC<SearchDocumentsProps> = ({
  projects,
  periods,
  years,
  onSearch,
}) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | string>("");

  const handleSearch = () => {
    onSearch({
      project: selectedProject,
      period: selectedPeriod,
      year: selectedYear,
    });
  };

  return (
    <div className="mb-4">
      <div className="flex gap-4">
        {/* Select Project */}
        <div>
          <label htmlFor="project" className="block mb-2">
            Proyecto
          </label>
          <select
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos los proyectos</option>
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        {/* Select Period */}
        <div>
          <label htmlFor="period" className="block mb-2">
            Período
          </label>
          <select
            id="period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos los períodos</option>
            {periods.map((period, index) => (
              <option key={index} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {/* Select Year */}
        <div>
          <label htmlFor="year" className="block mb-2">
            Año
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos los años</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded p-2"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDocuments;
