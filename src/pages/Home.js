/* eslint-disable react-hooks/exhaustive-deps */
// import './App.css';
import { Hasil, ListCategories, Menus, NavbarComponent } from "../components";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/Constants";
import axios from "axios";
import swal from "sweetalert";

function Home() {
  const [menu, setMenu] = useState([]);
  const [pilCategory, setPilCategory] = useState("Makanan");
  const [keranjangs, setKeranjangs] = useState([])

  useEffect(() => {
    axios
      .get(API_URL + "products?category.nama=" + pilCategory)
      .then((res) => {
        setMenu(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
      getKeranjang()
  }, []);

  const getKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // const keranjangs = res.data;
        setKeranjangs(res.data);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  const changeCategory = (value) => {
    setPilCategory({
      pilCategory: value,
      menu: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        setMenu(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              // setMenu(res.data)
              getKeranjang()
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              // setMenu(res.data)
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='mt-3'>
      <Container fluid>
        <Row>
          <ListCategories changeCategory={changeCategory} pilCategory={pilCategory} />
          <Col className="mt-3">
            <h4>
              <strong>Daftar Produk</strong>
            </h4>
            <hr />
            <Row className="overflow-auto menu">
              {menu && menu.map((item) => <Menus key={item.id} menu={item} masukKeranjang={masukKeranjang} />)}
            </Row>
          </Col>
          <Hasil keranjangs={keranjangs} {...menu} getKeranjang={getKeranjang}/>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
