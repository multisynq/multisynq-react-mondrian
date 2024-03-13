

export default function Painting({ paintingCells, onClick }: { paintingCells: any, onClick: (cellId: number) => void }) {
  
  const gapSize = 0.25
  const size = `calc(100vw - (${gapSize}rem * 2))`

  function Cell({ id, h, w, className = '' }: { id: number, h?: number, w?: number, className?: string }) {
    return (
      <div {...{
        id: `cell-${id}`,
        className: `cell ${className}`,
        onClick: () => onClick(id),
        style: {
          width: w ? `${w}%` : '100%',
          height: h ? `${h}%` : '100%',
          outline: `${gapSize}rem solid black`,
          backgroundColor: paintingCells[id].color,
        }
      }} />
    )
  }

  return (
    <div className='painting' style={{ width: size, height: size }}>
      <Row w={100} h={100}>
        <Col w={90}>
          <Row h={10}>
            <Cell id={0} w={30} />
            <Cell id={1} w={40} />
            <Cell id={2} w={30} />
          </Row>
          <Row h={90}>
            <Col w={10}>
              <Cell id={3} h={25}/>
              <Cell id={4} h={45}/>
              <Cell id={5} h={30}/>
            </Col>
            <Col w={90}>
              <Row h={60}>
                <Cell id={6} h={100} w={41.5}/>
                <Col>
                  <Cell id={7} h={50}/>
                  <Row h={50}>
                    <Cell id={8} />
                    <Cell id={9} />
                  </Row>
                </Col>
              </Row>
              <Row h={40}>
                <Col w={30}>
                  <Cell id={10} h={70}/>
                  <Cell id={11} h={30}/>
                </Col>
                <Col w={70}>
                  <Row h={90}>
                    <Col w={52.5}>
                      <Cell id={12} h={40}/>
                      <Cell id={13} h={40}/>
                      <Cell id={14} h={20}/>
                    </Col>
                    <Col w={47.5}>
                      <Cell id={15} h={40}/>
                      <Cell id={16} h={60}/>
                    </Col>
                  </Row>
                  <Cell id={17} h={10} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col w={10}>
          <Cell id={18} />
          <Cell id={19} h={30} />
        </Col>
      </Row>
    </div>
  )
}

function Row({ children, w, h }: { children: any, w?: number, h?: number }) {
  return (
    <div className='row h-100 w-100' style={{ width: `${w}%`, height: `${h}%` }}>
      {children}
    </div>
  )
}

function Col({ children, w, h }: { children: any, w?: number, h?: number }) {
  return (
    <div className='col' style={{ width: `${w}%`, height: `${h}%` }}>
      {children}
    </div>
  )
}