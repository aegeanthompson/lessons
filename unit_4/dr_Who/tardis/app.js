class DivThree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tardis: {
        name: 'Time and Relative Dimension in Space',
        caps: false
      }
    }
      this.changeIt = this.changeIt.bind(this)
  }

  changeIt() {
  if (this.state.tardis.caps) {
    this.setState({
      tardis: {
        name: this.state.tardis.name.toLowerCase(),
        caps: false
      }
    })
  } else {
    this.setState({
      tardis: {
        name: this.state.tardis.name.toUpperCase(),
        caps: true
      }
    })
  }
}
      render () {
        return (
          <div>
            <h3 onClick={this.changeIt}>{this.state.tardis.name}</h3>
          </div>
        )
      }
  }

class DivTwo extends React.Component {
  render () {
    return (
      <div>
      <DivThree />
      <DivThree />
      </div>
    )
  }

}

class DivOne extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <DivTwo />
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <DivOne />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
