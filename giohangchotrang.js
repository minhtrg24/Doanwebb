

// ================= THÊM VÀO GIỎ HÀNG =================
function addToCart() {

    // Lấy thông tin sản phẩm từ trang chi tiết
    const name = document.querySelector('h1').innerText.trim();

    const priceText =
        document.querySelector('.current-price').innerText;

    const price = parseInt(priceText.replace(/\D/g, ''));

    const image = document.querySelector('.product-image img').src;

    // Tạo object sản phẩm
    const product = {
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã tồn tại chưa
    const index =cart.findIndex(item => item.name === name);

    // Nếu đã có -> tăng số lượng
    if (index > -1) {

        cart[index].quantity += 1;

    }

    // Nếu chưa có -> thêm mới
    else {

        cart.push(product);

    }

    // Lưu lại localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật badge
    updateCartBadge();

   
}


// ================= CẬP NHẬT BADGE =================
function updateCartBadge() {

    let cart =
        JSON.parse(localStorage.getItem('cart')) || [];

    let totalQuantity =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    const badge =
        document.querySelector('.badge');

    if (badge) {

        badge.innerText = totalQuantity;
    }
}


// ================= AUTO LOAD =================
document.addEventListener(
    'DOMContentLoaded',
    updateCartBadge
);

