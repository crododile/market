class MrktsController < ApplicationController
  
	PRODUCT_TYPES =
		["bakedgoods",
	    "cheese",
	    "crafts",
	    "flowers",
	    "eggs",
	    "seafood",
	    "herbs",
	    "vegetables",
	    "honey",
	    "jams",
	    "maple",
	    "meat",
	    "nursery",
	    "nuts",
	    "nursery",
	    "plants",
	    "poultry",
	    "prepared",
	    "trees",
	    "soap",
	    "wine"]
  
  def index
    @Mrkts = Mrkt.select(:marketname, :x, :y, :id)
    render :json => @Mrkts
  end
  
  def show
    @Mrkt = Mrkt.includes(:attendees).find(params[:id])
    @Attendees = @Mrkt.attendees
    @attended_by_user = @Mrkt.attendees.all.include?(current_farmer)
    render 'mrkts/mrkt'
  end
  
  def graph
    render 'mrkts/graph'
  end
  
  def count
    @response = []
    PRODUCT_TYPES.each do |type|
      @response << {name: type, count: Mrkt.numMrktsForProduct(type)}
    end
    @response << {name: "number of markets", count: Mrkt.all.count }
    render :json => @response
  end
  
  

end
