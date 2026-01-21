class Courier < ApplicationRecord
  belongs_to :user

  belongs_to :sender, class_name: "Client"
  belongs_to :receiver, class_name: "Client"

  belongs_to :sender_address, class_name: "Address"
  belongs_to :receiver_address, class_name: "Address"

  has_many :courier_items, dependent: :destroy
  accepts_nested_attributes_for :courier_items

  validates :courier_number, uniqueness: true
  before_create :generate_courier_number

  enum :status, {
    shipment_pending: 0,
    in_transit: 1,
    delivered: 2
  }, suffix: true

  enum :payment_mode, {
    direct: 0,
    end_user: 1,
    monthly: 2
  }

  enum :payment_status, {
    pending: 0,
    paid: 1
  }, suffix: true

  private

  def generate_courier_number
    year = Time.current.year
    loop do
      count = Courier.where("courier_number LIKE ?", "CR-#{year}-%").count + 1
      self.courier_number = "CR-#{year}-#{count.to_s.rjust(4, '0')}"
      break unless Courier.exists?(courier_number: courier_number)
    end
  end
end
