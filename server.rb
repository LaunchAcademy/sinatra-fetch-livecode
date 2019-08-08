require 'sinatra'
require 'sinatra/reloader'
require 'pry'

set :bind, '0.0.0.0'

def write_to_json_file(location)
  file = File.read("locations.json")
  locations_array = JSON.parse(file)

  new_location_id = locations_array["locations"].last["id"] + 1

  new_location = {
    id: new_location_id,
    city: location["city"],
    country: location["country"]
  }

  updated_locations = {
    locations: locations_array["locations"].concat([new_location])
  }
  # Either of these next two lines will work: pretty_generate just gives us line
  # breaks and indentation in our .json file (making it easier on the eyes)

  updated_locations_json = updated_locations.to_json
  # updated_locations_json = JSON.pretty_generate(updated_locations, indent: ' ')

  File.write("locations.json", updated_locations_json)
end

get "/" do
  redirect to "/locations"
end

get "/locations" do
  File.read('public/index.html')
end

get "/api/v1/locations" do
  status 200
  content_type :json
  # @locations = CSV.readlines("locations") 
  # @locations.to_json

  File.read('locations.json')
end

post "/api/v1/locations" do
  new_location = JSON.parse(request.body.read)["location"]

  if new_location["city"]
    write_to_json_file(new_location)

    status 200
    content_type :json
    {location: new_location}.to_json
  else
    status 500
    content_type :json
    { error: "everything is bad!"}.to_json
  end
end
