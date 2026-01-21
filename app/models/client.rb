class Client < ApplicationRecord
  belongs_to :user
  has_many :addresses, dependent: :destroy

  has_many :sent_couriers,
           class_name: "Courier",
           foreign_key: :sender_id

  has_many :received_couriers,
           class_name: "Courier",
           foreign_key: :receiver_id

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
end
