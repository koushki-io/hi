import "./input.css";

function Input({
  className,
  name,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  checked
}) {
  return (
    <div className="form_div">
      <label htmlFor={id}>{label}</label>
      <input
        className={className}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        checked={checked}
      />
    </div>
  );
}

export default Input;
