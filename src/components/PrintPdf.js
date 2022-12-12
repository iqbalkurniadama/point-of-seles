import React, { useRef, useEffect } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { API_URL } from "../utils/Constants";

function PrintPdf({ keranjangs, componentRef }) {
  // print pdf
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "invoice",
  //   onAfterPrint: () => alert("print success"),
  // });

  const submitTotalBayar = () => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjangs,
    };
    axios.get(API_URL + "keranjangs", pesanan).then((res) => {
      // console.log(res.data);
    });
  };
  useEffect(() => {
    submitTotalBayar();
  }, []);

  const totalBayar = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <>
      <Row className='justify-content-center mt-5' ref={componentRef}>
        <Col md={3}>
          <h2 className='text-center mb-1'>Kasir App</h2>
          <p className='text-center'>
            Alamat <br /> jl.Segera II No 28,
            <br /> Kec Umbulharjo, Yogyakarta
          </p>
          <hr />
          <h3 className='text-center'>Invoice</h3>
          <hr />
          <div className='px-2'>
            <span className='float-start'>Tanggal</span> <span className='float-end'>29 Oct 2022 11:20</span> <br />
            <span className='float-start'>Order Id</span> <span className='float-end'>41231</span> <br />
            <span className='float-start'>Nama</span> <span className='float-end'>Juki</span> <br />
          </div>
          <hr />
          <Table responsive='md'>
            <thead>
              <tr>
                <th className='text-start'>Produk</th>
                <th>Qty</th>
                <th className='text-end'>Harga</th>
              </tr>
            </thead>
            <tbody>
              {keranjangs.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className='text-start'>{item.product.nama}</td>
                    <td className='text-justify'>x{item.jumlah}</td>
                    <td className='text-end'>{item.product.harga}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className='px-2'>
            <h5 className='text-start'>
              total
              <span className='float-end'>{totalBayar}</span>
            </h5>
          </div>
          <hr />
          <p className='my-3 mt-4 text-center'>terima kasih sudah berbelanja di Tabpedia Shop</p>
        </Col>
      </Row>
      {/* <div className='mt-4'>
        <button onClick={handlePrint}>print</button>
      </div> */}
    </>
  );
}

export default PrintPdf;
