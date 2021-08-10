interface InputLabelProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: Function;
}

const InputLabel = ({
  type,
  name,
  label,
  value,
  onChange,
}: InputLabelProps) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full shadow-md border-transparent h-[50px] px-3 mt-1 rounded-lg focus:ring-2 focus:ring-main focus:outline-none"
      />
    </div>
  );
};

export default InputLabel;
