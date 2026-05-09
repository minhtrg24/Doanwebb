function switchForm(type, el) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab-btn');

    // 1. Cập nhật trạng thái Active cho các nút Tab
    tabs.forEach(tab => tab.classList.remove('active'));
    el.classList.add('active');

    // 2. Ẩn/Hiện form và đổi tiêu đề trang tương ứng
    if (type === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        document.title = "Đăng nhập - Trường Tech";
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        document.title = "Đăng ký - Trường Tech";
    }
}

// ==========================================
// XỬ LÝ SỰ KIỆN GỬI FORM (SUBMIT)
// ==========================================

// 1. Form Đăng nhập
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn load lại trang
    console.log("🚀 Đang xử lý đăng nhập...");
    // Bạn có thể thêm logic lấy dữ liệu (Email/Password) và gửi API tại đây
});

// 2. Form Đăng ký (Có kiểm tra mật khẩu khớp)
document.getElementById('register-form').addEventListener('submit', function(e) {
    // Lấy giá trị trực tiếp từ các ID đã thiết lập trong HTML
    const matKhau = document.getElementById('mkmoi').value;
    const xacNhan = document.getElementById('xacnhanmk').value;
    const xnInput = document.getElementById('xacnhanmk');

    // Kiểm tra tính khớp nhau của mật khẩu
    if (matKhau !== xacNhan) {
        e.preventDefault(); // Chặn việc gửi form
        
        alert("❌ Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!");
        
        // Tối ưu trải nghiệm: Xóa ô xác nhận và focus lại để người dùng nhập lại
        xnInput.value = "";
        xnInput.focus();
        return; 
    }

    // Nếu mật khẩu khớp thành công
    e.preventDefault(); 
    alert("✅ Chúc mừng! Mật khẩu khớp. Đang tiến hành đăng ký...");
    console.log("✅ Mật khẩu khớp! Đang xử lý đăng ký...");
});


