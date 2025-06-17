const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function MonthNavigator({ date, onChange }) {
  const handlePrevious = () => {
    const prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    onChange(prev);
  };

  const handleNext = () => {
    const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    onChange(next);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(date.getFullYear(), newMonth, 1);
    onChange(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(newYear, date.getMonth(), 1);
    onChange(newDate);
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Previous
        </button>
        <select
          value={date.getMonth()}
          onChange={handleMonthChange}
          className="border rounded p-1"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
        <input
          type="number"
          value={date.getFullYear()}
          onChange={handleYearChange}
          className="border rounded p-1 w-24"
        />
        <button
          onClick={handleNext}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>

      <div className="text-lg font-bold">
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
      </div>
    </div>
  );
}

export default MonthNavigator;
