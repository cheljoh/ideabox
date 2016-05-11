require "rails_helper"

RSpec.feature "UserEditsIdea", type: :feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user edits idea", js: true do
    idea = Idea.create(title: "hello", body: "this is pretty cool")

    visit "/"

    wait_for_ajax

    within("#idea-#{idea.id}") do
      expect(page).to have_content("hello")
      expect(page).to have_content("this is pretty cool")
    end

    fill_in ".card-title", with: "New Cool Idea"
    fill_in ".card-body", with: "Everyone should wear beanies 100% of the time"

    within("#idea-#{idea.id}") do
      expect(page).to have_content("New Cool Idea")
      expect(page).to have_content("Everyone should wear beanies 100% of the time")
    end
  end

  # scenario "user must complete all fields", js: true do
  #   make_ideas
  #
  #   idea = Idea.first
  #
  #   visit "/"
  #
  #   wait_for_ajax
  #
  #   within("#idea-#{idea.id}") do
  #     expect(page).to have_content("hello")
  #     expect(page).to have_content("this is pretty cool")
  #     click_on "Edit"
  #   end
  #
  #   wait_for_ajax
  #
  #   fill_in "edit-title", with: ""
  #   fill_in "edit-body", with: "Everyone should wear beanies 100% of the time"
  #   click_on "Enter"
  #
  #   wait_for_ajax
  #
  #   expect(page).to have_content("Please complete all fields!")
  #
  #   fill_in "edit-title", with: "New Cool Idea"
  #   fill_in "edit-body", with: "Everyone should wear beanies 100% of the time"
  #   click_on "Enter"
  #
  #   wait_for_ajax
  #
  #   expect(page).to_not have_content("Please complete all fields!")
  #
  #   within("#idea-#{idea.id}") do
  #     expect(page).to have_content("New Cool Idea")
  #     expect(page).to have_content("Everyone should wear beanies 100% of the time")
  #   end
  # end
end
