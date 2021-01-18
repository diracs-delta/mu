class Album < ApplicationRecord
  has_many(:songs, dependent: :destroy)
  belongs_to(:artist)
  has_one_attached(:art)
end
