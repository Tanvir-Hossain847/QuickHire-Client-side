/**
 * Custom SweetAlert2-style toast notifications
 * Using native browser APIs and custom styling
 */

export const Toast = {
  fire: ({ icon, title, timer = 3000 }) => {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      animation: slideIn 0.3s ease-out;
      border-left: 4px solid ${getIconColor(icon)};
    `;

    // Add icon
    const iconElement = document.createElement('div');
    iconElement.innerHTML = getIconSVG(icon);
    iconElement.style.cssText = `
      flex-shrink: 0;
      width: 24px;
      height: 24px;
    `;

    // Add title
    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.style.cssText = `
      color: #202941;
      font-weight: 600;
      font-size: 14px;
      flex: 1;
    `;

    toast.appendChild(iconElement);
    toast.appendChild(titleElement);
    container.appendChild(toast);

    // Add animation styles if not already added
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Auto remove after timer
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        container.removeChild(toast);
        if (container.children.length === 0) {
          document.body.removeChild(container);
        }
      }, 300);
    }, timer);
  }
};

function getIconColor(icon) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  return colors[icon] || colors.info;
}

function getIconSVG(icon) {
  const icons = {
    success: `<svg fill="none" viewBox="0 0 24 24" stroke="#10b981" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>`,
    error: `<svg fill="none" viewBox="0 0 24 24" stroke="#ef4444" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`,
    warning: `<svg fill="none" viewBox="0 0 24 24" stroke="#f59e0b" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>`,
    info: `<svg fill="none" viewBox="0 0 24 24" stroke="#3b82f6" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
  };
  return icons[icon] || icons.info;
}

export const Swal = {
  fire: ({ title, text, icon, confirmButtonText = 'OK', showCancelButton = false, cancelButtonText = 'Cancel' }) => {
    return new Promise((resolve) => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease-out;
      `;

      // Create modal
      const modal = document.createElement('div');
      modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 32px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        animation: scaleIn 0.2s ease-out;
        text-align: center;
      `;

      // Add icon
      if (icon) {
        const iconElement = document.createElement('div');
        iconElement.innerHTML = getIconSVG(icon);
        iconElement.style.cssText = `
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
        `;
        modal.appendChild(iconElement);
      }

      // Add title
      if (title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.cssText = `
          font-size: 24px;
          font-weight: bold;
          color: #202941;
          margin-bottom: 12px;
        `;
        modal.appendChild(titleElement);
      }

      // Add text
      if (text) {
        const textElement = document.createElement('p');
        textElement.textContent = text;
        textElement.style.cssText = `
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.5;
        `;
        modal.appendChild(textElement);
      }

      // Add buttons
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
        justify-content: center;
      `;

      if (showCancelButton) {
        const cancelButton = document.createElement('button');
        cancelButton.textContent = cancelButtonText;
        cancelButton.style.cssText = `
          padding: 10px 24px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        `;
        cancelButton.onmouseover = () => cancelButton.style.background = '#f3f4f6';
        cancelButton.onmouseout = () => cancelButton.style.background = 'white';
        cancelButton.onclick = () => {
          document.body.removeChild(overlay);
          resolve({ isConfirmed: false });
        };
        buttonContainer.appendChild(cancelButton);
      }

      const confirmButton = document.createElement('button');
      confirmButton.textContent = confirmButtonText;
      confirmButton.style.cssText = `
        padding: 10px 24px;
        border: none;
        border-radius: 6px;
        background: #5848DF;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      `;
      confirmButton.onmouseover = () => confirmButton.style.background = '#4a3bc6';
      confirmButton.onmouseout = () => confirmButton.style.background = '#5848DF';
      confirmButton.onclick = () => {
        document.body.removeChild(overlay);
        resolve({ isConfirmed: true });
      };
      buttonContainer.appendChild(confirmButton);

      modal.appendChild(buttonContainer);
      overlay.appendChild(modal);

      // Add animation styles
      if (!document.getElementById('swal-styles')) {
        const style = document.createElement('style');
        style.id = 'swal-styles';
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(overlay);
    });
  }
};
