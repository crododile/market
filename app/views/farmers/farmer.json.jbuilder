json.(@farmer, :id, :name, :bio, :zipcodes)

json.product_types @farmer.products, :id, :name

json.products @farmer.product_manifests, :id, :description, :product_type_id

json.favorite_farmers @farmer.favorite_farmers, :id, :farmer_id, :farmer_name, :shopper_id, :product_favorited