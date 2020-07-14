# Integrating React w/ Rails - Part 2: Setting Up Our API Server

![](https://imgur.com/6AUAID7.png)

### Lesson objective

_After this lesson, students will:_

  - Be able to use the given rails API as an endpoint to be consumed by a frontend

## About the API

For the sake of time, I've already set up a basic one-model todo API for us to use during this integration build. Let's take a look at what's given.

### Model: Tasks

  - id (SERIAL)
  - task_item (VARCHAR 255)
  - completed (BOOLEAN)

### Routes: /tasks

  ```
  Verb   URI Pattern           Controller#Action
  GET    /tasks(.:format)      tasks#index
  GET    /tasks/:id(.:format)  tasks#show
  POST   /tasks(.:format)      tasks#create
  DELETE /tasks/:id(.:format)  tasks#delete
  PUT    /tasks/:id(.:format)  tasks#update
  ```

## Set Up

### Setting up terminal

Recommended: close everything, reboot your computer, all extra windows, all terminal tabs etc.

  - open terminal and `cd` into today's `student_examples\todo-app\todo-api` folder (keep bash here)
  - open a new terminal tab for `postgresql`
  - open a new terminal tab for `psql` command line
  - open a new terminal tab for rails s (don't start it yet though!)
    - instead, run `bundle install` first to set up your gems for this project

### Setting up the postgres database

Just in case: on the offchance you already have a database called `todo_development` in your psql database, `dropdb todo_development` first so we can start fresh, then:

  - in bash: `rails db:create`
  - in psql: `\c todo_development`
  - in psql:
```sql
CREATE TABLE tasks (id SERIAL, task_item VARCHAR(255), completed BOOLEAN);
INSERT INTO tasks (task_item, completed) VALUES ('Complete SEIR-Devito', false);
INSERT INTO tasks (task_item, completed) VALUES ('Complete Unit 4', false);
INSERT INTO tasks (task_item, completed) VALUES ('Complete Project 4', false);
INSERT INTO tasks (task_item, completed) VALUES ('Learn Ruby', true);
INSERT INTO tasks (task_item, completed) VALUES ('Learn SQL', true);
INSERT INTO tasks (task_item, completed) VALUES ('Learn Rails', true);
INSERT INTO tasks (task_item, completed) VALUES ('Learn React', true);
```
  - in psql: `SELECT * FROM tasks;` to make sure it was all inserted successfully

#### Now, you should be able to run `rails s` successfully! Make sure to check on localhost:3000

## Testing The Routes

Before we move on to the front end, let's just double check with the browser and postman to make sure all our routes are working correctly!

_NOTE:_ Forgot how to check out what routes are available? Type in `rails routes`!

### Index and show

Test these routes in the browser by going to...

  - Index: `/tasks`
  - Show: `/tasks/1`

For the rest of the routes, we'll have to open up postman

### Create

Try to create this task by using `POST` to `/tasks`. Remember to choose `raw` for body format and `JSON(application/json)` like so:  

![](https://i.imgur.com/ydy3HWf.png)

```js
{
  "task_item": "Learn how to integrate rails and react",
  "completed": false
}
```

### Edit

Try to edit the first task and just change the completed value from false to true. Remember to use `PUT` to `/tasks/1` and choose `raw` for body format and `JSON(application/json)`

![](https://i.imgur.com/1Gr4ij0.png)

```js
{
	"completed": true
}
```

**NOTE:** Uh-oh! If you look at the response after editing, it shows that our boolean did indeed change from false to true, but our task_item changed as well! It disappeared and turned into `null`. We'll have to keep that in mind when we deal with our edit route on the frontend later.

![](https://i.imgur.com/GXiq1Oj.png)

### Delete

For now, though, let's just test our delete route by getting rid of that task! In postman, `DELETE` to `/tasks/1`. If your delete was successful, you should get back the message:

```js
{
    "deleted": true
}
```

---

**PREVIOUS:** [RAILS API](1_Intro_to_Integrating_React_w_Rails.md)<br/>
**NEXT:** [SETTING UP OUR FRONTEND SERVER WITH STATIC FILES](3_Setting_Up_The_Frontend_Server.md)
