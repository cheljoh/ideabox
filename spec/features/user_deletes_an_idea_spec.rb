require "rails_helper"

RSpec.feature "UserDeletesAnIdea", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user deletes an idea", js: true do
    pending
    make_ideas

    visit "/"

    idea = Idea.first

    wait_for_ajax

    expect(page).to have_css(".card-content", count: 5)

    within("#idea-#{idea.id}") do
      click_on "Delete"
    end

    wait_for_ajax

    expect(page).to have_css(".card-content", count: 4)
  end
end
