// ─── ERROR HANDLING UTILITIES ───────────────────────────────────────────────────────
// Centralized error handling for better user experience
// ──────────────────────────────────────────────────────────────────────────────

const ErrorHandler = (() => {

  // ── Configuration ─────────────────────────────────────────────────────────────

  const isDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  
  // ── Logging ───────────────────────────────────────────────────────────────────

  function log(message, error = null) {
    if (isDevelopment) {
      if (error) {
        console.error(message, error);
      } else {
        console.warn(message);
      }
    }
    // Could add analytics tracking here for production errors
  }

  // ── Storage Error Handling ───────────────────────────────────────────────────────

  function handleStorageError(operation, key, error) {
    log(`Storage ${operation} failed for key: ${key}`, error);
    
    // Show user-friendly message for quota exceeded
    if (error.name === 'QuotaExceededError') {
      showNotification('Storage full. Please clear some data in settings.', 'error');
    }
  }

  // ── Network Error Handling ───────────────────────────────────────────────────────

  function handleNetworkError(url, error) {
    log(`Network request failed: ${url}`, error);
    
    // Show offline message for external resources
    if (url.includes('youtube.com') || url.includes('musclewiki.com')) {
      showNotification('Video links unavailable offline', 'warning');
    }
  }

  // ── User Notifications ─────────────────────────────────────────────────────────

  function showNotification(message, type = 'info') {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--${type === 'error' ? 'red' : type === 'warning' ? 'orange' : 'blue'});
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      max-width: 300px;
      text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  return {
    log,
    handleStorageError,
    handleNetworkError,
    showNotification
  };

})();
