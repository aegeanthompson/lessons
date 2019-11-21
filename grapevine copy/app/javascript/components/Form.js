// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Form extends React.Component {
  // ==============
  // STATE
  // ==============
  constructor() {
    super()
    this.state = {
      name: '',
      image: '',
      body: '',
      id: null
    }
  }

  // ==============
  // HANDLERS
  // ==============
  // handles form change
  handleChange = (e) => {
    this.setState({[e.target.id] : e.target.value})
  }

  // handles submit
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.props.view.page === 'addPost'){
      this.props.handleCreate(this.state)
    } else if(this.props.views.page === 'editPost'){
            this.props.handleCreate(this.state)
    }
  }

  // ==============
  // LIFE CYCLES
  // ==============
  componentDidMount() {
    this.setState({
      name: this.props.formInputs.name,
      image: this.props.formInputs.image,
      body: this.props.formInputs.body,
      id: this.props.formInputs.id
    })
  }


  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name
          <input type="text" placeholder="your name" id="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <label>
          image
          <input type="text" placeholder="your image" id="image" value={this.state.image} onChange={this.handleChange}/>
        </label>
        <label id="post-form">
          post
          <textarea placeholder="write your words" id="body" value={this.state.body} onChange={this.handleChange}></textarea>
        </label>
        <input type="submit" value="share"/>
      </form>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Form
