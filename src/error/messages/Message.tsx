interface MessageProps {
  text: string | null;
  type: 'success' | 'error';
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  return (
    <div
      className={`p-4 mb-6 rounded-lg ${type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
    >
      {text}
    </div>
  );
};

export default Message;
