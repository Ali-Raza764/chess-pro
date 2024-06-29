const EvalBar = ({ evaluation }) => {
  if (evaluation === null) return null;
  const percentage = Math.min(Math.max((evaluation + 10) * 5, 0), 100);

  return (
    <div className="w-8 h-[500px] bg-gray-600 relative">
      <div
        className="absolute bottom-0 w-full bg-white"
        style={{ height: `${percentage}%` }}
      />
      <div className="absolute w-full h-0.5 bg-black top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default EvalBar;
