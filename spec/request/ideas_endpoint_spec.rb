require "rails_helper"

RSpec.describe "IdeasEndpointSpec", type: :request do
  include SpecHelpers

  it "returns all ideas" do
    make_ideas

    idea1 = Idea.first
    idea2 = Idea.last

    get "/api/v1/ideas"

    results = JSON.parse(response.body)

    expect(response.content_type).to eq("application/json")
    expect(response).to be_success

    expect(results.count).to eq(Idea.count)
    expect(results.first["title"]).to eq(idea2.title)
    expect(results.first["body"]).to eq(idea2.body)
    expect(results.first["quality"]).to eq(idea2.quality)
    expect(results.last["title"]).to eq(idea1.title)
  end
end
