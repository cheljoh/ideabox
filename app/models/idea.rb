class Idea < ActiveRecord::Base
  validates :quality, inclusion: { in: %w(swill plausible genius) }
end
