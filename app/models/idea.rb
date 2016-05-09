class Idea < ActiveRecord::Base
  validates :quality, inclusion: { in: %w(swill plausible genius) }
  before_save :truncate_body

  def truncate_body(max=100, elided = ' ...')
    self.body.match( /(.{1,#{max}})(?:\s|\z)/ )[1].tap do |message|
      message << elided unless message.length == self.body.length
      self.body = message
    end
  end
end
