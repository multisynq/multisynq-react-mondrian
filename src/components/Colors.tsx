
import { IoIosRefresh } from 'react-icons/io'

export default function Colors({ selectedColor, set_selectedColor, resetPainting }) {

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

  function Button({onClick, icon}: {onClick: () => void, icon: JSX.Element}){
    return (
      <div 
        className='color d-flex align-items-center justify-content-center' 
        style={{ width: `${size}rem`, height:`${size}rem`}}
        onClick={onClick}
      >
        {icon}
      </div>
    )
  }

  return (
    <div className='colors'>
      <Button {...{
        onClick: resetPainting,
        icon: <IoIosRefresh size={`${size/1.5}rem`} />
      }} />
      {colors.map((color) => <Color key={color} color={color} />)}
    </div>
  )
}