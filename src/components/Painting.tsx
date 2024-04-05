type PaintingProps = {
  paintingCells: any
  onClick: (cellId: number) => void
}

type CellProps = {
  grow?: number
  id: number
}
export default function Painting({ paintingCells, onClick }: PaintingProps) {
  function Cell({ grow = 1, id }: CellProps) {
    return (
      <div
        {...{
          id: `cell-${id}`,
          className: 'cell',
          onClick: () => onClick(id),
          style: {
            flexGrow: grow,
            backgroundColor: paintingCells[id].color,
          },
        }}
      >
        {/* {id} */}
      </div>
    )
  }
  return (
    <div className='painting'>
      <Row>
        <Col grow={20}>
          <Row>
            <Cell id={0} grow={2} />
            <Cell id={1} grow={4.4} />
            <Cell id={2} grow={3} />
          </Row>
          <Row grow={9}>
            <Col>
              <Cell id={3} grow={1} />
              <Cell id={4} grow={2} />
              <Cell id={5} grow={1} />
            </Col>
            <Col grow={9}>
              <Row grow={2}>
                <Cell id={6} grow={2} />
                <Col>
                  <Cell id={7} />
                  <Row>
                    <Cell id={8} />
                    <Cell id={9} />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Cell id={10} grow={2} />
                  <Cell id={11} />
                </Col>
                <Col grow={2.5}>
                  <Row grow={8}>
                    <Col>
                      <Cell id={12} />
                      <Cell id={13} />
                      <Cell id={14} grow={0.3} />
                    </Col>
                    <Col>
                      <Cell id={15} grow={1} />
                      <Cell id={16} grow={1.5} />
                    </Col>
                  </Row>
                  <Cell id={17} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Cell id={18} grow={3.9} />
          <Cell id={19} />
        </Col>
      </Row>
    </div>
  )
}

function Row({ children, grow = 1, style }: { children?: any; grow?: number; style?: any }) {
  return (
    <div className='row' {...{ style: { ...style, flexGrow: grow } }}>
      {children}
    </div>
  )
}

function Col({ children, grow = 1, style }: { children?: any; grow?: number; style?: any }) {
  return (
    <div className='col' {...{ style: { ...style, flexGrow: grow } }}>
      {children}
    </div>
  )
}
