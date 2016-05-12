require "rails_helper"

RSpec.feature "UserEditsIdea", type: :feature do
  include SpecHelpers
  include WaitForAjax

  scenario "user edits idea", js: true do
    idea = Idea.create(title: "A", body: "B")

    visit "/"

    wait_for_ajax

    within("#idea-#{idea.id}") do
      expect(page).to have_content("A")
      expect(page).to have_content("B")
    end

    find(".card-title").click
    find(".card-title").native.send_keys('B')

    click_on "Upvote!"

    find(".card-body").click
    find(".card-body").native.send_keys("C")

    click_on "Upvote!"

    wait_for_ajax

    within("#idea-#{idea.id}") do
      expect(page).to have_content("BA")
      expect(page).to have_content("BC")
    end
  end

  # scenario "edited body gets truncated", js: true do
  #   idea = Idea.create(title: "A", body: "B")
  #
  #   visit "/"
  #
  #   wait_for_ajax
  #
  #   find(".card-body").click
  #
  #   wait_for_ajax
  #
  #   find(".card-body").native.send_keys("this is pretty cool and I do believe that I will live forever and have a wonderful unicorn to ride everyday and her name is Sasha")
  #
  #   wait_for_ajax
  #
  #   click_on "Upvote!"
  #
  #   wait_for_ajax
  #
  #   visit '/'
  #
  #   wait_for_ajax
  #   expect(page).to have_content("Bthis is pretty cool and I do believe that I will live forever and have a wonderful unicorn to ride ...")
  # end
end
