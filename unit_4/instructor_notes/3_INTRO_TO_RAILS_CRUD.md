# Intro to Rails
## Finish our CRUD routes

## Create a show route

In `config/routes.rb`:

```ruby
get '/people/:id', to:'people#show'
```

This is a get route for `/people/:id`
It will trigger the show method in the PeopleController, which is in the `app/people_controller.rb` file

---

We need to get some data from our database to show

In `app/models/person.rb`:

```ruby
def self.find(id)
    results = DB.exec("SELECT * FROM people WHERE id=#{id};")
    return {
        "id" => results.first["id"].to_i,
        "name" => results.first["name"],
        "age" => results.first["age"].to_i,
    }
end
```

In `app/controllers/people_controller.rb`

```ruby
def show
    render json: Person.find(params["id"])
end
```

Visit: http://localhost:3000/people/4



## Create a create route

In `config/routes.rb`:

```ruby
post '/people', to: 'people#create'
```

In `app/models/person.rb`:

```ruby
def self.create(opts)
    # We'll use a HEREDOC to make our SQL statement multi-lines for ease of reading
    results = DB.exec(
        <<-SQL
            INSERT INTO people (name, age)
            VALUES ( '#{opts["name"]}', #{opts["age"]} )
            RETURNING id, name, age;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "name" => results.first["name"],
        "age" => results.first["age"].to_i,
    }
end
```

**NOTE:** we'll add `RETURNING id, name, age` so that we get back the element that was created.  Normally it gives us an array with just one element, so we'll need to adjust `results.first`

In `app/controllers/people_controller.rb`:

Ruby has some built in security. We're going to circumvent it for the moment. [Nice and Quick Summary on Stack Overflow](https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token)

```ruby
# at top of controller
skip_before_action :verify_authenticity_token

# further down
def create
    render json: Person.create(params["person"])
end
```


# Test our Create Route Using Postman

Open Postman

Set up a POST to `localhost:3000/people`

We'll be sending in our data a bit differently than we did with our express apps.

For the `body` of our request, we have to choose `raw` and `JSON(application/json)`

Then we'll send in an object. Be sure to use double quotes on the key values as well as the properties

![Postman create](https://i.imgur.com/ECSWn1i.png)

Send a get request to /people to see our new addition

## Create a delete route

In `config/routes.rb`:

```ruby
delete '/people/:id', to: 'people#delete'
```

In `app/models/person.rb`:

```ruby
def self.delete(id)
    results = DB.exec("DELETE FROM people WHERE id=#{id};")
    return { "deleted" => true }
end
```

In `app/controllers/people_controller.rb`:

```ruby
def delete
    render json: Person.delete(params["id"])
end
```

TEST IT!

![Postman Successful Delete](https://i.imgur.com/DPGbWpG.png)

Goodbye Saffron!

## Create an update route

In `config/routes.rb`:

```ruby
put '/people/:id', to: 'people#update'
```

In `app/models/person.rb`:

```ruby
def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATE people
            SET name='#{opts["name"]}', age=#{opts["age"]}
            WHERE id=#{id}
            RETURNING id, name, age;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "name" => results.first["name"],
        "age" => results.first["age"].to_i,
    }
end
```

In `app/controllers/people_controller.rb`:

```ruby
def update
    render json: Person.update(params["id"], params["person"])
end
```

Test it in Postman

![Postman update](https://i.imgur.com/kQD7sIY.png)
