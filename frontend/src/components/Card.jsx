const Card = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all">
      <h2 className="text-gray-600 dark:text-gray-400 text-sm">{title}</h2>
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
        {value}
      </p>
    </div>
  );
};

export default Card;
