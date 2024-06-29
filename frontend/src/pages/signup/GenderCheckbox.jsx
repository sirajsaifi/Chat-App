const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Male" ? "selected" : ""
          } `}
        >
          <span className="label-text text-gray-50">Male</span>
          <input
            type="checkbox"
            className="checkbox h-4 w-4 border-slate-900"
            checked={selectedGender === "Male"}
            onChange={() => onCheckboxChange("Male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "Female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-gray-50">Female</span>
          <input
            type="checkbox"
            className="checkbox h-4 w-4 border-slate-900"
            checked={selectedGender === "Female"}
            onChange={() => onCheckboxChange("Female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
