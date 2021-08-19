import React, { ChangeEvent, Component, ReactHTMLElement } from 'react';
import ProductLists from "./ProductList"

interface Product {
  name: string,
  description: string,
  price: number,
  vol: number
}
interface Order extends Product {
  products: Product[];
  sum: number;
}

interface Props {
}

let ProductList = [{ name: "Doping", description: "Nothing is impossible", price: 1000 }
  , { name: "Weed", description: "It's time to get high", price: 1500 }
  , { name: "Drug", description: "I can fly", price: 500 }];
export default class AddProduct extends React.Component<Props, Order> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      vol: 0,
      products: [],
      sum: 0
    }
    this.handleOnChangeTextForm = this.handleOnChangeTextForm.bind(this);
    this.handleOnChangeSelectForm = this.handleOnChangeSelectForm.bind(this);
    this.handleOnClickAddProduct = this.handleOnClickAddProduct.bind(this);
  }

  handleOnChangeTextForm(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ vol: Number(e.target.value) })
  }

  handleOnChangeSelectForm(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    let idProduct = Number(e.target.value);
    this.setState({ name: ProductList[idProduct].name })
    this.setState({ description: ProductList[idProduct].description })
    this.setState({ price: ProductList[idProduct].price })
    let div = document.getElementById("description");
    console.log(div !== null)
    if (div !== null) {
      div.innerText = this.state.description;
    }
    div = document.getElementById("price");
    if (div !== null) {
      div.innerText = this.state.price.toString();
    }
  }
  handleOnClickAddProduct(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newProducts = this.state.products;
    let newProduct = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      vol: this.state.vol
    };
    let newSum = this.state.sum + (newProduct.price * newProduct.vol)
    this.setState({sum : newSum})
    let ok = 0;
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i].name == newProduct.name) {
        ok = 1;
        let newVol = newProducts[i].vol + newProduct.vol;
        newProducts[i].vol = newVol;
      }
    }
    if (ok == 0) newProducts.push(newProduct);
    this.setState({ products: newProducts });
  }
  handleCallbackDeleteProduct(nameProduct: string) {

  }

  render() {
    return (
      <div>
        <select className="form-select form-select-lg mb-3" aria-label="Default select example" name="idProduct" onChange={this.handleOnChangeSelectForm} required>
          <option selected>Select product</option>
          <option value="0">Doping</option>
          <option value="1">Weed</option>
          <option value="2">Drug</option>
        </select>
        <div className="form-group">
          <label className="control-label" htmlFor="description">Description:</label>
          <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={this.state.description} disabled />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="price">Price:</label>
          <input type="text" className="form-control" id="price" name="price" placeholder="Price" value={String(this.state.price)} disabled />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="vol">Volume:</label>
          <input type="text" className="form-control" id="vol" name="vol" placeholder="Volume" onChange={this.handleOnChangeTextForm} />
        </div>
        <div className="form-group">
          <button className="btn" type='submit' onClick={this.handleOnClickAddProduct}>Add Product</button>
        </div>
        <div>
          <ProductLists products={this.state.products} sum={this.state.sum} />
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}
