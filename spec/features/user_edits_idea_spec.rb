require "rails_helper"

RSpec.feature "UserEditsIdea", type: feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user edits idea", js: true do
    make_ideas

    idea = Idea.first

    visit "/"

    wait_for_ajax

    within("#idea-#{idea.id}") do
      expect(page).to have_content("hello")
      expect(page).to have_content("this is pretty cool")
      click_on "Edit!"
    end

    fill_in "edit-title", with: "New Cool Idea"
    fill_in "edit-body", with: "Everyone should wear beanies 100% of the time"
    click_on "Enter"

    within("#idea-#{idea.id}") do
      expect(page).to have_content("New Cool Idea")
      expect(page).to have_content("Everyone should wear beanies 100% of the time")
    end
  end
end
