import React, { useState, useMemo } from 'react'
import axios from 'commons/axios'
import { formatPrice } from 'commons/helper'

const CartItem = ({ cart, updateCart, deleteCart }) => {
  const { id, name, image, price, mount } = cart
  const [count, setCount] = useState(mount)
  const sumPrice = useMemo(() => (count <= 0 || !count) ? 0 : count* parseInt(price), [count, price])

  const handleChange = (e) => {
    const _mount = parseInt(e.target.value)
    setCount(_mount)
    const newCart = {
      ...cart,
      mount: _mount
    }
    
    axios.put(`/carts/${id}`, newCart)
      .then((res) => updateCart(newCart))
  }

  const handleDelete = () => {
    axios.delete(`/carts/${id}`)
      .then((res) => deleteCart(cart))
  }

  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={handleDelete}>
        <span className="close">X</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      <div className="column cart-name is-narrow">{name}</div>
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      <div className="column">
        <input 
          type="number" 
          className="input num-input"
          min="1"
          value={count} 
          onChange={handleChange} 
        />
      </div>
      <div className="column">
        <span className="sum-price">{formatPrice(sumPrice)}</span>
      </div>
    </div>
  );
};

export default CartItem