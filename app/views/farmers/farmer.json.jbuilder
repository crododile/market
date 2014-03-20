json.(@farmer, :id, :name)

json.product_types @farmer.products, :id, :name

json.products = @farmer.product_manifests, :id, :name