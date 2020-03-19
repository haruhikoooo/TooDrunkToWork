class PartiesController < ApplicationController
  before_action :move_to_login

  def index
  end

  def new
    @party = Party.new
  end

  def create
    Party.create(party_params)
    redirect_to root_path
  end

  private
  def party_params
    params.require(:party).permit(:name).merge(user_id: current_user.id)
  end

  def move_to_login
    redirect_to new_user_session_path unless user_signed_in?
  end
end
