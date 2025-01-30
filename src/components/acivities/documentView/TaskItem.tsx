const TaskItem: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <div className="border border-gray-400 rounded-lg p-4 shadow-md overflow-hidden">
      <p className="text-lg font-semibold">
        <span className="font-bold">Nombre:</span> {name}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">Descripción:</span> {description}
      </p>
    </div>
  );

export default TaskItem;