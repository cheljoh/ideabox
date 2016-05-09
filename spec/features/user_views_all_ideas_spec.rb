require "rails_helper"

RSpec.feature "UserViewsAllIdeas", type: feature do
  include SpecHelpers

  scenario "user views all ideas which are sorted chronologically" do
    make_ideas
    idea1 = Idea.first
    idea2 = Idea.last

    visit "/"

    within("#idea-0") do
      expect(page).to have_content(idea2.title)
      expect(page).to have_content(idea2.body)
    end

    within("#idea-4") do
      expect(page).to have_content(idea1.title)
      expect(page).to have_content(idea1.body)
    end
  end
end
