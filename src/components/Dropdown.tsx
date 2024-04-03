export default function Dropdown({ options, onChange }) {
  return (
    <select onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
