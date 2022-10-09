    const alertMessage = Swal.mixin({
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

    function alertLose(message) {
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 2000
      })
    }

    export { alertMessage, alertLose }