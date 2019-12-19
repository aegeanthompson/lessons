# Intro to Rails - Second Model

## Set up CRUD for Locations

#### Mandatory to complete - Matt will continue to build this app with you all week long must have full CRUD on all models to be ready to build tomorrow

Most apps have more than one model. They may have tens or possibly, hundreds!

Models can be unrelated. But often they have relations. Two common ones are `one to many` - for example, a company can have many employees. Another one is `many to many` a contact can have many locations (home, work), and a location can have many people (companies typically have more than one employee, households often have more than one person).

Throughout the next few days, you'll be adding relations to the models. But for today let's practice building out models without relations.

## Getting Started

In `psql` create the table in the same database as what you've been using for the build in class 

```sql
CREATE TABLE locations (id SERIAL, street VARCHAR(255), city VARCHAR(160), state VARCHAR(2));
INSERT INTO locations (street, city, state) VALUES ('718 Dreama Alley', 'East Tawnhaven', 'RI');
INSERT INTO locations (street, city, state) VALUES ('5 Herman Locks', 'Lake Woodbury', 'WY');
INSERT INTO locations (street, city, state) VALUES ('2757 Vernice Knolls', 'Olindaview', 'NV');
INSERT INTO locations (street, city, state) VALUES ('687 Cammy Coves', 'Port Cecelia', 'FL');
INSERT INTO locations (street, city, state) VALUES ('91 Nicky Street', 'Wilmerton', 'MA');
INSERT INTO locations (street, city, state) VALUES ('444 Bogdan Burgs', 'South Lorna', 'NJ');

```

Then, finish building full CRUD for this model! Don't remember how? No worries, look back at the class notes!


<!--
In `config/routes.rb`:

```ruby
get '/locations', to: 'locations#index'
get '/locations/:id', to: 'locations#show'
post '/locations', to: 'locations#create'
delete '/locations/:id', to: 'locations#delete'
put '/locations/:id', to: 'locations#update'
```

Create `app/models/location.rb`:

```ruby
class Location
    # connect to postgres
    DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'contacts_development'})

    def self.all
        results = DB.exec("SELECT * FROM locations;")
        return results.map do |result|
            {
                "id" => result["id"].to_i,
                "street" => result["street"],
                "city" => result["city"],
                "state" => result["state"],
            }
        end
    end

    def self.find(id)
        results = DB.exec("SELECT * FROM locations WHERE id=#{id};")
        return {
            "id" => results.first["id"].to_i,
            "street" => results.first["street"],
            "city" => results.first["city"],
            "state" => results.first["state"],
        }
    end

    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO locations (street, city, state)
                VALUES ( '#{opts["street"]}', '#{opts["city"]}', '#{opts["state"]}' )
                RETURNING id, street, city, state;
            SQL
        )
        return {
            "id" => results.first["id"].to_i,
            "street" => results.first["street"],
            "city" => results.first["city"],
            "state" => results.first["state"],
        }
    end

    def self.delete(id)
        results = DB.exec("DELETE FROM locations WHERE id=#{id};")
        return { "deleted" => true }
    end

    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE locations
                SET street='#{opts["street"]}', city='#{opts["city"]}', state='#{opts["state"]}'
                WHERE id=#{id}
                RETURNING id, street, city, state;
            SQL
        )
        return {
            "id" => results.first["id"].to_i,
            "street" => results.first["street"],
            "city" => results.first["city"],
            "state" => results.first["state"],
        }
    end
end
```

In `app/controllers/locations_controller.rb`:

```ruby
class LocationsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Location.all
    end

    def show
        render json: Location.find(params["id"])
    end

    def create
        render json: Location.create(params["location"])
    end

    def delete
        render json: Location.delete(params["id"])
    end

    def update
        render json: Location.update(params["id"], params["location"])
    end
end
``` -->
