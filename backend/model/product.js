class Product{
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    set id(id) {
        this.id = id;
    }
    set name(name) {
        this.name = name;
    }
    set price(price) {
        this.price = price;
    }
    set image(image) {
        this.image = image;
    }
    get id() {
        return this.id;
    }
    get name() {
        return this.name;
    }
    get price() {
        return this.price;
    }
    get image() {
        return this.image;
    }
}

class products{
    constructor() {
        
    }
}