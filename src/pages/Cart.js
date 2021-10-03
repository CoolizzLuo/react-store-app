import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Layout from 'Layout'
import CartItem from 'components/CartItem'
import axios from 'commons/axios'
import { formatPrice } from 'commons/helper'
import { toast } from 'react-toastify'

const Cart = () => {
  const [carts, setCarts] = useState([])
  const totalPrice = useMemo(() => carts.reduce((acc, cart) => acc + (cart.mount * parseInt(cart.price)), 0), [carts])

  useEffect(() => {
    const user = global.auth.getUser() || {}
    axios.get(`/carts?userId=${user.email}`).then((res) => setCarts(res.data))
  }, [])

  const updateCart = useCallback((cart) => {
    const newCarts = [...carts]
    const _index = newCarts.findIndex(c => c.id === cart.id)
    newCarts.splice(_index, 1, cart)
    setCarts(newCarts)
    toast.success('Update Cart mount')
  }, [carts])

  const deleteCart = useCallback((cart) => {
    const newCarts = carts.filter(c => c.id !== cart.id)
    setCarts(newCarts)
    toast.warning(`Remove Cart Item: ${cart.name}`)
  }, [carts])

  return (
    <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          <TransitionGroup component={null}>
            { carts.map((cart) => (
                <CSSTransition
                classNames="cart-item"
                timeout={300}
                key={cart.id}
                >
                  <CartItem 
                    key={cart.id} 
                    cart={cart} 
                    updateCart={updateCart}
                    deleteCart={deleteCart}
                  />
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {
          carts.length === 0 && <p className="no-cart">Cart is empty</p>
        }
        <div className="cart-total">
          Total:
          <span className="total-price">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </Layout>
  )
}

export default Cart;