class Party < ApplicationRecord
  belongs_to :user
  has_many :drinks
  validates :name, presence: true
end
