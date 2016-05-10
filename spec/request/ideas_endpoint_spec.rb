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

  it "can create a new idea" do
    make_ideas

    expect(Idea.count).to eq(5)

    post "/api/v1/ideas", {idea: {title: "hello", body: "whatsup"}}

    results = JSON.parse(response.body)

    expect(response.content_type).to eq("application/json")
    expect(response).to be_success

    new_idea = Idea.last

    expect(Idea.count).to eq(6)

    expect(new_idea.title).to eq("hello")
    expect(new_idea.body).to eq("whatsup")
  end

  it "new idea must have a title and body" do
    make_ideas

    expect(Idea.count).to eq(5)

    post "/api/v1/ideas", {idea: {title: "hello"}}

    results = JSON.parse(response.body)

    expect(response.content_type).to eq("application/json")
    expect(response.status).to eq(422)
    expect(results["errors"]["body"][0]).to eq("can't be blank")
  end

  it "can delete an idea" do
    make_ideas

    idea = Idea.first

    expect(Idea.count).to eq(5)

    delete "/api/v1/ideas/#{idea.id}"

    expect(Idea.count).to eq(4)
  end

  it "can change quality of an idea" do
    make_ideas

    expect(Idea.first.quality).to eq("swill")

    put "/api/v1/ideas/#{Idea.first.id}", {idea: {quality: "plausible"}}

    require "pry"; binding.pry

    expect(Idea.first.quality).to eq("plausible")
  end
end
