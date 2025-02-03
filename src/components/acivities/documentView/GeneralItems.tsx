interface GeneralItemsProps {
  title: string;
  name: string;
}

const GeneralItems: React.FC<GeneralItemsProps> = ({ name, title }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="p-4">
      <p>{name}</p>
    </div>
  </div>
);

export default GeneralItems;
