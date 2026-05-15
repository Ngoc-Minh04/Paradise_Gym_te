/**
 * Logic xử lý Cấu hình hệ thống (Admin)
 */

window.GymApp.pages.config = {
  init() {
    this.modal = document.getElementById('modal-system-config');
    this.btnSettings = document.getElementById('btn-settings');
    this.btnClose = document.getElementById('btn-close-config');
    this.btnSave = document.getElementById('btn-save-config');
    this.textarea = document.getElementById('config-regulations');

    if (this.btnSettings) {
      this.btnSettings.onclick = () => this.showModal();
    }

    if (this.btnClose) {
      this.btnClose.onclick = () => this.hideModal();
    }

    if (this.btnSave) {
      this.btnSave.onclick = () => this.saveConfig();
    }

    // Đóng modal khi click ra ngoài
    this.modal.onclick = (e) => {
      if (e.target === this.modal) this.hideModal();
    };
  },

  async showModal() {
    this.modal.style.display = 'flex';
    this.textarea.value = 'Đang tải...';
    this.textarea.disabled = true;

    try {
      const res = await window.GymApp.api.fetch('/config/quy_dinh_phong_tap');
      if (res.success && res.data) {
        this.textarea.value = res.data.gia_tri;
      } else {
        this.textarea.value = '';
      }
    } catch (error) {
      console.error('Lỗi tải cấu hình:', error);
      alert('Không thể tải cấu hình quy định.');
    } finally {
      this.textarea.disabled = false;
    }
  },

  hideModal() {
    this.modal.style.display = 'none';
  },

  async saveConfig() {
    const value = this.textarea.value.trim();
    if (!value) {
      return alert('Vui lòng nhập nội dung quy định.');
    }

    this.btnSave.disabled = true;
    this.btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin" style="font-size:18px;">sync</span> Đang lưu...';

    try {
      const res = await window.GymApp.api.fetch('/config/quy_dinh_phong_tap', {
        method: 'PUT',
        body: JSON.stringify({ gia_tri: value })
      });

      if (res.success) {
        alert('Cập nhật quy định thành công!');
        this.hideModal();
      } else {
        alert('Lỗi: ' + res.message);
      }
    } catch (error) {
      console.error('Lỗi lưu cấu hình:', error);
      alert('Không thể kết nối đến server.');
    } finally {
      this.btnSave.disabled = false;
      this.btnSave.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">save</span> Lưu cấu hình';
    }
  }
};

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', () => {
  window.GymApp.pages.config.init();
});
