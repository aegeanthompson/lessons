# Intro to Rails

![Rails Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png)

## What We'll Be Building

Throughout the week we'll be working on one app.

First, we'll build out the back end, then we'll, take a break, learn some react and then put our back and and front end together!

We'll be building an app that keeps track of contacts.

 **People** will have:
 -  name (string)
 -  an age (integer).

**Locations**
   - where one or more people will be able to live/work.
   - A location can have many people, people (in our app), will have one location

Once we build our back end, we'll move to the front and start building our app with React.

# What is Rails?
[Rails is a server-side web application framework written in Ruby](https://en.wikipedia.org/wiki/Ruby_on_Rails).

#### It features:
- Open Source - free to use, anyone can contribute
- Vast collection of open source code available within Rails community
- MVC framework (Model View Controller)
- RESTful application design
<!-- - Built-in server-side rendering with .erb (**E**mbedded **R**u**B**y) -->
- Built-in ORM (Object Relational Mapping  programming technique for converting
   data between incompatible type systems using OOP.
   - Example: converting data that is in rows/columns/tables into JSON), called Active Record, based on [Active Record Pattern](https://en.wikipedia.org/wiki/Active_record_pattern) **
- Encourages Agile web development
- Strong focus on testing, and utilizing testing for documentation

** Active Record is awesome! But in order for you to get more experience using SQL, we'll be writing our own SQL queries and converting them into objects and arrays that we'll be able to display, first, in the browser as JSON, and then later rendering the data in react.

#### Rails Philosophies:
- DRY (Don't Repeat Yourself)
- Convention over configuration

We've seen a lot of similar things in our previous units. That's because Rails emergence and popularity influenced web development as a whole, and many new frameworks continue to use many of the successful patterns and features that Rails developed.

Something we haven't seen yet, is a new philosophy called `Convention over Configuration`

- Express is a minimalist framework, where you add in each piece of functionality that you need. Therefore you must also configure everything. There are some recommended patterns, but you can really build the app any way you want.

- Rails provides you with tons of functionality. However, in order to utilize this right-out-of-the-box functionality you must follow all of the Rails conventions.
  - This means proper pluralization and capitalization will make or break your app (literally)

#### Express vs. Rails in our course


| Comparison |Express| Rails |Comments |
|:----------:|:-----:|:-----:|:-------:|
|Language|JavaScript| Ruby | Still need JS on the front end|
|Database| MongoDB| Postgres |MongoDB is considered NoSQL, while Postgres is SQL|
|ODM/ORM| Mongoose| ~~Active Record~~ |We'll be writing our own SQL in order to build our SQL skillset|
|Third Party Code|NPM| Gem/ bundler/ bundler install|By default Gems are installed globally by default, npm packages, by default, are local|
|server-side rendering|EJS or Handlebars| ~~[erb](https://www.stuartellis.name/articles/erb/)~~|We'll be skipping right into rendering our views with React|
|run the server |nodemon| rails s| You'll see something called puma running in terminal|



## Set up a new rails project

Let's be sure to make some mistakes along the way to start getting familar with Rails errors.

First set up a new project:

```
rails new contacts -d postgresql --skip-git
```

In English:

Hey `rails` make a `new` project called `contacts` set the database `-d` to `postgresql` and do not initialize this project with `git` (since we're doing this in our class repo, which is already a git repository, we don't want to cause git-ception), so let's `--skip-git` this time

you may need to enter your computer pwd

You can learn more about the `rails new` command by running
`rails new --help`

```
cd contacts
atom .
```

💥💥 Made a mistake typing `rails new`? Just remove the folder that was created and re-run the command. It is far faster to do that than go into the config files and update stuff💥💥

Whoa! 11 folders and 7 files! Everything and the kitchen sink indeed!

![rails file structure](https://i.imgur.com/fIH8YIy.png)

Let's see if we can match up with express:

Open the `app` folder to see `controllers`, `models`,  and `views`

![inside the app folder ](https://i.imgur.com/Pha6qSK.png)

#  

|   |Express| Rails|Comments|
|:-:|:-----:|:----:|:-------:|
|project meta-data| package.json | Gemfile | Rails 5.x has a `package.json` by default as well, but that's for extra stuff, not the main meta-data file|
| Server | Express | Puma/Rack |Puma is the server, Rack deals with the middleware, these are configured and arranged pretty differently from Express, so you won't see a `server` file in the root|
|Controllers| controllers | app/controllers | part of MVC |
| Models | models | app/models | part of MVC |
|Views|we used ejs (handlebars is another common one), but we also used Angular| erb, BUT! We won't use it, when we're ready we'll jump into using React|part of MVC|


---
## Get New Project Running

- `rails s`
 - error in terminal?

 ![rails s error](https://i.imgur.com/aGUaN70.png)

 - make sure to `cd contacts`

Server running successfully:

![rails s works](https://i.imgur.com/CNhfeN5.png)


 Test that http://localhost:3000/ works

 ![forgot to start postgres](https://i.imgur.com/87yDFUJ.png)

- Looks like we forgot to start Postgres
- open a new tab and start postgres
  - in terminal remember it is:

  ```
  postgres -D /usr/local/var/postgres
  ```

- go back to the browser

![No database error](https://i.imgur.com/fWAB5Wj.png)

- We don't have a database set up yet.
- open a new tab so you don't have to stop  `rails s` (later on we'll be making new files and other things so it'll be handy to have an extra tab)
- run `rails db:create`
- you might need to restart `rails s`

![success db:create](https://i.imgur.com/f8Caedy.png)

We did it! We set up our new Rails app!
![Rails Broswer success](https://i.imgur.com/zkHZ9Hv.png)

## Aside
Rails has conventions on how to pluralize and singularize words.

If you would like to check the singular or plural of a word, you can do it by running `rails c` (to quit, type `quit`

![rails c pluralize, singularize ](https://i.imgur.com/RiV71w5.png)
