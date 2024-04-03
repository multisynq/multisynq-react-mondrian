type Option<T> = {
  value: T
  label: string
}
type DropdownProps<T> = {
  selected: any
  options: Option<T>[]
  onChange: (number) => void
}
export default function Dropdown<T>({ selected, options, onChange }: DropdownProps<T>) {
  return (
    <select {...{
      value: selected,
      onChange: (e) => onChange(e.target.selectedIndex),
      style: {
        border: '0.1rem solid black',
        borderRadius: '0.5rem',
        padding: '0.2rem',
      }
    }}>
      {options.map((option, i) => (
        <option key={i} value={i}>{option.label}</option>
      ))}
    </select>
  )
}