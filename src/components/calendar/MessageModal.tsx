import React from 'react';

interface EventModalProps {
  title?: string;
  onClose?: () => void;
  message?: string;
}

const MessageModal: React.FC<EventModalProps> = ({ onClose, message, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default MessageModal;
