# Integrating React w/ a Rails Backend - Part 3: Setting Up the Frontend Server w/ Static Files

![](https://imgur.com/pEwX8oV.png)

### Lesson objectives

_After this lesson, students will:_

  - Have the bare bones of the frontend server for our todo list app all set up

## An Overview of the Build

Before we jump into it, let's take a quick look at what we're going to build and talk about our plan of attack.

### About the app

We'll be building a very simple todo app that allows you to...

  - Create tasks
  - Complete a task, moving it from the todo list to the completed list
  - 'Uncomplete' a task, moving it from the completed list to the todo list
  - Toggle between two views: todo list, completed list
  - Delete tasks, regardless of which list it's in
  - See how many todo tasks and how many completed tasks you have

<details>
  <summary><strong>See a mockup of the app</strong></summary>
  <img src="https://imgur.com/NUTZBnW.gif">
</details>

### File organization

The API we're working with is only one model, tasks, so our app will be relatively small -- but we'll still be breaking it down into components! Breaking your files and functionality into separate components makes files easier to manage and read through, so it's best to get into the habit of it now.

We'll be breaking our app down into 4 components aside from the main App one:

  - **Header:** the main header, where we can toggle between the todo and completed views
  - **Form:** the form to create a new task
  - **Task List:** where we render either the todo list or completed list views
  - **Task:** each individual task and their accompanying actions (the buttons to un/complete, delete them)

### The App Component

The app component is where a lot of the heavy lifting will be done as it is the main parent component that we lift state up to. This is where the main state will be held as well as all our AJAX fetch request methods and a bunch of handler methods to change the state.

The app component will also encompass 3 of our 4 components:

  - Header
  - Form
  - Task List (the task list will encompass our Task component)

We'll build those components as static components first, then import them into our App component and render them!

## Setting Up With `create-react-app`

Remember, we're going to have 2 separate servers, so make sure you keep your rails API server running! We'll need that when we make AJAX requests to it later on. Now, to set up our frontend server...

  - open up a new tab and cd back out into the `todo-app` directory so that you're no longer in the api's directory
  - run `npx create-react-app todo-frontend`
  - `cd todo-frontend`
  - because we're working inside the class repo, `rm -rf .git` since we don't want gitception to happen!
    - **REMEMBER:** when you're creating your own projects outside of the class repo, you _do not_ want to remove git! only remove git when you're already working in another git repo
  - `npm start` to make sure it runs fine
    - **NOTE:** remember that we still have our rails server running, so you may have conflicting ports. but worry not because react covers you there, so if they ask if you want to switch ports, say yes! only react does this prompting, not rails, so in the future make sure you always start your rails server first _before_ the react server

### Getting Rid Of Unecessary Things

`create-react-app` does a lot of nice things for us and it's definitely much slimmer than rails, but there are still a few things that we don't need. So, let's get rid of that to slim down our file structure and files themselves!

#### DELETE

  - `App.css`
  - `logo.svg`

#### CLEAN UP FILES

Once you delete those two files, you'll get some errors in the browser, so let's get rid of that, as well as a few other unecessary lines of code

`App.js` in particular starts off with a few things that we don't need

  <img src="https://i.imgur.com/ToAMgSo.png"/>

#### LET'S GO AHEAD AND DELETE...

  - line 2: where they import the logo.svg file we deleted
  - line 3: where they import the App.css file we deleted, we'll just use index.css
  - lines 9 through 22: where they put starter code in the render to show you're on react, replace it with something like `hello world` to just make sure it still renders correctly

Now your react app should run perfectly fine, and with less clutter!

### Adding Style

To save us time and to also give us a decent app to look at as we build throughout the day, I wrote out all the CSS styling for us ahead of time so that all we have to do to get a nice looking app is add the classes. Consider it the Jerrica Todo Framework 😆 Have questions about how I styled something? Feel free to ask me through DM's or during a break!

For now, though, just...

<details><summary><strong>Add into index.css, replace everything create-react-app gave you</strong></summary><p>

  ```css
      /* ==========================
              VARIABLES
      ========================== */
      :root {
        /* colors */
        --main-accent: #D33F49;
        --second-accent: #6689A1;
        --darker-second-accent: #4e6e83;
        /* fonts */
        --regular-font: 'Overpass', helvetica;
        --accent-font: 'Abel';
      }
      /* ==========================
              GENERAL
      ========================== */
      body {
        background: #eeece6;
        font-family: var(--regular-font);
        color: #333;
      }
      /* ==========================
              CONTAINERS
      ========================== */
      .main-container {
        width: 25em;
        margin: 5em auto;
        padding: 10px;
        border-radius: 5px;
        background: white;
        box-shadow: 1px 1px #ddd;
      }
      /* ==========================
              HEADER
      ========================== */
      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .header h1 {
        font-family: var(--accent-font);
        margin: 0;
      }
      .header h2 {
        font-size: 0.8em;
        font-family: var(--accent-font);
        margin: -5px 0;
        color: #888;
      }
      .header ul {
        list-style-type: none;
        margin: 0;
        text-align: right;
        font-size: 0.8em;
        font-weight: 900;
      }
      .header li {
        margin: 5px 0;
        color: var(--second-accent);
      }
      .header li:hover {
        cursor: pointer;
        color: var(--main-accent);
      }
      /* ==========================
              FORM
      ========================== */
      .form {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid var(--main-accent);
      }
      input[type="text"] {
        width: 92%;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #ccc;
        margin-right: 5px;
      }
      input[type="text"]:focus {
        outline: 0;
        border: 1px solid #888;
      }
      .submit-button {
        width: 6%;
        padding: 5px;
        box-sizing: border-box;
        background: #888;
        border: 1px solid #888;
        border-radius: 5px;
        color: white;
        font-size: 0.7em;
      }
      .submit-button:hover {
        cursor: pointer;
        background: #444;
        border: 1px solid #444;
      }
      .submit-button:focus {
        outline: 0;
      }
      /* ==========================
            TASK LIST & TASKS
      ========================== */
      .task-list {
        height: 400px;
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
      }
      .task {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #eee;
        font-family: var(--accent-font);
        font-size: 0.9em;
        text-transform: uppercase;
      }
      .task-item {
        color: var(--darker-second-accent);
      }
      .task-actions i {
        margin: 0px 3px;
      }
      .task-actions i:hover {
        cursor: pointer;
      }
      .incomplete:hover {
        color: orange;
      }
      .complete:hover {
        color: green;
      }
      .delete:hover {
        color: var(--main-accent);
      }
  ```
  </p></details>

<details><summary><strong>Add into index.html, anywhere in the head</strong></summary><p>

```html
<!-- fonts -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Abel|Overpass:300,400,700,900" rel="stylesheet">
```

</p></details>

#### Change the div className in the App component to main-container

![](https://i.imgur.com/1TNxBh9.png)

## Setting Up Our Components  

Let's first create all the component files we need. For organization purposes, let's put all our non-App components into a directory of their own. In your todo-frontend terminal bash tab, run...

  - `mkdir src/components`
  - `touch src/components/Header.js`
  - `touch src/components/Form.js`
  - `touch src/components/Task.js`
  - `touch src/components/TaskList.js`

### The general structure of components

When creating components, they can vary a lot within the class component itself depending on what the component does, but the general structure of the entire file is usually about the same. If you ever forget, just take a look at the generated `App.js` component! That's the pattern we'll be flollowing:

  - importing dependencies (including any components needed) at the top
  - the actual class component itself
  - exporting the component at the bottom

So let's build out super basic components following that three step pattern. We'll start with the `Header`

#### STEP ONE: IMPORTING DEPENDENCIES

Remember, for components we always need React and the Component class, so let's import that:

```js
import React, { Component } from 'react'
```

Based off of what we planned earlier, we don't need to import any components for the Header, so that's all for step one for this component!

#### STEP TWO: WRITING THE CLASS COMPONENT

Write out a class component like you've learned so far! Don't forget that every component _needs_ a render function, so that's all we'll start with first. For now, just return a simple string like 'this is the header component' inside a div with a className of header. Remember, we're only building out static components first to get our file structure going. We'll be adding more functionality later on!

```jsx
class Header extends Component {
  render() {
    return (
        <div className="header">
          this is the header component
        </div>
    )
  }
}
```

#### STEP THREE: EXPORT THE CLASS

Now, all that's left to do is export the component so that we can actually import it elsewhere!

```js
export default Header
```

Great! Before we go ahead and import this component where we need it, let's finish setting up our other three components as well using the same three steps.

<details><summary><strong>Form component</strong></summary><p>

  ```jsx
  import React, { Component } from 'react'

  class Form extends Component {
    render() {
      return (
          <div className="form">
            this is the form component
          </div>
      )
    }
  }

  export default Form
  ```
</p></details>

<details><summary><strong>Task component</strong></summary><p>

  ```jsx
  import React, { Component } from 'react'

  class Task extends Component {
    render() {
      return (
          <div className="task">
            this is the task component
          </div>
      )
    }
  }

  export default Task
  ```
</p></details>

<details><summary><strong>TaskList component - remember, this component needs the Task component!</strong></summary><p>

  ```jsx
  import React, { Component } from 'react'

  import Task from './Task'

  class TaskList extends Component {
    render() {
      return (
          <div className="task-list">
            this is the task list component
          </div>
      )
    }
  }

  export default TaskList
  ```
</p></details>

## Rendering Our Components

Now that all the components our App is going to depend on are all set up, we can start putting our App component together!

### Importing all the components into App.js

If you recall from our planning, our App component only needs three of them: Header, Form, TaskList. So let's go ahead and import just those three near the top of our file!

When importing, remember to watch your pathing. We put all our components into a `components` directory, so we need to account for that like so:

```js
import Header from './components/Header'
import TaskList from './components/TaskList'
import Form from './components/Form'
```

### Using all the components in our render method

Great, now that we've imported our components, we can actually use and render them! If you look back at the mockup, the general format of the app looks like the Header is at the top, followed by the Form, and finally the TaskList (which encompasses each individual task). So, let's go ahead and render the components in that order.

In the `App.js` class:

```jsx
render() {
  return (
    <div className="main-container">
      <Header />
      <Form />
      <TaskList />
    </div>
  )
}
```

Cool! We can now see the Header, Form, and TaskList being rendered. The only thing missing is the Task, but that's a simple fix. It's missing because when we set up our TaskList and imported Task, we didn't actually _render_ the Task. So, let's go ahead and do that.

In the `TaskList.js` class:

```jsx
render() {
  return (
      <div className="task-list">
        <Task />
      </div>
  )
}
```

👍🏽 Sweet, we can see the Task being rendered. We lost the 'this is the task list component', but that doesn't matter because we already know the TaskList component is being rendered through the Task being rendered.

Now that all our files are organized and all of our static components are successfuly rendered where they need to be, we can start adding more functionality!

---


**PREVIOUS:** [SETTING UP OUR API SERVER](2_Setting_Up_Our_API_Server.md)<br/>
**NEXT:** [SETTING UP OUR VIEWS](4_Setting_Up_The_Views.md)
