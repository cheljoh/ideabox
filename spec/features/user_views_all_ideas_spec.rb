require "rails_helper"

RSpec.feature "UserViewsAllIdeas", type: feature do
  include SpecHelpers

  scenario "user views all ideas" do
    make_ideas
    idea1 = Idea.first
    idea2 = Idea.last

    visit "/"

    expect(page).to have_content(idea1.title)
    expect(page).to have_content(idea1.body)
    expect(page).to have_content(idea2.title)
    expect(page).to have_content(idea2.body)

    save_and_open_page
  end
end
