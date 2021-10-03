import React from 'react'
import axios from 'commons/axios'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ToolBox from './ToolBox'
import Product from './Product'
import Panel from './Panel'
import AddInventory from './AddInventory'

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0
  }


  componentDidMount() {
    axios.get('/products')
      .then(res => {
        this.setState({
          products: res.data,
          sourceProducts: res.data
        })
      })
      .catch(err => console.log(err))
    this.updateCartNum()
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

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: (data) => {
        if (data) this.add(data)
      }
    })
  }

  add = product => {
    const _products = [...this.state.products, product]
    const _sProducts = [...this.state.sourceProducts, product]

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  update = product => {
    const _products = [...this.state.products]
    const _index = _products.findIndex(p => p.id === product.id)
    _products.splice(_index, 1, product)
    
    const _sProducts = [...this.state.sourceProducts]
    const _sIndex = _products.findIndex(p => p.id === product.id)
    _sProducts.splice(_sIndex, 1, product)

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id)
    const _sProducts = this.state.products.filter(p => p.id !== id)
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  updateCartNum = async () => {
    const cartNum = await this.initCartNum()
    this.setState({
      cartNum
    })
  }

  initCartNum = async () => {
    const user = global.auth.getUser() || {}
    const res = await axios.get('/carts', {
      params: {
        userId: user.email
      }
    })
    const carts = res.data || []
    return carts.reduce((acc, cart) => acc + cart.mount, 0)
  }

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum}/>
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
                      <Product 
                        product={product} 
                        update={this.update} 
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </div>
          {
            (global.auth.getUser() || {}).type === 1 && (
              <button className="button is-primary add-btn" onClick={this.toAdd}>add</button>
            )
          }
        </div>
      </div>
    )
  }
}

export default Products
