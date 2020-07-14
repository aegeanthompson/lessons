# Integrating React with Rails - Part 1: Rails API

![](https://imgur.com/CVn8dD0.png)

### Lesson objectives

_After this lesson, students will:_

  - Understand the benefit of serving the rails backend as just an API for a frontend to consume
  - Know how to set up a rails project as an API only server

## Running Two Servers (?! 😱)

For all our past units, when creating apps we always integrated our back and front ends on one Express server. All you had to do was run the Express server and it would serve up both the back and frontend on a single port. For this unit, however, to integrate our back and front ends, we'll actually be running _two servers_ at once. Thus, we'll have:

  - One server for the backend (provides the API)
  - A separate server for the frontend (consumes the API)

### Rails as an API

In order to run two different servers, instead of having a public folder or any frontend stuff associated with our Rails server, we will leave our Rails server untouched by any frontend code. It will _just_ be an API that serves JSON.

We will then create another server later on to consume the API to create the frontend.

### Why run two separate servers?

There are many benefits to having your frontend and backend servers separated.

One example is that it makes it easier to separate developers that way as well. Frontend developers will only need to work in the frontend server, and the same for backend developers. This way, there's even less chance of overlapping or getting confused or touching the same files at the same time, etc.

Another example is with a separate backend, the data is its own thing. There is a complete separation of concerns between the data and the display because they are running on separate servers. You can swap out any frontend display and not have to change a single thing on the backend. You can essentially use the backend over and over again for several different frontends as needed. For example, you can have a web browser frontend and a mobile app frontend that can both access the same API data since the backend server is its own separate entity.  

![](https://i.imgur.com/zm4EeFX.png)

## Setting Up a Rails App as an API

In order to create a rails server for the sole purpose of being an API, we have to set it up _just a little bit_ differently than we've done so far.

### Generating a new rails project: the `--api` flag

The first difference starts right at the beginning when you generate the new project.

So far, the terminal command you've been running is: `rails new app_name_here -d postgresql --skip-git`

But, if you know you want to make a rails project that will _just be an API_, you have to add one more flag to that command `--api` like so: `rails new app_name_here --api -d postgresql --skip-git`

#### WHAT DOES THE `--api` FLAG DO?

In essence, it slims your generated Rails app down considerably, removing files, folders, and middleware, etc. that is not needed, primarily things that deal with serving frontend views. Want to know more? Read more [here](https://edgeguides.rubyonrails.org/api_app.html)

#### QUICK REFRESHER ON THE OTHER FLAGS

  - `-d postgresql` sets your database to postgres
  - `--skip-git` skips initializing your rails app as a git repo
  - **REMEMBER:** Only use `--skip-git` when you're creating a rails project within another repo (e.g. your class repo). Otherwise, you _usually_ want to initialize git, so don't add the flag when you do want to initialize your project as a repo!

### Setting up a controller

When the `--api` flag gets rid of a lot of unecessary things from your rails project to serve it as just an API, one of the things it removes is some of the built in security for browser use. In particular, it gets rid of the `verify_authentication_token` method. Since it gets rid of that method, we no longer have to circumvent it at the top of our controller files with `skip_before_action :verify_authentication_token`.

### Then, everything else is the same!

There's just one more thing that we have to configure for the backend to completely work as a consumable API, but we'll cover that in more detail later on in today's build when it comes up.

Otherwise, everything else you've learned to set up a rails full CRUD app still applies!

---

**NEXT:** [SETTING UP OUR API SERVER](2_Setting_Up_Our_API_Server.md)
