import toastr from 'toastr'
import 'toastr/toastr.scss'

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-bottom-center',
  preventDuplicates: true,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '10000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
}

export default class Notifications {
  static requests() {
    toastr.warning(
      'You are sending too many requests. Please slow down to avoid disruption.',
      'Wait'
    )
  }

  static specific(title, message) {
    toastr.warning(message, title)
  }
}
