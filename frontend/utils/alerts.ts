/**
 * Alert utility functions using SweetAlert2
 */

import Swal from 'sweetalert2'

/**
 * Show success alert
 */
export const showSuccess = (title: string, message?: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    confirmButtonColor: '#0072FF',
    confirmButtonText: 'Great!',
  })
}

/**
 * Show error alert
 */
export const showError = (title: string, message?: string) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message || 'Something went wrong. Please try again.',
    confirmButtonColor: '#0072FF',
    confirmButtonText: 'OK',
  })
}

/**
 * Show warning alert
 */
export const showWarning = (title: string, message?: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
    confirmButtonColor: '#0072FF',
    confirmButtonText: 'OK',
  })
}

/**
 * Show info alert
 */
export const showInfo = (title: string, message?: string) => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    confirmButtonColor: '#0072FF',
    confirmButtonText: 'Got it',
  })
}

/**
 * Show confirmation dialog
 */
export const showConfirmation = async (
  title: string,
  message?: string,
  confirmText: string = 'Yes',
  cancelText: string = 'No'
) => {
  const result = await Swal.fire({
    icon: 'question',
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#0072FF',
    cancelButtonColor: '#6B7280',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })
  
  return result.isConfirmed
}

/**
 * Show loading alert
 */
export const showLoading = (title: string = 'Processing...', message?: string) => {
  Swal.fire({
    title: title,
    text: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })
}

/**
 * Close any open alert
 */
export const closeAlert = () => {
  Swal.close()
}

/**
 * Show toast notification
 */
export const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: type,
    title: message
  })
}


