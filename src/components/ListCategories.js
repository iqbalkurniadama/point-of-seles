import React, { Component } from "react";
import { API_URL } from "../utils/Constants";
import axios from "axios";
import { ListGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className='mr-2' />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className='mr-1' />;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className='mr-2' />;

  return <FontAwesomeIcon icon={faUtensils} className='mr-2' />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, pilCategory } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                type='button'
                onClick={() => changeCategory(category.nama)}
                className={pilCategory === category.nama && "category-aktif"}>
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
