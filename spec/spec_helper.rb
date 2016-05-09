require "simplecov"

module SpecHelpers

  def make_ideas
    Idea.create(title: "hello", body: "this is pretty cool")
    Idea.create(title: "hi", body: "you are cool")
    Idea.create(title: "whoa", body: "life is awesome")
    Idea.create(title: "neat", body: "I love everyone")
    Idea.create(title: "haiii", body: "I am the best")
  end

end

# module WaitForAjax
#   def wait_for_ajax
#     Capybara.default_max_wait_time = 10
#     Timeout.timeout(Capybara.default_max_wait_time) do
#       loop until finished_all_ajax_requests?
#     end
#   end
#
#   def finished_all_ajax_requests?
#     page.evaluate_script('jQuery.active').zero?
#   end
# end

RSpec.configure do |config|
  # config.include WaitForAjax, type: :feature
  config.expect_with :rspec do |expectations|

    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  SimpleCov.start("rails")
end
