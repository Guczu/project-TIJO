function saveToCart(product) {
    let cart = localStorage.getItem('cart');

    if (!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    const newCart = cart.map((item) => {
        if (item._id === product._id) {
            return {...item, quantity: item.quantity + 1}
        } else {
            return item;
        }
    })

    const isProductInArray = newCart.some(item => item._id === product._id);

    if (!isProductInArray) {
        newCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
}

export default saveToCart;
