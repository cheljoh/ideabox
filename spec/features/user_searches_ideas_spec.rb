require "rails_helper"

RSpec.feature "UserSearchesIdeas", type: :feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user searches for an idea", js: true do
    make_ideas

    idea1 = Idea.first
    idea2 = Idea.last

    visit "/"

    wait_for_ajax

    fill_in "filter", with: "hello"

    expect(page).to have_content(idea1.title)
    expect(page).to have_content(idea1.body)

    expect(page).to_not have_content(idea2.title)
    expect(page).to_not have_content(idea2.body)
  end
end
