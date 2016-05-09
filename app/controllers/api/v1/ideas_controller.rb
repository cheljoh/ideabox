module Api
  module V1
    class IdeasController < ApiController
      respond_to :json

      def index
        respond_with @ideas = Idea.order("created_at DESC")
      end
    end
  end
end
