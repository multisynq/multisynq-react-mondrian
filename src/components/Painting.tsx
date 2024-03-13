
const size = 30
const gapSize = 0.25

export default function Painting({ paintingCells }: { paintingCells: any }) {

  const c = (id: number) => paintingCells[id].color

  return (
    <div className='painting' style={{ width: `${size}rem`, height: `${size}rem` }}>
      <Row w={100} h={100}>
        <Col w={90}>
          <Row h={10}>
            <Cell color={c(0)} w={30} />
            <Cell color={c(1)} w={40} />
            <Cell color={c(2)} w={30} />
          </Row>
          <Row h={90}>
            <Col w={10}>
              <Cell color={c(3)} h={25}/>
              <Cell color={c(4)} h={45}/>
              <Cell color={c(5)} h={30}/>
            </Col>
            <Col w={90}>
              <Row h={60}>
                <Cell color={c(6)} h={100} w={41.5}/>
                <Col>
                  <Cell color={c(7)} h={50}/>
                  <Row h={50}>
                    <Cell color={c(8)} />
                    <Cell color={c(9)} />
                  </Row>
                </Col>
              </Row>
              <Row h={40}>
                <Col w={30}>
                  <Cell color={c(10)} h={70}/>
                  <Cell color={c(11)} h={30}/>
                </Col>
                <Col w={70}>
                  <Row h={90}>
                    <Col w={52.5}>
                      <Cell color={c(12)} h={40}/>
                      <Cell color={c(13)} h={40}/>
                      <Cell color={c(14)} h={20}/>
                    </Col>
                    <Col w={47.5}>
                      <Cell color={c(15)} h={40}/>
                      <Cell color={c(16)} h={60}/>
                    </Col>
                  </Row>
                  <Cell color={c(17)} h={10} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col w={10}>
          <Cell color={c(18)} />
          <Cell color={c(19)} h={30} />
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

function Cell({ color, h, w, className = '' }: { color: string, h?: number, w?:number, className?: string }) {
  return (
    <div className={`cell ${className}`} style={{
      backgroundColor: color,
      width: w ? `${w}%` : '100%',
      height: h ? `${h}%` : '100%',
      outline: `${gapSize}rem solid black`,
    }} />
  )
}