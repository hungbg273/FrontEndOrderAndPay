import React from "react";

interface Product {
  name: string,
  description: string,
  price: number,
  vol: number
}
interface Order {
  products: Product[];
}

interface Props {
  products: Product[];
  sum: number
}

export default class ProductList extends React.Component<Props, Order> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  onDeleteProduct(e: React.MouseEvent<HTMLButtonElement> ) {
  }

  render() {
    return (
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Volume</th>
          <th>Money</th>
        </tr>
        {
          this.props.products.map((prod) => {
            let money = prod.vol * prod.price;
            return (
              <tr>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.vol}</td>
                <td>{money}</td>
                <span className="pull-right text-uppercase delete-button" onClick={this.onDeleteProduct}>&times;</span>
              </tr>
            )
          })
        }
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <th>Payment Money</th>
          <td>{this.props.sum}</td>
        </tr>
      </table>
    )
  }
}