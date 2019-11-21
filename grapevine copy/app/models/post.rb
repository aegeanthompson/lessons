class Post
  # ===============================
  # SET UP
  # ===============================
  # add attribute readers for instance accesss
  attr_reader :id

  # connect to postgres
  DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'grapevine_development'})

  # ===============================
  # PREPARED STATEMENTS
  # ===============================
  # create post
  DB.prepare("create_post",
    <<-SQL
      INSERT INTO posts (name, image, body)
      VALUES ($1, $2, $3)
      RETURNING id, name, image, body;
    SQL
  )

  # update post
  DB.prepare("update_post",
    <<-SQL
      UPDATE posts
      SET name = $2, image = $3, body = $4
      WHERE id = $1
      RETURNING id, name, image, body;
    SQL
  )

  # ===============================
  # ROUTES
  # ===============================
  # index
  def self.all
    results = DB.exec("SELECT * FROM posts ORDER BY id ASC;")
    return results.map do |result|
      {
          "id" => result["id"].to_i,
          "name" => result["name"],
          "image" => result["image"],
          "body" => result["body"],
      }
    end
  end

  # show
  def self.find(id)
    # query to find the posts
    results = DB.exec("SELECT * FROM posts WHERE id=#{id};")
    # if there are results, return the hash
    if !results.num_tuples.zero?
      return {
        "id" => results.first["id"].to_i,
        "name" => results.first["name"],
        "image" => results.first["image"],
        "body" => results.first["body"]
      }
    # if there are no results, return an error
    else
      return {
        "error" => "no such post, check the id!"
      }, status: 400
    end
  end

  # create
  def self.create(opts)
    results = DB.exec_prepared("create_post", [opts["name"], opts["image"], opts["body"]])
    return {
      "id" => results.first["id"].to_i,
      "name" => results.first["name"],
      "image" => results.first["image"],
      "body" => results.first["body"],
    }
  end

  # delete
  def self.delete(id)
    results = DB.exec("DELETE FROM posts WHERE id=#{id};")
    return { "deleted" => true }
  end

  # update
  def self.update(id, opts)
    results = DB.exec_prepared("update_post", [id, opts["name"], opts["image"], opts["body"]])
    return {
      "id" => results.first["id"].to_i,
      "body" => results.first["body"],
      "name" => results.first["name"],
      "image" => results.first["image"]
    }
  end

end
