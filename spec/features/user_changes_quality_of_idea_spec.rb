require "rails_helper"

RSpec.feature "UserChangesQualityOfIdea", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user adds a new idea", js: true do
    pending
    make_ideas

    idea = Idea.first

    visit "/"

    wait_for_ajax

    within("#idea-#{idea.id}") do
      click_on "Upvote!"
      expect(page).to have_content("plausible")
      click_on "Upvote!"
      expect(page).to have_content("genius")
      click_on "Downvote!"
      expect(page).to have_content("plausible")
      click_on "Downvote!"
      expect(page).to have_content("swill")
    end
  end
end
