const CART_KEY = "cart";

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Thêm sản phẩm
export const addToCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
};

// Tăng số lượng
export const increaseQuantity = (productId) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += 1;
    saveCart(cart);
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

// Giảm số lượng
export const decreaseQuantity = (productId) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1); // xoá nếu = 0
    }
    saveCart(cart);
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

// Xoá sản phẩm
export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
};

// Xoá toàn bộ giỏ hàng
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};
