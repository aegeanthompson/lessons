class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # index
  def index
    render json: Post.all
  end

  # show
  def show
      render json: Post.find(params["id"])
  end

  # create
  def create
      render json: Post.create(params["post"])
  end

  # delete
  def delete
    render json: Post.delete(params["id"])
  end

  # update
  def update
    render json: Post.update(params["id"], params["post"])
  end
end
