import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useHover } from '@uidotdev/usehooks'
import { FaThumbtack } from 'react-icons/fa'
import { LuClipboardCheck, LuClipboardList } from 'react-icons/lu'
import './styles.css'

type ButtonProps = {
  icon: JSX.Element
  onClick?: () => void
  style?: any
}
function Button({ icon, onClick, style }: ButtonProps) {
  return (
    <div
      style={{
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid gray',
        width: '15px',
        height: '15px',
        ...style,
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}

export default function CroquetQRCode() {
  const [isPinned, setIsPinned] = useState(true)
  const [copyIcon, setCopyIcon] = useState(<LuClipboardList />)
  const [ref, hovering] = useHover()

  const BIG_SIZE = 200
  const SMALL_SIZE = 75

  const location = window.location.href
  const isExpanded = isPinned || hovering
  const size = isExpanded ? BIG_SIZE : SMALL_SIZE

  const togglePin = () => setIsPinned((prev) => !prev)

  const handleCopy = () => {
    navigator.clipboard.writeText(location)
    setCopyIcon(<LuClipboardCheck />)
    setTimeout(() => {
      setCopyIcon(<LuClipboardList />)
    }, 1500)
  }

  return (
    <div
      ref={ref}
      className='croquet-qr-container'
      style={{
        padding: isExpanded ? '10px' : '7px',
        maxWidth: `${size}px`,
      }}
    >
      {isExpanded && (
        <div className='top-bar'>
          <Button icon={<FaThumbtack />} onClick={togglePin} style={{ backgroundColor: isPinned ? '#E5E5E5' : 'white' }} />
        </div>
      )}
      <QRCode style={{ margin: 'auto' }} value={location} size={size}></QRCode>
      {isExpanded && (
        <div className='bottom-bar'>
          <div className='url'>{location}</div>
          <Button icon={copyIcon} onClick={handleCopy} />
        </div>
      )}
    </div>
  )
}
