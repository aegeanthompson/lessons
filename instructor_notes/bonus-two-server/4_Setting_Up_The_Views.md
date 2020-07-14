# Integrating React w/ a Rails Backend - Part 4: Setting Up the Views

![](https://imgur.com/wemQVTg.png)

### Lesson objectives

_After this lesson, students will:_

  - Be able to toggle between the todo and completed list views

## An Overview

For our todo build, we'll have 2 different views: the todo list and the completed list.

The general component format of the two views are the same, they both still have the header, form, and task list displayed. The differences between the two happen within what's being rendered inside those components.

#### THE DIFFERENCES

  - **Header**: the title in the header changes between "todo list" and "completed list"
  - **TaskList**: the tasks being rendered are different based on whether the task is completed or not

So let's get that going! Since we have no data yet, for now we'll just render different text in the TaskList.

### How to switch between views

#### ANGULAR VS. REACT

Similar to the frontend apps we built with Angular, React on its own creates single page apps. In angular, the way we made our apps look like multi-page apps was usually by using a lot of ng-if's in our HTML and having global variables in the angular controller to use in those ng-if statements.

For react apps, we utilize that same general logic, just in a different way. Instead of ng-if in our HTML, we use ternary operators. And instead of global variables in a controller, we utilize state. So, let's go ahead and set up some state!

> _EXTRA NOTE:_ Another way to handle views and make your app more like a multi-page app with actual different URL's is to use something called [React Router](https://reacttraining.com/react-router/). It's definitely worth looking into when you have a lot of views, but for the sake of time and because our app is very small and only has 2 views we won't be looking into it during class.

## Setting Up Our View State

Before we begin, let's plan a little bit more.

### Where should we set up state?

We already determined above that there are two components where the view will toggle: the header and the tasklist. We also know that the way we're going to toggle between the two views is by some navigation 'links' in the header.

So, knowing all that, where would it make the most sense to set up state? Let's discuss all the options

#### ❌ OPTION 1: SETTING UP STATE IN BOTH COMPONENTS

If we were to set up state in both the individual components, we'd have to update 2 different states each time we toggle a view. That's not thinking in react and it would require a lot of passing data around that would just get confusing and unruly.

#### ❌ OPTION 2: SETTING UP STATE IN THE HEADER COMPONENT

Your next thought might be to set it up in just the Header component since that's where the toggling event will initially be set off. That could work for changing the title text in the header, but... what about the TaskList?

The Header doesn't encompass the TaskList component, it's completely separate from it so you'd have to pass the Header's state information up to the App component somehow and then pass it down into the TaskList. Again, that would probably require a lot of extra data being passed around and would be unruly.

#### ✅ OPTION 3: SETTING UP STATE IN THE APP COMPONENT

If you think about it, setting up state in the app component makes the most sense. Remember that in react, data flows down.

Our App component encompasses _both_ the Header and TaskList, so it makes the most sense for us to set up the view state in the App component because it can simply pass down the state to both components. The Header won't rely on the TaskList and the TaskList won't rely on the Header, they'll both rely solely on the parent App's state.

### Setting up state in our App

So, let's just get to it! First, set up state in our App class like usual:

```js
constructor(props) {
  super(props)
  this.state = {

  }
}
```

The way I'm thinking I want to toggle between views is by checking if a variable is equal to 'todo' or 'completed'. So let's go ahead and create a state variable called `currentView` and set the default to `todo` since that's likely the view that the user wants to see when they initially load the app. Now, our state should look like so:

```js
constructor(props) {
  super(props)
  this.state = {
    currentView: 'todo'
  }
}
```

### Passing state down to the relevant components

Now that we have state set up, we can pass them down where needed! Again, we already established that the two components that will depend on views are the Header and Tasklist, so let's pass down the currentView state as a prop to both:

#### THE HEADER COMPONENT IN OUR APP:

```jsx
<Header
  currentView={this.state.currentView}
/>
```

#### THE TASKLIST COMPONENT IN OUR APP:


```jsx
<TaskList
  currentView={this.state.currentView}
/>
```

### Checking the React console

We've set up a few things, but nothing has changed in our browser so it feels a little like we're coding blind. That's never good practice, remember to check as often as you can that your code is running correctly! Even though nothing's changed on the browser yet, we can check view the React console!

<details><summary><strong>Check that your App has state</strong></summary><p>

  It should look a little like:

  ![](https://i.imgur.com/JkEFXkJ.png)

</p></details>

<details><summary><strong>Check that your Header and TaskList have props</strong></summary><p>

  I only show the Header here, but your TaskList should look similar to it:

  ![](https://i.imgur.com/QMKdXcy.png)

</p></details>

## Toggling the Views

Now that we have state set up, we can actually add the toggling functionality. Remember, the way we want the user to be able to switch between views is by navigation links in the Header. So, let's go ahead and set up our Header!

### Setting up the Header

While we're at it, let's just add all the little extra styling for the Header as well.

#### THE TITLE

We want our title in as an `h1` and to toggle depending on the views.

  - If the `currentView` is `todo`, we want it to say TODO LIST
  - Otherwise (if the `currentView` is `completed`) we want it to say COMPLETED LIST
  - Based off the mockup, there's also a subtitle in an `h2`, so let's set add that as well
    - The subtitle stays the same regardless of the view, so just keep it static!

```jsx
<div className="title">
  <h1>
    { this.props.currentView === 'todo' ? 'TO DO LIST' : 'COMPLETED LIST' }
  </h1>
  <h2>yes, another one...</h2>
</div>
```

> _STYLE NOTE:_ Why did I wrap it inside of a div with a class of title? Styling purposes and I used flex to get the title/subtitle and the navigation on opposite sides, so our title and subtitle need to be wrapped in one `div`, and our navigation will be wrapped in a `ul`!

#### THE NAVIGATION

If you look at the mockup, we count how many todo and completed there are, but we have no data yet. So, for now, we'll just have them say TODO and COMPLETED. We'll also add on the click functionality later on, so keep it static for now:

```jsx
<ul>
  <li>TODO</li>
  <li>COMPLETED</li>
</ul>
```

### Setting up the TaskList

Our TaskList is a little more complex than the header since it will depend on the actual data from our API as well as the current view. But for now, we'll just set it up so that...

  - If the `currentView` is `todo`, display some text that says "this is the todo list view"  
  - Otherwise (if the `currentView` is `completed`) display some text in a div that says "this is the completed list view"

Again, that's not anywhere near what we want later on, but we just want to make sure that we set up our ternary correctly to toggle between views.

```jsx
  { this.props.currentView === 'todo' ?
    <div>"this is the todo list view"</div> :
    <div>"this is the completed list view"</div>
  }
```

### Setting up the click handler `handleView`

Now that our ternaries are set up, we can add the onClick and write the handler to toggle between views!

What we want to happen is:

  - When the user clicks on the TODO link, our state `currentView` should be `todo`
  - when the user clicks on the COMPLETED link, our state `currentView` should be `completed`

First, let's write a handler that'll handle the `currentView` state  

#### IN THE APP CLASS SOMEWHERE ABOVE THE RENDER:

```js
handleView(view) {
  this.setState({ currentView: view })
}
```

> _HOW IT WORKS:_ handleView takes in an argument, then updates the `currentView` state to equal that argument


<details><summary><strong>Don't forget to <code>.bind(this)</code> method in the constructor!</strong></summary><p>
  
  ```js
  this.handleView = this.handleView.bind(this)
  ```
  
</p></details>

<br/>

Now that we have a handler, we have to pass it down to the Header since that's where the `onClick` event will actually happen

#### IN THE APP CLASS WHERE WE RENDER HEADER

```jsx
<Header
  currentView={this.state.currentView}
  handleView={this.handleView}
/>
```

Now that the handler's been passed down the our Header, we can actually use it with an `onClick` in our navigation like so:

#### IN THE HEADER WHERE WE RENDER OUR NAVIGATION UL/LI

```jsx
<ul>
  {/* TODO */}
  <li onClick={() => {this.props.handleView('todo')}}>
    TODO
  </li>
  {/* COMPLETED */}
  <li onClick = {() => {this.props.handleView('completed')}}>
    COMPLETED
  </li>
</ul>
```

> _HOW IT WORKS:_ we passed in either `todo` or `completed` as arguments to `handleView` depending on what link is being clicked so that when `handleView` updates state, it'll always either be `todo` or `completed`, which is what we based our ternary expressions on.

Great, now our views should toggle! Let's move on to displaying some of our data.

---

**PREVIOUS:** [SETTING UP OUR SERVER WITH STATIC FILES](3_Setting_Up_The_Frontend_Server.md)<br/>
**NEXT:** [GETTING AND DISPLAYING OUR DATA](5_Getting_And_Displaying_Data.md)
