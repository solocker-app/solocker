type InputToggleProps = {
  value?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (event: React.ChangeEvent) => void;
} & React.PropsWithChildren;

export default function Toggle({
  children,
  value,
  setValue,
  onChange,
}: InputToggleProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onChange={(event) => {
          const value = event.target.checked;
          if (setValue) setValue(value);
          if (onChange) onChange(event);
        }}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
      {children}
    </label>
  );
}
