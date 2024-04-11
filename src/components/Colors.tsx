import { IoIosRefresh } from 'react-icons/io'
import { colors } from '../data/paintingCells'

export default function Colors({ selectedColor, set_selectedColor, resetPainting }) {
  const size = 9

  function Color({ color }) {
    return (
      <div
        className='color'
        style={{
          backgroundColor: color,
          border: color === selectedColor ? '2px solid black' : '2px solid white',
          width: `${size}vw`,
          height: `${size}vw`
        }}
        onClick={() => set_selectedColor(color)}
      />
    )
  }

  return (
    <div className='colors'>

      <div {...{
        className: 'color d-flex align-items-center justify-content-center',
        style: { width: `${size}vw`, height: `${size}vw` },
        onClick: (e) => resetPainting()
      }}>
        <IoIosRefresh />
      </div>

      {colors.map((color) => (
        <Color key={color} color={color} />
      ))}
    </div>
  )
}
