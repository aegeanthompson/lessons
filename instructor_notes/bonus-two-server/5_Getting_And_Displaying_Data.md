# Integrating React w/ a Rails Backend - Part 5: Getting and Displaying Our Data

![](https://imgur.com/hiFdbzQ.png)

### Lesson objectives

_After this lesson, students will be able to:_

  - Fetch data from a separate rails API server
  - Display that data
  - Configure CORS in a rails API

## An Overview

Now that the bare bones of our app is all set up, we can finally get to working with our API data! Before we actually `fetch` anything though, let's talk a little bit about how we want to deal with and display our data.

### Where do we want to display our data?

  - **TaskList**: of course, since this is where we want to list all our tasks
  - **Header**: if you look back at the mockup, we put in the navigation links how many completed and todo tasks there were

### Where do we want to fetch and save our data?

Knowing all that, where do you think we should fetch our data? Which component's state should hold all the data?

Since 2 different components are dependent on the data, both of which are encompassed by the App component, it's best for us to fetch it and save it in the App.

### Our data and our views

We know that we have 2 views: todo and completed.

  - The todo view will list all the tasks that are still todo
  - The completed view will list all the tasks that are completed

As we saw earlier, we also know our data has a boolean value that determines whether or not the task is completed - so we should probably take advantage of that! How?

After fetching all our data, let's split it up into two different arrays based on the `completed` boolean. That way, we'll have an array of `todoTasks` and an array of `completedTasks` that'll make it easier for us to separate them between the views.

## Getting our data

Now, let's actually interact with the API! You've already learned how to use `fetch` for making AJAX requests from a third-party API. Surprise, surprise -- we can use that exact method to fetch data from _our_ API instead!

### Using `fetch` with our API

If you recall from the AJAX lesson, the syntax for using fetch to get data is like so:

```js
fetch('API URL HERE')
  .then(data => data.json())
  .then(jsonedData => {
    // do whatever you want with the data here
  })
  .catch(err => console.log(err))
```

Knowing that, what do you think we should use as our API URL? Think back to how you tested your backend routes in Postman or the browser.

We used `http://localhost:3000/tasks`, and we can use that in our `fetch`!

> _NOTE:_ This is only for during development. Later when you deploy your projects (remember, 2 servers also means 2 deployments -- one for the API, one for the frontend), don't forget to change localhost:3000 to be your API's deployed URL instead!

### Writing our fetch method

We already established earlier that the best place to do so is in our App component, so make sure you're in `App.js` and then start writing the `fetchTasks` method. For now, we'll just console log the jsonedData to make sure it works.

```js
fetchTasks() {
    fetch('http://localhost:3000/tasks')
		.then(data => data.json())
    .then(jData => {
      console.log(jData)
    })
  }
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.fetchTasks = this.fetchTasks.bind(this)
  ```

 </p></details>

### Testing our fetch method

For now, let's just test to make sure it's actually working as intended! This isn't where we're going to keep it, but for testing purposes let's call `this.fetchTasks()` inside the render method so that it'll run when our App is rendered.

Uh oh! We get a weird looking error:

![](https://i.imgur.com/J47I9G2.png)

### What is going on?

Browsers implement a security feature called _same-origin policy._ The idea is that Javascript requests to a server are rejected if they come from a different origin. AJAX requests can't make requests to other servers than the one they're coming from. For security reasons, by default, AJAX requests must have the same origin as the server to which they are making requests.

> _NOTE:_ An origin in this case is the combination of port, protocol and host.

In the past, we always had our backend and frontend running on the same origin. So making AJAX requests was totally fine and not blocked by the browser.

This time however, since our API server is separate from our front-end server, they have completely different origins. Thus, the AJAX request is blocked by the browser.

But, no fear, there's of course a way to circumvent that!

## CORS

CORS is an abbreviation for cross-origin resource sharing. When configured, it allows AJAX calls to be made across different origins. So, let's go ahead and configure it on our backend!

> _NOTE:_ Want to see more on CORS? [Take a look here!](https://spring.io/understanding/CORS)

### Configuring CORS

Rails makes it pretty easy for us to configure CORS, especially since we've used the `--api` flag. So let's go ahead and configure it.

#### INSTALLING THE RACK-CORS GEM

  - If you closed it, open up the `todo-api` directory in another atom window
  - In the `Gemfile`, uncomment the `gem 'rack-cors'` somewhere around line 29
    <img src="https://i.imgur.com/VyXk2tw.png">
  - In terminal in the `todo-api` directory, run `bundle` to install the Gemfile gems now that we uncommented one

#### CONFIGURING CORS PERMISSIONS

  - In `config/initializers/cors.rb`, uncomment lines 8-16
    <img src="https://i.imgur.com/GzRNE86.png">
  - Change the `origins` on line 10 to `*`
  - Restart your rails server

> _NOTE:_ If you _do not_ include the `--api` flag when creating a rails API, the `rack-cors` gem and the `cors.rb` file will **not** be generated in the project. So make sure you don't forget that flag!

Our frontend should be able to make AJAX requests to our API now! If not, try restarting your react server as well.

  - If you were able to successfully make the AJAX request and notice your computer  slowing down, **comment out** the `this.fetchTasks()` method. We'll go over why later on! 

### What the code in `cors.rb` means

Essentially, what this block of code does is determine what other origins can make AJAX requests to the API.

  - The `origins` on line 10 is where you can put what external origins you want to allow to make AJAX requests
  	- You would just put the URL of the origin(s), for example `localhost:3001`
	- If you want to put more than one URL, just separate them with commas e.g. `origins 'example.com', 'localhost:3001'`
	- Alternatively, you can also just put `*` like we did, which means _any_ origin. Of course, that's not the safest, but it is certainly the most convenient during development

  - The `resource` on line 12 refers to what files you want to allow access to
  	- the headers refers to the headers when making an AJAX request
	- the methods refers to what methods you want to allow

As you can see, you can customize the cors configuration a lot! For now though, I would suggest leaving the resource/headers/methods alone since we want to use all the methods and all the files. And for this build, again I would suggest just leaving origins as * since we're just in development and not deploying this anywhere.

## Manipulating Our Data

Alright, with that out of the way let's get back to react land!

Now that we succesfully made an AJAX call to our API, let's deal with the data before we save it to the App state. Earlier, we determined that we want our data to be separated into two different arrays.

First, let's update our state with empty variables for those two different arrays

```js
this.state = {
	currentView: 'todo',
	completedTasks: [],
	todoTasks: [],
}
```

Now, let's write a function called `sortTasks` that'll take in our task data as an argument and separate them depending on the `completed` boolean.

```js
sortTasks(tasks) {
  // default counter variables
  let completedTasks = []
  let todoTasks = []
  // counter loop
  tasks.forEach((task) => {
    // if task is completed, push it to the completedTasks array
    if(task.completed) {
      completedTasks.push(task)
    } else { // otherwise, push it to the todoTasks array
      todoTasks.push(task)
    }
  })
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.sortTasks = this.sortTasks.bind(this)
  ```

 </p></details>

 <br/>

Great, that method separates our tasks into two arrays, but we didn't set our state with it! Let's create another function called `setTasks` that'll accept the two arrays as arguments to handle that.

```js
setTasks(completed, todo) {
	this.setState({
		completedTasks: completed,
		todoTasks: todo
	})
}
```

<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>

   ```js
  this.setTasks = this.setTasks.bind(this)
  ```

 </p></details>

 <br/>
 
Cool! Now, back in our `sortTasks` method, let's call the `setTasks` method and pass in our two arrays

```js
this.setTasks(completedTasks, todoTasks)
```

And finally, in our `fetchTasks` method, let's call on the `sortTasks` method and pass in our jsoned data

```js
this.sortTasks(jData)
```

Whew! That was a lot of code without much testing, so let's do that now by checking the state in our React console

<details><summary><strong>What success looks like</strong></summary><p>

![](https://i.imgur.com/04UjJ8N.png)

</p></details>

<br>

Great! We were able to fetch our data, manipulate it, and set it in the App state. But... if you didn't comment out the `this.fetchTasks()` line in your render method, you'll notice the React console is acting a little weird when we look at the state. And if you look at your rails server tab in terminal, you'll also notice that our app is making an AJAX request over and over and over again. Uh-oh, that's not at all what we want. Let's fix that!

## React life cycles

The reason our app makes a bunch of calls every second is because the `render()` method runs every time `setState` is called. So, since after the first render we call on `setState`, render runs again, thus `setState` gets called again, thus render runs again, thus -- you get the point, an infinite loop happens. We don't want that at all! So, where should we call on `this.fetchTasks()` if we want it to run right after the App loads?

### `componentDidMount`

We'll be using a built in react method `componentDidMount()`. It's what's called a react life cycle, which you can read about in more detail on the React docs [here](https://reactjs.org/docs/state-and-lifecycle.html).

For sake of time, we won't talk much about life cycles today. All you need to know for now is that `componentDidMount()` is a method that runs after the component that it's in fully renders to the DOM. In other words, it runs _after_ the `render()` method runs for the first time.

>_NOTE:_ Unlike `render()`, the `componentDidMount()` life cycle will **only run once** after the initial render.

So let's go ahead and throw that method into our App and call on `this.fetchTasks()` in there instead of the render method!

```js
componentDidMount() {
	this.fetchTasks()
}
```

Wonderful, now our React console isn't acting weird and if you check your rails console, it shouldn't be making infinite calls to the API anymore as well! Now, let's finally get on with displaying our data.

## Displaying Our Data

Let's start with the Header first. The only thing we need to know about the data in the Header is how many completed tasks there are and how many todo tasks there are. In other, more javascripty words, we need to know the length of the `completedTasks` and `todoTasks` arrays in our state. So, let's pass that information down into our header as props:

###### In `App.js` render method where we rendered Header

```jsx
<Header
  currentView={this.state.currentView}
  handleView={this.handleView}
  todoCount={this.state.todoTasks.length}
  completedCount={this.state.completedTasks.length}
/>
```

Now let's display that information in our header navigation!:

###### In `Header.js` render method where we made our navigation

```jsx
{/* TODO */}
  <li onClick={() => {this.props.handleView('todo')}}>
    {this.props.todoCount} TODO
  </li>
{/* COMPLETED */}
  <li onClick = {() => {this.props.handleView('completed')}}>
    {this.props.completedCount} COMPLETED
  </li>
```

Great! Now, let's move onto the TaskList. We need all the information about the tasks there, so instead of just the length, we need to pass both the entire arrays down as props into TaskList:

###### In `App.js` render method where we rendered TaskList

```jsx
<TaskList
  currentView={this.state.currentView}
  todoTasks={this.state.todoTasks}
  completedTasks={this.state.completedTasks}
/>
```

Now that our TaskList has the data, we can map them all out as individual Tasks. Remember, we want two different views for our TaskList, one for completed and one for todo. Don't forget to pass down the task data into Task as well, since that's where all the individual task information will be displayed!

###### In `TaskList.js` render method

```jsx
{ this.props.currentView === 'todo' ?
    <div>
      { this.props.todoTasks.map((task, index) => {
	return (
	  <Task
	    key={index}
	    task={task}
	  />
	)
      })}
    </div> :
    <div>
      { this.props.completedTasks.map((task, index) => {
	return (
	  <Task
	    key={index}
	    task={task}
	  />
	)
      })}
    </div>
  }
```

We're almost there! Now, we're displaying the correct amount of tasks in both the views, but all our tasks still say "this is the task component". Not the most helpful, so let's go ahead and change that! While we're at it, let's also add the styling needed.

###### In `Task.js` render method

```jsx
<div className="task-item">{this.props.task.task_item}</div>
<div className="task-actions">
	{ this.props.task.completed ?
		<i className="incomplete far fa-check-square"></i> :
		<i className="complete far fa-square"></i>
	}
	<i className="delete far fa-trash-alt"></i>
</div>
```

Whew! That was a lot of work, but we're done displaying all our current data. Let's work on being able to create new data next!

---

**PREVIOUS:** [SETTING UP THE VIEWS](4_Setting_Up_The_Views.md)<br/>
**NEXT:** [CREATING NEW DATA](6_Creating_Data.md)
