# Integrating React w/ a Rails Backend - Part 7: Updating Data

![](https://imgur.com/p48DbjY.png)

### Lesson objectives

_After this lesson, students will be able to:_

  - Make a PUT request to update the task data's completed value
  - Move the data between the two views _without_ having to make an extra AJAX call

## An Overview

Our update will be a pretty simple update. All we'll be doing is toggling the task's `completed` boolean value, thus moving it between the todo list and completed list. Although we won't be doing updates to the text or to multiple fields, we will be doing a general procedure for doing a PUT request in React that you should ideally be able to emulate later on to do different types of updates.

### Where do we want to update the data?

We've already set up the styling in our app so that each Task has a check box (unchecked if todo, checked if completed), so naturally your first thought is probably that Task is where we want to update the data. Again, you're not entirely wrong, Task is where we want to fire off the `onClick` event to update the data, but this is not where we want to make the actual PUT request.

Similar to our POST request, we want to make the actual fetch happen in the App component since, again, the data's state needs to be updated there.

### How are we going to move the data from one list to the other?

Remember that the way we set up our list views is by separating our tasks into two different arrays: `todoTasks` and `completedTasks`

Knowing that, the best way for us to move a task from one list to another is to update the state by removing the task from one array and adding it to the other one. So let's go ahead and do that! First, we'll create a handler method that will run `onClick` when we click a check box

## Setting Up the Update Handler

We previously determined that we want the actual PUT request to happen in the App component, so let's create our handler method there. Let's call it `handleCheck` and have it accept three arguments:

  - **task**: so we can pass in the task that we need to update
  - **arrayIndex**: so we know what index in the array (either the `todoTasks` or `completedTasks`) it's at, we'll be utilizing this later when we need to remove it from that array
  - **currentArray**: so we know what array we need to remove it from and what array to add it into

For now, let's just have it console log all of that

```js
handleCheck(task, arrayIndex, currentArray) {
  console.log(task)
  console.log(arrayIndex)
  console.log(currentArray)
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.handleCheck = this.handleCheck.bind(this)
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
  />
```

TaskList isn't where the onClick event is going to happen though, so we need to pass it down even further into Task. We also need to pass down another prop into Task for the array index. We know what the array index is thanks to the map function, so let's pass down `index` as a prop called `arrayIndex`

###### In `TaskList.js` render method in both areas where we render Task

```jsx
<Task
  key={index}
  arrayIndex={index}
  task={task}
  handleCheck={this.props.handleCheck}
/>
```

## Setting Up the `onClick` Method

Great, now that we have a handler method set up and passed down to where it needs to be, we can actually use it. Let's attach an `onClick` onto both our check boxes and pass it the appropriate arguments.

###### In `Task.js` render method where we have our two check boxes

```jsx
{ this.props.task.completed ?
  <i className="incomplete far fa-check-square" onClick={() => { this.props.handleCheck(this.props.task, this.props.arrayIndex, 'completedTasks')}}></i> :
  <i className="complete far fa-square" onClick={() => { this.props.handleCheck(this.props.task, this.props.arrayIndex, 'todoTasks')}}></i>
}
```

## Using `fetch` to make a PUT request  

Now that our handler is working and we've passed the correct data up into it, we can use that data to actually make the PUT  request.

The general syntax for making a PUT request with fetch is the same as the POST request. The only difference, of course, is that we need to change the method from POST to PUT. We'll do that in a moment. But first, we need to actually manipulate the data that we passed down.

### Manipulating the passed down data

If you look at the data that we passed down, it's all the current data. So, if you clicked on a checkbox in the completed view, the `task` data that we console logged looks something like:

![](https://i.imgur.com/pgaZjln.png)

We can't just pass `task` into our fetch request because the `completed` boolean hasn't actually been updated yet. So, let's change that. We want to make the `completed` boolean be the opposite of what it currently is

###### In `App.js` in the `handleCheck` method

```js
handleCheck(task, arrayIndex, array) {
  // manipulate the task data
  task.completed = !task.completed
  console.log(task)
}
```

### Making the PUT request

Great, now that we updated the data, we can make the fetch request using the same syntax we did for the POST request and changing the method to PUT. For now, in the second promise just call on our `fetchTasks` method.

> _NOTE:_ Remember that our API route endpoint for updating is `/tasks/:id`, so don't forget to account for that!

```js
fetch(`http://localhost:3000/tasks/${task.id}`, {
  body: JSON.stringify(task),
  method: 'PUT',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
})
  .then(updatedTask => {
    return updatedTask.json()
  })
  .then(jData => {
    this.fetchTasks()
  })
  .catch(err => console.log(err))
```

## Updating State After a PUT Request

As previously discussed, we don't want to make extra AJAX calls when we don't need to and can just take advantage of react state instead. So, instead of calling on `this.fetchTasks()`, let's...

  - Make a method that'll handle removing the task from its current array and call on that
  - Use an if statement to determine what array we need to add it into, then use the `updateArray` method we wrote earlier to do just that

### Writing a method to handle removing the updated task from its current array

Thanks to our forethought, we created arguments in our `handleCheck` method that lets us know what array the task was previously in as well as what index it was at. We can now utilize that information to `splice` the task out of its old array. So let's create a method called `removeFromArray` that'll accept the array and array index as arguments and update the state of that array

```js
removeFromArray(array, arrayIndex) {
  this.setState(prevState => {
    prevState[array].splice(arrayIndex, 1)
    return {
      [array]: prevState[array]
    }
  })
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.removeFromArray = this.removeFromArray.bind(this)
  ```

 </p></details>

 <br/>

Now let's use that method inside our `handleCheck` method inside the second promise

```js
this.removeFromArray(array, arrayIndex)
```

### Moving the task to the other array

Cool, that removes the task from its current array, but it doesn't move to the opposite array. Let's go ahead and do that by writing an if statement inside our `handleCheck` method and utilizing the `updateArray` method we wrote earlier!

```js
if(array === 'todoTasks') {
  this.updateArray(jData, 'completedTasks')
} else {
  this.updateArray(jData, 'todoTasks')
}
```

Nice! We've successfully updated our task in the API and made it so that we could update our views to reflect that without making extra AJAX calls! 🎉

We just have one more method to go, let's get deletin'!

---

**PREVIOUS:** [CREATING DATA](6_Creating_Data.md)<br/>
**NEXT:** [DELETING DATA](8_Deleting_Data.md)
