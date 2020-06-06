class Party < ApplicationRecord
  belongs_to :user
  has_many :drinks
  validates :name, presence: true
  validates :user_id, presence: true
end
