import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useHover } from '@uidotdev/usehooks'
import { BsPin, BsPinFill } from 'react-icons/bs'
import { LuClipboardCheck, LuClipboardList } from 'react-icons/lu'
import './styles.css'

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
  const handleQRClick = () => window.open(location, '_blank')

  const handleCopy = () => {
    navigator.clipboard.writeText(location)
    setCopyIcon(<LuClipboardCheck />)
    setTimeout(() => setCopyIcon(<LuClipboardList />), 1500)
  }

  return (
    <div
      ref={ref}
      className='croquet-qr-container'
      style={{
        padding: isExpanded ? '' : '7px',
        maxWidth: `${size}px`,
      }}
    >
      {isExpanded && (
        <div className='top-bar' onClick={togglePin}>
          {isPinned ? <BsPinFill /> : <BsPin />}
        </div>
      )}

      <div className='qr' onClick={handleQRClick} style={{ padding: isExpanded ? '0.5rem 0.8rem' : '' }}>
        <QRCode value={location} />
      </div>

      {isExpanded && (
        <div className='bottom-bar'>
          <div className='url'>{location}</div>

          <div className='button' onClick={handleCopy}>
            {copyIcon}
          </div>
        </div>
      )}
    </div>
  )
}
