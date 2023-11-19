function subCartQuantity(product) {
    let cart = localStorage.getItem('cart');

    if (!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    const newCart = cart.map((item) => {
        if (item._id === product._id) {
            return {...item, quantity: item.quantity - 1}
        } else {
            return item;
        }
    })
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    return newCart;
}

export default subCartQuantity;
