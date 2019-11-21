// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Aside extends React.Component {
  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <aside>
        <h1>NAVIGATE</h1>
        <ul>
          <li onClick={() => {this.props.handleView('home')}}>home</li>
          <li onClick={() => {this.props.handleView('addPost')}}>add post</li>
        </ul>
      </aside>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Aside
