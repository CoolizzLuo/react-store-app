import React from 'react'
import { render } from 'react-dom'

class Panel extends React.Component {
  state = {
    active: false,
    component: null
  }

  open = ({component}) => {
    const _component = React.createElement(component)
    this.setState({
      active: true,
      component: _component
    })
  }

  close = () => {
    this.setState({
      active: false
    })
  }

  render() {
    const _class = {
      true: 'panel-wrapper active',
      false: 'panel-wrapper'
    }
    return (
      <div className={_class[this.state.active]}>
        <div className="over-layer" onClick={this.close}></div>
        <div className="panel">
          <div className="head">
            <span className="close" onClick={this.close}>x</span>
            <p className="has-text-centered">
              Children Component
              { this.state.component }
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const _div = document.createElement('div')
document.body.appendChild(_div)

const _panel = render(<Panel/>, _div)
console.log(_panel)
export default _panel