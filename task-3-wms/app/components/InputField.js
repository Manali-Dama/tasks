// components/InputField.js
import PropTypes from "prop-types";

const InputField = ({
  label,
  type,
  name,
  value,
  options,
  onChange,
  required,
  placeholder,
}) => {
  if (type === "select") {
    return (
      <div>
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange} required={required}>
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputField;
