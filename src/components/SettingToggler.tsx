interface SettingTogglerProps {
  label: string;
  name: string;
  value: boolean;
  setValue: (value: boolean) => void;
}
export default function SettingToggler({
  label,
  name,
  value,
  setValue,
}: SettingTogglerProps) {
  return (
    <div className="field no-column">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
