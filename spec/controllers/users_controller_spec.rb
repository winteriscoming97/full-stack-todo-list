require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  render_views

  describe 'POST api/users' do
    it 'returns successful with an id' do
      post :create
      parsed_response = JSON.parse(response.body)

      expect( parsed_response["success"] ).to eq true
      expect( parsed_response["id"] ).to eq(1)
    end
  end
end
