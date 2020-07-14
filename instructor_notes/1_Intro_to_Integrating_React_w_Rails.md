# Integrating React w/Rails - Part 1: An Overview and Setup

Today, we will be learning how to put everything we've learned this unit together into one app. We will primarily be focusing on how to get your React frontend to interact with your Rails backend.

### Lesson objectives

_After this lesson, students will:_

  - Understand the basics of integrating React _into_ Rails and interacting with the backend
  - Set up given rails/react starter code

## The Basics

Believe it of not, you've already learned all the tools you'll need for this build

For example, you've already learned...

- [How to put React into a Rails 6.0.0 project](../../w11d02/instructor_notes/1.%20Rails%20and%20React.md)
- [How to use the `fetch` method to get data](../../w11d03/instructor_notes/4.%20React_AJAX.md)
- How to build a Rails API using postgres

So, the majority of the build we'll be doing today will be review and to help you understand how all the pieces fit together.

Let's get started by taking a quick look at what we'll be building first.

# Heard It Through The Grapevine

![](https://imgur.com/v40qrQQ.gif)

## About the app

The app we'll be making is a very simple noticeboard-esque app as shown above. It will allow users to...

- Create posts
- Edit posts
- Delete posts
- See all posts on the index
- Toggle between seeing all posts and seeing the edit or create form

## About the API  

Included in the starter code is a fully working, basic one-model (posts) API for us to use during this integration build. Let's take a look at what's given

### Model: Posts

_Relevant files:_

- `app/models/post.rb`
- `app/controllers/posts_controller.rb`

_Columns:_

- id (SERIAL)
- name (VARCHAR 256)
- image (VARCHAR 256)
- body (TEXT)

### Routes: /api/posts

_Relevant files:_

- `config/routes.rb`

_NOTE:_ Remember, you can always check what routes a rails project has by running `rails routes` in bash

  ```
  Verb   URI Pattern               Controller#Action
  GET    /                         site#index
  GET    /api/posts(.:format)      posts#index
  GET    /api/posts/:id(.:format)  posts#show
  POST   /api/posts(.:format)      posts#create
  DELETE /api/posts/:id(.:format)  posts#delete
  PUT    /api/posts/:id(.:format)  posts#update
  ```

## About the Frontend

Because you've already learned how to set up a React frontend inside of a Rails project, I've gone ahead and included it into today's starter code as well, for the sake of time. If you forgot how to do so or what files were created for it, go  back and look at the previous notes!

The API we're working with is only one model, posts, so our app will be relatively small -- but we'll still be breaking it down into components! Breaking your files and functionality into separate components makes files easier to manage and read through, so it's best to get into the habit of it now.

The starter code has all the component files that we'll need with some basic code that we'll be building upon.

### The Components

  - `App`: the main parent component, will encompass all components below and will handle the state of the views
  - `Header`: just the header, stateless, but nice to separate anyway
  - `Aside`: the sidebar, holds some of the buttons that can toggle between the views
  - `Main`: the main content area, will encompass the form and the posts; the component that will change depending on the view
  - `Post`: the post component, holds all displayed post info
  - `Form`: the form used to create _and_ edit posts! remember, React components are  _reusable_

### The Styling

To save us time and to also give us a decent app to look at as we build throughout the day, I wrote out all the CSS styling for us ahead of time so that all we have to do to get a nice looking app is add the classes. Consider it the (non-responsive) Jerrica Grapevine Framework 😆 Have questions about how I styled something? Feel free to ask me through DM's and I'll answer after the lecture!

_Relevant Files_

- `app/assets/stylesheets/application.css` holds all the css

### The Flowchart

![](https://imgur.com/xRdv5TJ.png)

---

# Setting Up the Starter Code

Now that we know what's actually in our starter code, let's get set up!

- In today's `student_examples`, go into the `grapevine` directory
- Run...
  - `bundle install` to install all the gems
  - `rails db:create` to create the database
  - `rails s` to start the server
  - Then, in your browser, go to https://localhost:3000 to make sure your server is running fine
- In another tab, connect to the `grapevine_development` psql database and...
  - Create the `posts` table:
  ```sql
  CREATE TABLE posts (id SERIAL, name VARCHAR(256), image VARCHAR(256), body TEXT);
  ```
  - You can close down psql now
- Once you're outside of psql, in terminal run...
  - `rails db:seed` to seed the database
- Open https://localhost:3000/api/posts in your browser to make sure your database was seeded correctly

You're now all set with the starter code!

---

# Arrow Functions vs. Function Declaration

Before we get started, I just wanted to talk about one last thing: arrow functions vs. function declarations.

_Reminders_

  - **Function declaration** is when a function is written like
  ```js
  functionName() {
    // function stuff in here!
  }
  ```
  - **Arrow functions** are functions written like
  ```js
  functionName = () => {
    // function stuff in here!
  }
  ```

So far, we've taught you guys to use function declaration when writing methods in your react components. React documentation also shows you to write your methods that way, which is why we chose to show you writing them in that way since it's the classic 'react way'. Writing your methods out that way also makes your code look more consistent since you call the constructor and render methods using function declaration as well.

That said, it's not like you _can't_ use arrow functions inside react components. The main benefit to doing so is that you do not have to `.bind(this)` for every method you write that utilizes `this`.

### Why don't we need to `.bind(this)` when using arrow functions?

The main difference between function declarations and arrow functions in JavaScript are how they treat `this`.

  - **In function declarations**, the value of `this` will refer to the `this` of the function in itself, and therefore will always change depending on where the function is being called
  - **In arrow functions**, the value of `this` will refer to the `this` of the _environment_ that the function itself _resides_ in

In essence, arrow functions `this` will always refer to the same `this`, no matter where the function is being called.

So, for example, if you write arrow functions inside of an `App` component, `this` will always refer to the `this` of the App class, even though we didn't `.bind(this)`

If any of that doesn't quite make sense yet, that's perfectly fine! For our purposes, all you need to know is that if you use arrow functions in React class components, you don't need to .bind(this). Which is what we'll be doing today!

---

**NEXT:** [FETCHING AND DISPLAYING OUR DATA](2_Fetching_and_Displaying_Data.md) 
