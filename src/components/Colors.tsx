

export default function Colors({ selectedColor, set_selectedColor }) {

  const colors = [ '#DB3F27', '#F1BD47', '#003F75', '#060700', '#CBD2DA', '#E7E3DD' ]
  const size = 3

  function Color({ color }) {
    return (
      <div
        className='color'
        style={{ 
          backgroundColor: color,
          border: color === selectedColor ? '2px solid black' : '2px solid white',
          width: `${size}rem`,
          height: `${size}rem`
        }}
        onClick={() => set_selectedColor(color)}
      />
    )
  }

  return (
    <div className='colors'>
      {colors.map((color) => <Color key={color} color={color} />)}
    </div>
  )
}