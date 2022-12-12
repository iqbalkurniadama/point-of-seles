// import React, { Component } from 'react'
import React, { useEffect, useState, useRef } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Constants";
import PrintPdf from "../components/PrintPdf";
import { useReactToPrint } from "react-to-print";

// export default class Sukses extends Component {

//   componentDidMount() {
//     axios.get(API_URL + "keranjangs")
//     .then((res) => {
//       const keranjangs = res.data
//       keranjangs.map(function(item) {
//         return axios.delete(API_URL+"keranjangs/"+item.id)
//         .then((res) => console.log(res))
//         .catch((error) => console.log(error))
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="mt-4 text-center">
//         <Image src="assets/images/sukses.png" width="500" />
//         <h2>Sukses Pesan</h2>
//         <p>Terima Kasih Sudah Memesan</p>
//         <Button bg="primary" as={Link} to="/">
//           Kembali
//         </Button>
//       </div>
//     )
//   }
// }

function Sukses() {
  const [keranjangs, setKeranjangs] = useState([]);

  const getKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        setKeranjangs(res.data);
        // console.log(res.data)
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

      const handleBack = () => {
      axios.get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data
        keranjangs.map(function(item) {
          return axios.delete(API_URL+"keranjangs/"+item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
        })
      })
    };

    useEffect(() => {
      getKeranjang();
      handleBack()
    }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "invoice",
    onAfterPrint: () => alert("print success"),
  });

  return (
    <div className='mt-4'>
      <PrintPdf keranjangs={keranjangs} componentRef={componentRef} />
      <Container className=' d-flex justify-content-center align-items-center'>
        <Row>
          <Col>  
              <Button variant='success' className="width" size="lg" onClick={handlePrint}>
                print
              </Button>
              <Button bg='primary' onClick={handleBack} className="width" size="lg" as={Link} to='/'>
                Kembali
              </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Sukses;
