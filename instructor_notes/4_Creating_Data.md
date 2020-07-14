# Integrating React w/Rails - Part 4: Creating Data

### Lesson objectives

_After this lesson, students will be able to:_

- Create new data / POST to the backend via the React frontend
- Update the state with the new data _without_ having to make another AJAX call 😱

## An Overview

### Where do we want to create data?

Of course, we're going to have to do so using the Form. But that's not where we want to make the actual POST request. Why?

When we create the new data, we also need to update our state, since we don't want the user to have to refresh the page to see their newly created post. It should automatically appear in the Main index. In other words, after POSTing, we need to update our state by calling `setState` so that our `Main` will re-render with the new post.

Since the post data is saved in the `Main` state, it's best we make our POST request there.

### The form starter code

You've already learned how to make a form in React, so hopefully nothing that was given in `Form.js` should look too new.

It has:

- State set up for each of the inputs
  - Additionally, it has an `id` key. We'll need this when we want to update a post later
- Handlers for handling the input change and handling the submit
- The form itself

The `Form` holds all the data needed to create a new task, but we want to make our actual POST request in `Main`. How can we do this?

We need to lift the `Form`'s state data up into `Main` somehow, by:

- Creating a handler method in Main that'll deal with actually creating the post
- Pass that handler method down into Form as a prop
- Call on that handler method in our handleSubmit method and pass it the Form state data

So let's get started

## Lifting Up Form State

First write a handler method to handle creating data and pass it down to Form as a prop. For now, we'll just have it console log the data we pass back up.

#### In `Main.js`

```js
handleCreate = (createData) => {
  console.log(createData)
}
```

#### In `Main.js` render method

```jsx
<Form
  handleCreate={this.handleCreate}
/>
```

Now that it's accesible in Form, let's call the method when we submit the form and pass it the necessary data

#### In `Form.js` handleSubmit method

```js
handleSubmit = (e) => {
  e.preventDefault()
  this.props.handleCreate(this.state)
}
```

## Making a POST Request with `fetch`

The general syntax for making a POST request with fetch is a little different than the GET request since we have to give it some data as well. The GET request only had one argument, but the POST request takes two.

  - The first argument is the API URL
  - The second argument is an object where we pass in the data, the method we want to use (POST in this case), and the headers needed

Similar to the GET request, however, the POST request will also have two promises.

  - The first one will return the created person data
  - The second will return the jsonified data.

Let's take a look at the general format altogether:  

```js
fetch('API URL HERE', {
  body: JSON.stringify(data),
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
})
  .then(createdItem => {
    return createdItem.json()
  })
  .then(jsonedItem => {
    // whatever you want to do with the json data here
  })
  .catch(err => console.log(err))
```

Let's go ahead and use that format to make a POST request within our `handleCreateTask` method. For now, to make sure that we created successfully, let's just call on our `fetchPosts` method in the second promise so that our state should update with the new task.

```js
handleCreate = (createData) => {
  fetch('/api/posts', {
    body: JSON.stringify(createData),
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(createdPost => {
      return createdPost.json()
    })
    .then(jsonedPost => {
      this.fetchPosts()
    })
  .catch(err => console.log(err))
}
```

Nice, it works! We made 2 calls to our database, however, for just that one action. While that's totally fine for a small app like this, it's not the 'react way' and we generally want to limit the amount of database calls we make anyway. Instead we should utilize state.

## Updating State After a POST Request

Instead of calling on `fetchPosts` in the second promise, we want to update our state with our new post.

We want to _essentially_ push our `post` data into the array. However, we can't just do a `.push()` since we aren't supposed to directly mutate state. So, we have to find a workaround.

### Using `this.setState` with an updater

So far, you guys have just been using `setState()` by passing it an object of what you want to set state with. And specifically to update an array, you used a spread operator. While that works just fine, there is another way to use it though with what's called an updater. You can take a look at the React docs on it [here](https://reactjs.org/docs/react-component.html#setstate) to see more about it in depth.

For our purposes, all you need to know is the updater is essentially a copy of the component's current state _right before_ `setState` runs and updates the state. So, we can use it to update data based on the previous state. Let's take a look at the general syntax of it:

```js
this.setState( updater => {
  // do whatever you want here to manipulate data if needed, the 'updater' argument is usually a variable called prevState to denote that it is a copy of the previous state
  // then, return the object that you want to set state with like you've normally done
  return {
    stateKey: newStateValue
  }
})
```

Knowing that is now useful because now we can just take a copy of the previous state's array, `push` the new task into the array, then send that updated array into the return object like so:

#### In `Main.js` handleCreate method's second promise

```js
this.setState(prevState => {
  prevState.posts.push(jsonedPost)
  return { posts: prevState.posts }
})
```

Great! Now we're able to create data and update our state _without_ making an extra database call.

### One more little extra thing

Just for an updated user experience, let's make it so that after the user submits a new post, it'll immediately take them back to the index view.

We already made a method to handle toggling between views, so let's just utlize that `handleView` method and call it inside the second promise of our `handleCreate` method:

#### In `Main.js` handleCreate method's second promise _above_ the setState

```js
// change to home view
this.props.handleView('home')
```

---

**PREVIOUS**: [HANDLING VIEWS](3_Handling_Views.md) <br/>
**NEXT**: [UPDATING DATA](5_Updating_Data.md)
