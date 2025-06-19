// Footer admin button logic
(function() {
  function updateAdminFooterBtn() {
    var btn = document.querySelector('.admin-footer-btn');
    if (!btn) return;
    if (typeof window.isAdmin !== 'function' || !window.isAdmin() || window.location.pathname.endsWith('admin.html')) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-block';
    }
  }
  document.addEventListener('DOMContentLoaded', updateAdminFooterBtn);
  window.addEventListener('storage', updateAdminFooterBtn);
  window.updateAdminFooterBtn = updateAdminFooterBtn;
})(); 