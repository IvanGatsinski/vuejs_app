const product_data_mixin = {
    data() {
        return {
            productId: this.product._id,
            productImageUrl: this.product.imageUrl,
            name: this.product.name,
            price: this.product.price,
            author: this.product.author,
            description: this.product.description,
            condition: this.product.condition,
            productCreator: this.product._acl.creator,
            dateCreated: this.product._kmd.ect,
        }
    }
}
const product_props_mixin = {
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
}

export {
    product_data_mixin,
    product_props_mixin,
}