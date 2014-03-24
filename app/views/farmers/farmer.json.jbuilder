json.(@farmer, :id, :name, :bio, :zipcodes, :street_address, :city,
:state, :postal_code, :contact_email, :phone_number )

json.product_types @farmer.products, :id, :name

json.products @farmer.product_manifests, :id, :description, :product_type_id, :variety

json.favorite_farmers @farmer.favorite_farmers, :id, :farmer_id, :farmer_name, :shopper_id, :product_favorited