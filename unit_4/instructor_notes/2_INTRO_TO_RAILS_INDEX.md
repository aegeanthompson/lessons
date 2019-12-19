

# Intro To Rails Continued

Now that we've got Rails up and running and connected it to our database, we'll start working on CRUD (Create, Read, Update and Destroy)

## Connect to our Database and Show an Index Route (Read)

Open a postgres shell and connect to the `contacts_development` database that rails created for us when we ran `rails db:create`

```bash
psql 
\c contacts_development
```

create table and insert some data:

```sql
CREATE TABLE people (id SERIAL, name VARCHAR(16), age INT);
INSERT INTO people (name, age) VALUES ('Malcolm', 49);
INSERT INTO people (name, age) VALUES ('Kaywinnet', 24);
INSERT INTO people (name, age) VALUES ('Inara', 26);
INSERT INTO people (name, age) VALUES ('Jayne', 44);
INSERT INTO people (name, age) VALUES ('River', 17);
INSERT INTO people (name, age) VALUES ('Simon', 23);
INSERT INTO people (name, age) VALUES ('Zoë', 33);
INSERT INTO people (name, age) VALUES ('Hoban', 38);
INSERT INTO people (name, age) VALUES ('Derrial', 57);
SELECT * FROM people;
```

Our goal will be to render the above data in our browser. Let's get started!

## Create a route

Routes are created differently in Rails than in Express.

Let's make an index route by opening

```bash
config/routes.rb
```

In that file, add:

```ruby
get '/people', to: 'people#index'
# think of this as get('/people', { :to => 'people#index' })
```

This says that whenever a user visits `/people`, use the `People` controller and use the `index` "action" (or method). We may need to code out a bit more for it to all make sense.


## Create a controller

**Important**: Rails is Convention over Configuration - you must be very precise in your naming of things in the Rails way or else stuff just won't work.

Our configured route says to use a `People` controller, but we don't have that yet. Let's create it!

Create a file `app/controllers/people_controller.rb`

Open a new terminal tab for bash (if you don't have one already, you should have one for bash, one for `rails s`, one for `postgres` and one for `psql`- the postgres shell)

- `touch app/controllers/people_controller.rb`

Let's create a `PeopleController` class that's going to inherit from the `ApplicationController`

```ruby
class PeopleController < ApplicationController
end
```

Now let's define what should happen in the index route.
We'll start simple and render some JSON:

```ruby
class PeopleController < ApplicationController
    def index
        render json: { message: 'hi', status: 200 }
    end
end
```

Visit http://localhost:3000/people

Note:
```ruby
# render({ :json => { :message => 'hi', :status => 200 } })
# render json: message: 'hi', status: 200 # doesn't work because nested objects are unguessable
```



## Send an array of objects:

Eventually we'll be rendering our data in React. Our data will be sent over as JSON. Let's send over some sample JSON

in `app/controllers/people_controller.rb`:

```ruby
def index
    render json: [
        { name: 'Darth Vader', age:45 },
        { name: 'Sarah', age:42 },
        { name: 'Cthulhu', age: 8000 }
    ]
end
```

## Create a model

We will want to take our data out of our database and render it.

```bash
touch app/models/person.rb
```

Let's define a Person class:

**app/modles/person.rb**

```ruby
class Person
end
```
Let's define a method `.all` that will return all the people and all their info.

We have to use `self` with our method, so we can call `Person.all`, otherwise we'd have to create an instance and then use the method.

```ruby
class Person
    def self.all # a static function that's called on the class itself, not an instance
    end
end
```

For the moment let's send back some sample data
```ruby
class Person
    def self.all # a static function that's called on the class itself, not an instance
      [ ## ruby functions return the last line of code, so no need for an explicit 'return' statement
          { name: 'Darth Vader', age:45 },
          { name: 'Sarah', age:42 },
          { name: 'Cthulhu', age: 8000 }
      ]
    end
end
```

In `app/controllers/people_controller.rb`

```ruby
def index
    render json: Person.all
end
```

We should see the same data we had before, but now it's coming from the Person.all method, rather than hard-coded in our `people_controller`

## Make a model connect to Postgres

in `app/models/person.rb`:

First let's make sure we can connect to our DB and console our results. We'll leave our return statement (array of people), so our browser won't change yet.  

```ruby
class Person
    # connect to postgres
    DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'contacts_development'})

    def self.all
        results = DB.exec("SELECT * FROM people;")
        results.each do |result|
            puts result
        end
        [
          { name: 'Darth Vader', age:45 },
          { name: 'Sarah', age:42 },
          { name: 'Cthulhu', age: 8000 }
        ]
    end
end
```

Visit http://localhost:3000/people, but check your console:

```
{"id"=>"1", "name"=>"Malcolm", "age"=>"49"}
{"id"=>"2", "name"=>"Kaywinnet", "age"=>"24"}
{"id"=>"3", "name"=>"Inara", "age"=>"26"}
{"id"=>"4", "name"=>"Jayne", "age"=>"44"}
{"id"=>"5", "name"=>"River", "age"=>"17"}
{"id"=>"6", "name"=>"Simon", "age"=>"23"}
{"id"=>"7", "name"=>"Zoë", "age"=>"33"}
{"id"=>"8", "name"=>"Hoban", "age"=>"38"}
{"id"=>"9", "name"=>"Derrial", "age"=>"57"}
```

This is coming from the database! Now let's work on making it appear in our browser

## Return the data from the DB

in `app/models/person.rb` update the `self.all` method to return correct data types.

We'll use the method `.map` that will return a new array

```ruby
def self.all
    results = DB.exec("SELECT * FROM people;")
    return results.map do |result|
        {
            "id" => result["id"].to_i,
            "name" => result["name"],
            "age" => result["age"].to_i,
        }
    end
end
```


Let's check our browser:

![Data coming from the database](https://i.imgur.com/z2PmnWy.png)


### Before Continuing

Organize yourself! We'll be going between the same 3 files.

Suggested:
`people_controller.rb` and `routes.rb` are less verbose, split them, then leave `person.rb` as a full panel.

![project organization](https://i.imgur.com/GLYrxcd.png)
