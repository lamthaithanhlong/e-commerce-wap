class Order {
    constructor(id,createdTime,products,totalPrice) {
        this.id = id;
        this.createdTime = createdTime;
        this.products = products;
        this.totalPrice = totalPrice;
    }
    set setId(id) {this.id = id;}
    set setCreatedTime(createdTime) {this.createdTime = createdTime}
    set setProducts(products) {this.products = products}
    set setTotalPrice(totalPrice) {this.totalPrice = totalPrice}
    get getId() {return this.id}
    get getCreatedTime() {return this.createdTime}
    get getProducts() {return this.products}
    get getTotalPrice() {return this.totalPrice}
    getAllCart() {
        return {
            id : this.getId,
            createdTime : this.getCreatedTime,
            products : this.getProducts,
            totalPrice : this.getTotalPrice
        }
    }
    addProductIntoCart(id,createdTime,products,totalPrice) {
        this.setId = id
        this.setCreatedTime = createdTime
        this.setTotalPrice = totalPrice
        return this.getId
    }
}
module.exports = Order