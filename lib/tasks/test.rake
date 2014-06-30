require 'csv'
require 'active_record'

#creates dtable and seeds it from a csv
#use:
# save seed data in lib/assets
#rake csv_to_pg filepath=#{filename} modelname=#{name #of your rails model to associate with this table}

task :csv_to_pg => :environment do
  @db_info = ActiveRecord::Base.configurations[Rails.env]
  relative_path = "../assets/"<<ENV['filename']
  full_path = File.expand_path(relative_path, __FILE__)
    
  def create_model_from_csv filename, model_name
    c = CSV.open(filename)
    columns = c.readline
    command = "rails generate model " << model_name.to_s.capitalize
  
    columns.each do |header|
      command << " " << header.to_s.downcase << ":string"
    end
    p "generating migration"
    system command
  end

  def copy_table_from_csv filename, modelname 
    columns = CSV.open(filename).readline
    cols = "("
    columns.each do |col|
      cols << "#{col.downcase},"
    end
    cols.chop!
    cols << ")"
    command = "COPY #{modelname.pluralize} #{cols} FROM '#{filename}' DELIMITERS ',' CSV HEADER;"

    connection = ActiveRecord::Base.establish_connection( @db_info )
    connection.connection.execute(command)
  end


  create_model_from_csv full_path, ENV['modelname']
  p "migrating"
  system "rake db:migrate"
  p "copying"
  copy_table_from_csv full_path, ENV['modelname']
  p "done, now go write your model!"
end
