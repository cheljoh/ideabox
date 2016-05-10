require "rails_helper"

RSpec.feature "UserDeletesAnIdea", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user deletes an idea", js: true do
    make_ideas

    visit "/"

    idea = Idea.first

    wait_for_ajax

    expect(page).to have_css(".card-content", count: 5)

    expect(page).to have_content(idea.title)
    expect(page).to have_content(idea.body)

    within("#idea-#{idea.id}") do
      click_on "Delete"
    end

    wait_for_ajax

    expect(page).to have_css(".card-content", count: 4)

    expect(page).to_not have_content(idea.title)
    expect(page).to_not have_content(idea.body)
  end
end
