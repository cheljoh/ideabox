require "rails_helper"

RSpec.feature "UserViewsAllIdeas", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user views all ideas which are sorted chronologically", js: true do
    make_ideas
    idea1 = Idea.first
    idea2 = Idea.last

    visit "/"

    wait_for_ajax

    within("#idea-#{idea2.id}") do
      expect(page).to have_content(idea2.title)
      expect(page).to have_content(idea2.body)
    end

    within("#idea-#{idea1.id}") do
      expect(page).to have_content(idea1.title)
      expect(page).to have_content(idea1.body)
    end

    expect(page).to have_css(".card-content", count: 5)
  end
end
