require 'rails_helper'

RSpec.describe Idea, type: :model do

  it "should only include 3 settings" do
    idea1 = Idea.create(title: "hello", body: "this is pretty cool", quality: "swill")
    idea2 = Idea.create(title: "hi", body: "you are cool", quality: "plausible")
    idea3 = Idea.create(title: "whoa", body: "life is awesome", quality: "genius")
    idea4 = Idea.create(title: "neat", body: "I love everyone", quality: "lampshade")
    expect(idea1.valid?).to be true
    expect(idea2.valid?).to be true
    expect(idea3.valid?).to be true
    expect(idea4.valid?).to be false
  end

  it "defaults to swill" do
    idea1 = Idea.new(title: "hello", body: "this is pretty cool")
    expect(idea1.quality).to eq("swill")
  end
end
