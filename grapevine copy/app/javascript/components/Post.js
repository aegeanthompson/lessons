// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Post extends React.Component {
  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <article>
        <div className="post-header">
          <img src={this.props.postData.image} alt="" />
          <h1>{this.props.postData.name} saaid...</h1>
        </div>
        <div className="post-body">
          {this.props.postData.body}
        </div>
        <div className="post-options">
          <ul>
            <li onClick={() => {this.props.handleView('editPost', this.props.postData)}}>edit post</li>
            <li>delete post</li>
          </ul>
        </div>
      </article>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Post
