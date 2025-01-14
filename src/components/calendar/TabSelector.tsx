import React from 'react';

interface TabSelectorProps {
  activeTab: 'calendar' | 'settings';
  onChangeTab: (tab: 'calendar' | 'settings') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => onChangeTab('calendar')}
        className={`mr-4 p-2 ${activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        Calendario
      </button>
      <button
        onClick={() => onChangeTab('settings')}
        className={`p-2 ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        Configuración de Días
      </button>
    </div>
  );
};

export default TabSelector;
