import React from 'react'
import {Card, Button, Col} from 'react-bootstrap'
import { numberWithCommas } from '../utils/Utils'
const Menus = ({menu, masukKeranjang}) => {
  return (
    <Col md={4} sm={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img variant="top" src={`assets/images/${menu.category.nama.toLowerCase()}/${menu.gambar}`} />
        <Card.Body>
          <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
          <Card.Text>
            Rp. { numberWithCommas(menu.harga) }
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Menus