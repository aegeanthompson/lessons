# Integrating React w/Rails - Part 6: Deleting Data

### Lesson objectives

_After this lesson, students will be able to:_

  - Delete data from the rails API server via the frontend
  - Update the state to remove the deleted data without having to make another AJAX call

## An Overview

We've made it to the end! Deleting shouldn't be too difficult now that we know the flow of props and state as well as the syntax for fetch requests.

### Where do we want to delete the data?

You should hopefully be able to answer this now!

We fire the click event off in Post, but we want to make the actual AJAX request in Main since that's where our data resides. So, we'll have to make a handleDelete method in Main, then pass it down to Post.

## Setting Up Delete

For now, let's just make it so that we make an extra AJAX call to automatically update the page so it's easy to test.

We'll change it later so we don't make too many extra calls.

#### In `Main.js`

```js
handleDelete = (id) => {
  fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(json => {
      this.fetchPosts()
    })
    .catch(err => console.log(err))
}
```

#### In `Main.js` render method, pass it to Post

```jsx
<Post
  key={postData.id}
  postData={postData}
  handleView={this.props.handleView}
  handleDelete={this.handleDelete}
/>
```

Now let's add it as an onclick to the `delete post` button in Post

#### In `Post.js` render method

```jsx
<li onClick={() => {this.props.handleDelete(this.props.postData.id)}}>delete post</li>
```

And done! It works! Technically, you could end it here. But, again, we don't want to make any extra backend calls if it's easily avoidable. We already cheated with update, so let's just fix delete at least.

Like we did when we created a post, in order to avoid making another backend call, we just have to update state using the updater. But this time, instead of _pushing_ into the array, we want to _filter_ the deleted post from the array.

> _NOTE_: Forgot how `.filter` works? Take a look at the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)! (Alternatively, [W3](https://www.w3schools.com/jsref/jsref_filter.asp))

#### In `Main.js` handleDelete, replace this.fetchPosts with:

```js
this.setState(prevState => {
  const posts = prevState.posts.filter(post => post.id !== id)
  return { posts }
})
```

And that's it! We've now successfully integrated react with rails! 🎉

![](https://i.imgur.com/JvqIaoe.jpg)

---

**PREVIOUS:** [UPDATING DATA](5_Updating_Data.md)
