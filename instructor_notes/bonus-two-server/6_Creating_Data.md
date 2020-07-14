# Integrating React w/ a Rails Backend - Part 6: Creating Data

![](https://imgur.com/lJZzQqE.png)

### Lesson objectives

_After this lesson, students will be able to:_

  - Create new data / POST to the rails API server via the frontend
  - Update the state with the new data _without_ having to make another AJAX call 😱

## An Overview

As we've done for everything else, let's take a look at what we're going to build during this part before we just jump into it.

### Where do we want to create data?

Your first instinctive answer was probably the Form component, and you wouldn't be entirely wrong in thinking so. That is indeed where we will initally grab the user's inputted data with a input form. But, is that where we want to make the actual AJAX POST request? Let's think about it

When we create the new data, we also need to update our state, since we don't want the user to have to refresh the page to see their newly created todo task. It should automatically appear in the todo list. In other words, we need to update our state by calling `setState` so that our App will re-render with the new task.

Now, recall that the task data is used in two other components, the Header and TaskList.

So, since the new data that we're going to create is going to be used by other components encompassed by the App component, it's best for us to make the actual AJAX POST request in the App component.

With that all decided, let's get started by first making our form!

## Setting Up the Form

You guys have already learned the little details about making a form in React, so we won't talk too in depth about how any of this works, but if you want to review it, take a look back at the original lesson's notes!

First things first, let's actually make a form in our `Form.js`:

```jsx
<form>
  <input type='text' placeholder="CREATE A NEW TO DO"/>
  <button type="submit" className="submit-button"><i className="fas fa-plus"></i></button>
</form>
```

Next, let's set up the state for the form. Remember our data's schema is pretty simple, so we only need `task_item` and `completed` for our state. Let's give our `completed` value a default value of `false` since it makes the most sense for a newly created todo item to be, well, not yet completed.

```js
constructor(props) {
  super(props)
  this.state = {
    task_item: '',
    completed: false
  }
}
```

Next, let's make the method that'll handle the change in input every time the user types in it and the method that'll handle when the user submits. For now, just console log the event target value in `handleChange` and console log the state in `handleSubmit`

```js
// handle change
handleChange(e) {
  console.log(e.target.value)
}

// handle submit
handleSubmit(e) {
  e.preventDefault()
  console.log(this.state)
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> for both methods in the constructor!</strong></summary><p>

   ```js
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  ```

 </p></details>

 <br/>

Next let's edit our form now that we have state and our handler methods defined:

```js
<form onSubmit={this.handleSubmit}>
  <input type='text' value={this.state.task_item} onChange={this.handleChange} placeholder="CREATE A NEW TO DO"/>
  <button type="submit" className="submit-button"><i className="fas fa-plus"></i></button>
</form>
```

Great, now we can at least test that our methods are working correctly - and they are! Let's upgrade `handleChange` now so that it actually sets the state of the `task_item` in our state depending on the `e.target.value` that the user inputs:

```js
handleChange(e) {
  this.setState({ task_item: e.target.value })
}
```

Cool! One more quick thing before we deal with moving our data around, let's go ahead and create a method that'll clear the input form after the user submits. We'll do so by just reetting the `task_item` state to be an empty string:

```js
clearForm() {
  this.setState({ task_item: '' })
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.clearForm = this.clearForm.bind(this)
  ```

 </p></details>

 <br/>
Now call the method in `handleSubmit` with:

```js
this.clearForm()
```

## Accessing the Form State in the App Component

Earlier, we determined that we wanted to make the AJAX POST request in our App component. But the data needed to create the new task is inside of our Form component's state. So, we need to pass Form's state data up into App. In order to do so, we need to:

  - Creating a handler method in App that'll deal with creating the task
  - Pass that handler method down into Form as a prop
  - Call on that handler method in our `handleSubmit` method and pass it the Form state

Let's first create a handler method called `handleCreateTask` in `App.js`. We'll deal with making the actual `fetch` POST request later, so for now just make it so that it accepts the `task` data that we'll pass in later as an argument and console logs that `task`.

```js
handleCreateTask(task) {
  console.log(task)
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.handleCreateTask = this.handleCreateTask.bind(this)
  ```

 </p></details>

 <br/>

Now let's pass the handler down as a prop to Form:

###### In `App.js` render method where we render Form

```jsx
<Form
  handleCreateTask={this.handleCreateTask}
/>
```

Now, let's use that method in our `handleSubmit` method in the Form component. We'll pass in the Form component's state as the argument.

###### In `Form.js` inside the `handleSubmit` method _before_ we clear the form

```js
  this.props.handleCreateTask(this.state)
```

Nice! We successfully passed the Form state data into the App component. Now, let's work on making the actual POST request to our API  

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
  }
  .then(jsonedItem => {
    // whatever you want to do with the json data here
  }
  .catch(err => console.log(err)
```

Let's go ahead and use that format to make a POST request within our `handleCreateTask` method. For now, to make sure that we created successfully, let's just call on our `fetchTasks` method in the second promise so that our state should update with the new task.

```js
handleCreateTask(task) {
  fetch('http://localhost:3000/tasks', {
    body: JSON.stringify(task),
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then(createdTask => {
    return createdTask.json()
  })
  .then(jData => {
    this.fetchTasks()
  })
  .catch(err => console.log(err))
}
```

Nice, it works! We made 2 calls to our database, however, for just that one action. While that's totally fine for a small app like ours, it's not the 'react way' and we generally want to limit the amount of database calls we make anyway. Instead we should utilize state.

## Updating State After a POST Request

Instead of calling our `fetchTasks`, let's make another method that we can call that will instead just use the data that was returned and update our `todoTasks` state with it.

Let's name our function `updateArray` and let's make it accept two variables (the task data and the array we want to update) so that it can update either the `todoTasks` _or_ `completedTasks` array states (why? to save us time because we'll need it for our update method later!)

For now, let's just log the arguments:

 ```js
updateArray(task, array) {
  console.log(task)
  console.log(array)
}
 ```
 
<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.updateArray = this.updateArray.bind(this)
  ```

 </p></details>

 <br/>

Now, call it inside our `handleCreateTask` method in the second promise. For the second argument, let's pass in the `todoTasks` array since we know every new task created has to be in the `todoTasks`

```js
  this.updateArray(jData, 'todoTasks')
```

Cool, it's working perfectly! Now let's actually work on updating our state with the data. Let's think about what we want to  do, we want to _essentially_ push our `task` data into the array. However, we can't just do a `.push()` since we aren't supposed to directly mutate state. So, we have to find a workaround.

### Using `this.setState` with an updater

So far, you guys have just been using `setState()` by passing it an object of what you want to set state with. There is another way to use it though with what's called an updater. You can take a look at the React docs on it here to see more about it in depth.

For our purposes, all you need to know is the updater is essentially a copy of the component's current state _right before_ `setState` runs and updates the state. So, we can use it to update data based on the previous state. So let's take a look at the general syntax of it:

```js
this.setState( updater => {
  // do whatever you want here to manipulate data if needed, the 'updater' argument is usually a variable called prevState to denote that it is a copy of the previous state
  // then, return the object that you want to set state with like you've normally done
  return {
    stateKey: newStateValue
  }
})
```

### Using `setState()` with an updater to update our arrays

Knowing that is now useful because now we can just take a copy of the previous state's array, `push` the new task into the array, then send that updated array into the return object like so:

```js
updateArray(task, array) {
  this.setState( prevState => {
    prevState[array].push(task)
    console.log(prevState)
    return {
      [array]: prevState[array]
    }
  })
}
```

> _NOTE:_ Since our array is variable, we have to use bracket notation to select the correct array to push into and update

Great! Now we're able to create data and update our state _without_ making an extra database call.

### One more little extra thing

Just for an updated user experience, let's make it so that even if the user is in the completed view, after creating a task it will immediately toggle to the todo view so that the user can see the added task right away.

We already made a method to handle toggling between views, so let's just utlize that `handleView` method and call it inside the second promise of our `handleCreateTask` method:

```js
this.handleView('todo')
```

Neat! Now, let's work on being able to update our tasks so that we can move them between the todo and completed lists.

---

**PREVIOUS:** [GETTING AND DISPLAYING OUR DATA](5_Getting_And_Displaying_Data.md)<br/>
**NEXT:** [UPDATING DATA](7_Updating_Data.md)
