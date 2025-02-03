const Pagination: React.FC<{
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      onClick={onPrev}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
      disabled={page === 1}
    >
      Anterior
    </button>
    <button
      onClick={onNext}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
      disabled={page >= totalPages}
    >
      Siguiente
    </button>
  </div>
);

export default Pagination;
