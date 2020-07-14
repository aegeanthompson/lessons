# Integrating React w/ a Rails Backend - Part 8: Deleting Data

![](https://imgur.com/WJNhsgP.png)

### Lesson objectives

_After this lesson, students will be able to:_

  - Delete data from the rails API server via the frontend
  - Update the state to remove the deleted data without having to make another AJAX call

## An Overview

Now that we've gotten to the end, deleting our data should be quite easy! We've already learned the general fetch syntax and in fact we've already written a method `removeFromArray` that handles removing data by just updating our state instead of making an extra AJAX call. So, we don't have too much to do here, we can just use what we already know and made.

### Where do we want to delete the data?

Similar to our update method, we want to fire off the click event inside Task since that's where our delete button is. But, of course, we want to make the actual DELETE request inside of the App component for the same reason we discussed for the create and update methods.

Let's go ahead and get that set up then by first creating our delete handler method in the App component

## Setting Up the Delete Handler

We already know a lot of what we're going to need to make a delete work smoothly. We know we want to make a DELETE AJAX request to our API, and we know we can reuse the `removeFromArray` method we wrote earlier. So, knowing all that, let's create a handler called `handleDelete` that accepts three arguments:

  - **taskId**: so that we can use that in the API URL when we make the DELETE AJAX request
  - **arrayIndex**: so that we can use it in the `removeFromArray` method
  - **currentArray**: again, so that we can use it in the `removeFromArray` method

For now, let's just have it console log all of that

```js
handleDelete(taskId, arrayIndex, currentArray) {
  console.log(taskId)
  console.log(arrayIndex)
  console.log(currentArray)
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.handleDelete = this.handleDelete.bind(this)
  ```

 </p></details>

 <br/>

Now that we have the handler written out, let's go ahead and pass it to the TaskList component

###### In `App.js` render method where we render TaskList

```jsx
<TaskList
    currentView={this.state.currentView}
    todoTasks={this.state.todoTasks}
    completedTasks={this.state.completedTasks}
    handleCheck={this.handleCheck}
    handleDelete={this.handleDelete}
  />
```

TaskList isn't where the onClick event is going to happen though, so we need to pass it down even further into Task.

###### In `TaskList.js` render method in both areas where we render Task

```jsx
<Task
  key={index}
  arrayIndex={index}
  task={task}
  handleCheck={this.props.handleCheck}
  handleDelete={this.props.handleDelete}
/>
```

# Setting Up the onClick Method

Great, now that we have a handler method set up and passed down to where it needs to be, we can actually use it. Let's attach an onClick onto our trash icon and pass it the appropriate arguments.

#### BUT WAIT!

If you try to write that out now, with that way we set up our delete button, we can't pass in the third argument, the task's `currentArray` variably. We have our delete button _outside_ of the ternary operator since having a delete button doesn't depend on whether the task is complete or not.

So, how can we fix that? If we look one step higher into our TaskList component instead, here we mapped out our two different arrays. We can utilize that and pass down a `currentArray` prop into Task to denote what array it's currently in.

###### In `TaskList.js` render method where we mapped `todoTasks`, add into Task

```jsx
  currentArray='todoTasks'
```

###### In `TaskList.js` render method where we mapped `completedTasks`, add into Task

```jsx
  currentArray='completedTasks'
```

Now, we can utilize that prop and pass it in as the `currentArray` argument in our onClick method

###### In `Task.js` render method where we have our trash icon

```jsx
<i className="delete far fa-trash-alt" onClick={() => { this.props.handleDelete(this.props.task.id, this.props.arrayIndex, this.props.currentArray)}}></i>
```

While we're at it, feel free to use that prop variable inside our two check box onClick methods as well!

## Using `fetch` to make a DELETE request

Now that our handler is working and we've passed the correct data up into it, we can use that data to actually make the DELETE request.

The syntax for making a DELETE request with fetch is much simpler than the POST and PUT requests

  - All we need to include in the second argument object is the `method: 'DELETE'` since we don't need to pass any body data to make a delete request
  - We don't need to json-ify any data, so we only really need one promise!

> _NOTE:_ Remember that our API route endpoint for deleting is /tasks/:id, so don't forget to account for that!

### Making the DELETE request

Let's go ahead and write the fetch request inside our `handleDelete` method. In the promise, let's utilize the `removeFromArray` method we wrote earlier.

```js
handleDelete(taskId, arrayIndex, array) {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'DELETE'
  })
    .then(data => {
      this.removeFromArray(array, arrayIndex)
    })
    .catch(err => console.log(err))
}
```

And that's it! We've now successfully integrated our rails API server with a react frontend server! 🎉

![](https://i.imgur.com/JvqIaoe.jpg)

---

**PREVIOUS:** [UPDATING DATA](7_Updating_Data.md)<br>
**NEXT:** [HOMEWORK!](/unit_4/w11d04/homework)
