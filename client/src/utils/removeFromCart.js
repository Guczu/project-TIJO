function removeFromCart(product) {
    let cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
        cart = cart.filter(item => item._id !== product._id);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        return cart;
    }
}

export default removeFromCart;
