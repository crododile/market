json.(@shopper, :id, :name)

json.favorite_farmers @shopper.favorite_farmers, :farmer_id, :shopper_id, :product_favorited