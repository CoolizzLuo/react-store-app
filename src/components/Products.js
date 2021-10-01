import React from 'react'
import axios from 'commons/axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Product from './Product'
import ToolBox from './ToolBox'

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: []
  }


  componentDidMount() {
    axios.get('/products')
      .then(res => {
        this.setState({
          products: res.data,
          sourceProducts: res.data
        })
      })
  }

  search = text => {
    let _products = [...this.state.sourceProducts]

    _products = _products.filter(product => {
      const matchArray = product.name.match(new RegExp(text, 'gi'))
      console.log(matchArray)
      return !!matchArray
    })

    this.setState({
      products: _products
    })
  }

  render() {
    return (
      <div>
        <ToolBox search={this.search}/>
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map(product => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={product.id}
                  >
                    <div className="column is-3" key={product.id}>
                      <Product product={product} />
                    </div>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Products
