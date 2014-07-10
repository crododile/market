@Mrkt.attributes.each do |key, value|
  json.set!(key, value)
end
json.attendees @Attendees, :name
json.set!(:attended_by_current_farmer, @attended_by_user)