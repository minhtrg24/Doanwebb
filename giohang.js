// --- 1. HÀM HIỂN THỊ GIỎ HÀNG (Dùng cho trang giohang.html) ---
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    const badge = document.getElementById('cart-count'); // Badge trên Header

    // Cập nhật số lượng trên icon giỏ hàng ở Header
    if (badge) {
    badge.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Nếu không tìm thấy container (đang ở trang chủ), thì dừng hàm này
    if (!container) return;

    // TRƯỜNG HỢP GIỎ HÀNG TRỐNG
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 50px;">
                <i class="fas fa-shopping-basket" style="font-size: 80px; color: #ddd;"></i>
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy chọn sản phẩm bạn yêu thích và thêm vào giỏ nhé!</p>
                <a href="index.html" class="btn-green" style="background: #33cc66; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">TIẾP TỤC MUA SẮM</a>
            </div>`;
        return;
    }

    // TRƯỜNG HỢP CÓ SẢN PHẨM
    let total = 0;
    let itemsHtml = '';

    cart.forEach((item, index) => {
    total += item.price * item.quantity;
    itemsHtml += `
        <tr class="cart-item">
            <td class="product-cell" style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover;">
                <div><strong>${item.name}</strong></div>
            </td>
            <td>
                <div class="quantity-controls" style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity(${index}, -1)" style="cursor:pointer; width:25px;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" style="cursor:pointer; width:25px;">+</button>
                </div>
            </td>
            <td style="color: #cb1c22; font-weight: bold;">${(item.price * item.quantity).toLocaleString()}đ</td>
            <td><button onclick="removeItem(${index})" style="border:none; background:none; cursor:pointer; color:#888;"><i class="fas fa-trash"></i></button></td>
        </tr>`;
});

    container.innerHTML = `
        <div class="cart-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <div class="cart-list">
                <table class="cart-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #eee;">
                            <th style="text-align: left; padding: 10px;">Sản phẩm</th>
                            <th style="text-align: left;">Số lượng</th>
                            <th style="text-align: left;">Tạm tính</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
            </div>
            <div class="summary-box" style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h3>Thông tin đơn hàng</h3>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ddd;">
                <div class="summary-row" style="display: flex; justify-content: space-between; font-weight: bold;">
                    <span>Tổng tiền:</span>
                    <span style="color: #cb1c22; font-size: 20px;">${total.toLocaleString()}đ</span>
                </div>
                <button class="btn-checkout" style="width: 100%; background: #cb1c22; color: white; border: none; padding: 15px; border-radius: 5px; margin-top: 20px; cursor: pointer; font-weight: bold;">THANH TOÁN NGAY</button>
            </div>
        </div>`;
}

// --- 2. HÀM XÓA SẢN PHẨM ---
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// --- 3. HÀM THÊM VÀO GIỎ (Dùng cho cả trang chủ và chi tiết) ---
// function addToCart(btn) {
//     let productName, productPrice, productImage;


//     if (btn) {
//         const productCard = btn.closest('.product-card');
//         productName = productCard.querySelector('h3').innerText;
//         const priceText = productCard.querySelector('.price').innerText;
//         productPrice = parseInt(priceText.replace(/\D/g, ''));
//         productImage = productCard.querySelector('img').src;
//     } 

//     else {
//         productName = document.querySelector('h1').innerText;
//         const priceText = document.querySelector('.current-price').innerText;
//         productPrice = parseInt(priceText.replace(/\D/g, ''));
//         productImage = document.querySelector('.product-image img').src;
//     }

//     const product = {
//         name: productName,
//         price: productPrice,
//         image: productImage,
//         quantity: 1
//     };

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingIndex = cart.findIndex(item => item.name === product.name);

//     if (existingIndex > -1) {
//         cart[existingIndex].quantity += 1;
//     } else {
//         cart.push(product);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
    

//     const badge = document.getElementById('cart-count') || document.querySelector('.badge');
//     if (badge) badge.innerText = cart.length;
//     updateCartBadge();

//     alert("Đã thêm " + productName + " vào giỏ hàng!");
// }
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // THAY ĐỔI Ở ĐÂY: Dùng reduce để cộng dồn tất cả quantity (số lượng)
        let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

        const badge = document.querySelector('.badge');
        if (badge) {
            badge.innerText = totalQuantity;
        }
    }
    // 2. Hàm thêm vào giỏ hàng
    function addToCart(btn) {
        // Tìm khung lớn nhất bao quanh sản phẩm (product-card)
        // Dùng closest để dù nút bấm nằm đâu nó cũng tìm ngược lên đúng cái khung đó
        const productCard = btn.closest('.product-card');

        if (!productCard) {
            console.error("Lỗi: Không tìm thấy class .product-card bao quanh nút bấm");
            return;
        }

        // Lấy thông tin bằng cách tìm tất cả các khả năng thẻ có thể xảy ra
        const nameEl = productCard.querySelector('h3, .product-name');
        const priceEl = productCard.querySelector('.price, .product-price');
        const imgEl = productCard.querySelector('img');

        if (nameEl && priceEl && imgEl) {
            const name = nameEl.innerText.trim();
            // Lấy số từ chuỗi giá (ví dụ: "1.900.000đ" -> 1900000)
            const price = parseInt(priceEl.innerText.replace(/\D/g, ''));
            const image = imgEl.src;

            const product = { name, price, image, quantity: 1 };

            // Xử lý lưu vào localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const index = cart.findIndex(item => item.name === name);

            if (index > -1) {
                cart[index].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Cập nhật con số hiển thị ngay lập tức
            updateCartBadge();

        }
    }

    // 3. Tự động chạy khi load bất kỳ trang nào (giúp số không bị về 0)
    document.addEventListener('DOMContentLoaded', updateCartBadge);

    // Chạy khi load bất kỳ trang nào có nhúng file này
    document.addEventListener('DOMContentLoaded', loadCart);

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Thay đổi số lượng
    cart[index].quantity += change;

    // Nếu số lượng nhỏ hơn 1 thì giữ nguyên là 1 (hoặc xóa nếu bạn muốn)
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Load lại bảng để cập nhật giá tiền ngay lập tức
}

// function updateCartBadge() {

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

//     let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);


//     const badge = document.getElementById('cart-count') || document.querySelector('.badge');
    
//     if (badge) {
//         badge.innerText = totalQuantity;
//     }
// }

// Lệnh này cực kỳ quan trọng: Tự động chạy mỗi khi trang web được load
document.addEventListener('DOMContentLoaded', updateCartBadge);