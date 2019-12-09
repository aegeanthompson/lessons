
class App extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      groceries: groceries,
      item: '',
      brand: '',
      units: '',
      quantity: 0,
      isPurchased: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePurchased = this.togglePurchased.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    const newItem = {
      item: this.state.item,
      brand: this.state.brand,
      units: this.state.units,
      quantity: this.state.quantity,
      isPurchased: false
    }
    this.setState({
      groceries: [ newItem, ...this.state.groceries ],
      item: '',
      brand: '',
      units: '',
      quantity: 0,
      isPurchased: false
    })
  }

  togglePurchased (item) {
    item.isPurchased = !item.isPurchased;
    this.setState({
      isPurchased: item.isPurchased
    })
  }

  render () {
    return (
      <div>
        <h1 class="title">My Groceries</h1>
        <h4 class="addNew">ADD NEW ITEM</h4>
      <div class="items">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="item"></label>
          <h5>Item: </h5>
          <input
            type="text"
            value={this.state.item}
            onChange={this.handleChange}
            id="item"
          />
          <br />
          <label htmlFor="brand"></label>
          <h5>Brand: </h5>
          <input
            type="text"
            value={this.state.brand}
            onChange={this.handleChange}
            id="brand"
          />
          <br />
          <label htmlFor="units"></label>
          <h5>Units: </h5>
          <input
            type="text"
            value={this.state.units}
            onChange={this.handleChange}
            id="units"
          />
          <br />
          <label htmlFor="quantity"></label>
          <h5>Quantity: </h5>
          <input
              type="text"
              value={this.state.quantity}
              onChange={this.handleChange}
              id="quantity"
          />
          <br />
          <input class="addButton" type="submit" value="Add" />
        </form>
          <div>
            <div class="preview">
              <h4>Preview New Item</h4>
              <h3>{this.state.item}</h3>
              <h4>{this.state.brand}</h4>
              <h5>{this.state.units}</h5>
              <h5>{this.state.quantity}</h5>
            </div>
          </div>
        </div>
        <div class="toPurchase">
          <h2>To Purchase:</h2>
          <ul>
            {this.state.groceries.map(item => {
              return (
                <li className={item.isPurchased ? 'purchased': null} >
                  {item.item} {item.brand} {item.units} {item.quantity}
                  <br />
                  <button onClick={() => this.togglePurchased(item)}>Remove</button>
                </li>
              )
            }
          )}
          </ul>
      </div>
    </div>
    )
  }
}


  ReactDOM.render(
    <App />,
    document.querySelector('.container')
  )
