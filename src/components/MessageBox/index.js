import Vue from 'vue'
import main from './main.vue'
const MessageConstructor = Vue.extend(main)
let instance

const Message = function(options) {
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Message
