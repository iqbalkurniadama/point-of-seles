import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/Utils";
import axios from "axios";
import { API_URL } from "../utils/Constants";
import { useHistory } from "react-router-dom";

export default function TotalBayar({ keranjangs }) {

  const history = useHistory();
  const submitTotalBayar = () => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjangs
    }
    axios.post(API_URL+"pesanans", pesanan)
    .then((res) => {
      history.push("/sukses")
    })
  }

  const totalBayar = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);
  return (
    <>
      {/* web */}
      <div className='fixed-bottom d-none d-md-block'>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className='px-4'>
            <h4>
              Total Harga : <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <div className="d-grid gap-4">
              {/* { keranjangs.length > 0 ? 
                <Button variant='success' block className='mb-2 mt-4 mr-2' size='lg' onClick={() => submitTotalBayar(totalBayar)}>
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> <strong>BAYAR</strong>
                </Button> : ""
              } */}
              <Button variant='success' block className='mb-2 mt-4 mr-2' size='lg' onClick={() => submitTotalBayar(totalBayar)}>
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> <strong>BAYAR</strong>
                </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* mobile */}
      <div className='d-sm-block d-md-none'>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className='px-4'>
            <h4>
              Total Harga : <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <div className="d-grid gap-4">
              <Button variant='success' block className='mb-2 mt-4 mr-2' size='lg' onClick={() => submitTotalBayar(totalBayar)}>
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
