require "rails_helper"

RSpec.feature "UserAddsANewIdea", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user adds a new idea", js: true do
    make_ideas

    visit "/"

    wait_for_ajax

    fill_in "title-box", with: "New Cool Idea"
    fill_in "body-box", with: "Everyone should wear beanies 100% of the time"

    click_on "Save"

    wait_for_ajax

    idea = Idea.last

    within("#idea-#{idea.id}") do
      expect(page).to have_content("New Cool Idea")
      expect(page).to have_content("Everyone should wear beanies 100% of the time")
    end

    expect(page).to have_css(".card-content", count: 6)
  end
end
