class TodoshkasController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    render json: {
        todoshkas: Todoshka.all
    }, status: :ok
  end

  def create
    todoshka = Todoshka.new(text: params[:text])
    if todoshka.save
      render json: {
          todoshka: todoshka
      }, status: :ok
    else
      render json: {
          message: 'Failed'
      }, status: :bad_request
    end
  end

  def update
    data = params[:data]
    todoshka = Todoshka.find(data[:id])
    todoshka.text = data[:text]
    todoshka.done = data[:done]
    if todoshka.text.length > 0 && todoshka.save
      render json: {
          todoshka: todoshka
      }, status: :ok
    else
      render json: {
          message: 'Failed'
      }, status: :bad_request
    end
  end

  def destroy
    todoshka = Todoshka.find(params[:id])
    if todoshka.destroy
      render json: {
          message: 'Deleted'
      }, status: :ok
    else
      render json: {
          message: 'Failed'
      }, status: :bad_request
    end
  end
end
