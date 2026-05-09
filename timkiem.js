

// ================= TÌM KIẾM SẢN PHẨM =================
document.addEventListener('DOMContentLoaded', function () {

    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    // Tất cả sản phẩm
    const products = document.querySelectorAll('.product-card');

    // Khi submit form
    searchForm.addEventListener('submit', function (e) {

        // Ngăn reload trang
        e.preventDefault();

        // Lấy từ khóa người dùng nhập
        const keyword =
            searchInput.value
            .trim()
            .toLowerCase();

        // Nếu ô tìm kiếm trống
        if (keyword === '') {

            products.forEach(product => {
                product.style.display = 'block';
            });

            return;
        }

        let found = false;

        // Duyệt từng sản phẩm
        products.forEach(product => {

            // Lấy tên sản phẩm
            const productName =
                product.innerText.toLowerCase();

            // Nếu chứa từ khóa
            if (productName.includes(keyword)) {

                product.style.display = 'flex';

                found = true;

            }

            // Không chứa
            else {

                product.style.display = 'none';
            }
        });

        // Không tìm thấy
        if (!found) {

            alert('Không tìm thấy sản phẩm!');
        }

    });

});

