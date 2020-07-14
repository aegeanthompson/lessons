# Integrating React w/Rails - Part 2: Fetching and Displaying Data

### Lesson objectives

_After this lesson, students will be able to:_

  - Fetch data from the rails backend
  - Display said fetched data

## An Overview

Now that our starter code is all set up, we can start working in our actual data! Before we just jump right into it, let's plan how we want to deal with and display our data.

### Where do we want our data?

- **Post**: of course, since this is the component that is going to actually display the data of each _individual_ post
- **Form**: actually needs access to the data as well, because how else are we going to update or add to the dataset?

### Where do we want to fetch and save our data?

Knowing that, where do you think we should fetch our data? Which component's state should hold all the data?

As we saw in our flowchart, the `Main` component encompasses both the `Form` and `Post` components, and no other component deals with the post data. So, it makes the most sense to save our data to `Main`.

Saving our data to `Main` is the best choice because:

- It allows us to `.map` all the data into individual `Post` components
- Our `Form` needs access to the data as well

## Fetching our Data

You've already learned how to use fetch for making AJAX requests from a third-party API. Surprise, surprise -- we can use that exact method to fetch data from our backend as well.

### Using `fetch` with our backend

If you recall from the AJAX lesson, the syntax for using fetch is:

```js
fetch('API URL HERE')
  .then(data => data.json())
  .then(jsonedData => {
    // do whatever you want with the data here
  })
  .catch(err => console.log(err))
```

That's exactly what we'll use here as well. Since we're building our frontend and backend all on one server like we did for all the previous units, our API URL would just be the the routes we made for our backend. i.e. `/api/posts`

So, let's use that and write a method in the `Main` component to fetch our posts

### Writing our fetch method

For this method, we want to

- Fetch our posts from the database
- Save the jsoned data in the Main's state

**In `Main.js`:**

_Creating State_

```js
constructor(props) {
  super(props)
  this.state = {
    posts: []
  }
}
```

_Creating The Fetch Method_

```js
fetchPosts = () => {
  fetch('/api/posts')
    .then(data => data.json())
    .then(jData => {
      this.setState({posts: jData})
    })
}
```

Cool! So, now, where do we actually call this method? We want the posts to load immediately on page load, we don't want the user to have to click something to display it. But we can't just call `this.fetchPosts()` inside the component, so where do we call it?

We _could_ call it inside the `render()` method. However, if you try it, you'll notice that the app will make an AJAX request over and over and over again, getting you stuck in an infinite loop.

The reason this happens is because the `render()` method runs every time setState is called. So, since after the first render we call on setState, render runs again, thus setState gets called again, thus render runs again, thus -- you get the point, an infinite loop happens. We don't want that at all!

So, if we want it to run right after the App loads but we can't call it in `render`, then where?

## React Life Cycles

### `componentDidMount`

We'll be using a built in react method `componentDidMount()`. It's what's called a react life cycle, which you can read about in more detail on the React docs [here](https://reactjs.org/docs/state-and-lifecycle.html).

For sake of time, we won't talk much about life cycles today. All you need to know for now is that `componentDidMount()` is a method that runs after the component that it's in fully renders to the DOM. In other words, it runs _after_ the `render()` method runs for the first time.

>_NOTE:_ Unlike `render()`, the `componentDidMount()` life cycle will **only run once** after the initial render.

So let's go ahead and throw that method into our Main and call on `this.fetchPosts()` in there.

```js
componentDidMount() {
  this.fetchPosts()
}
```

If we check our React console, we can see that our data was successfully saved to the Main's state.

## Displaying Our Data

Now that we have our data, we can get to displaying it. Let's map out all our data and return a `Post` component for each individual post

#### In `Main.js` render method

```jsx
render () {
  return (
    <main>
      {this.state.posts.map((postData) => (
        <Post
          key={postData.id}
          postData={postData}
        />
      ))}
    </main>
  )
}
```

Now let's actually get the correct data showing

#### In `Post.js` render method

```jsx
render () {
  return (
    <article>
      <div className="post-header">
        <img src={this.props.postData.image} alt=""/>
        <h1>{this.props.postData.name} said...</h1>
      </div>
      <div className="post-body">
        {this.props.postData.body}
      </div>
      <div className="post-options">
        <ul>
          <li>edit post</li>
          <li>delete post</li>
        </ul>
      </div>
    </article>
  )
}
```

---

**PREVIOUS**: [AN OVERVIEW AND SETUP](1_Intro_to_Integrating_React_w_Rails.md) <br/>
**NEXT**: [HANDLING VIEWS](3_Handling_Views.md)
