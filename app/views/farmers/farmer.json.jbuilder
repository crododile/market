json.(@farmer, :id, :name, :bio)

json.product_types @farmer.products, :id, :name

json.products @farmer.product_manifests, :id, :description, :product_type_id