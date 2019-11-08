export function debounce(fn, wait) {
  let timeout = null
  return function() {
    if (timeout !== null) clearTimeout(timeout)// 如果多次触发将上次记录延迟清除掉
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      timeout = null
    }, wait)
  }
}
