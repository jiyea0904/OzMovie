const InputField = ({ label, type, name, value, onChange, error }) => {
    return (
      <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
        {error && <p className="error-msg">{error}</p>}
      </div>
    );
  };
  
  export default InputField;
  