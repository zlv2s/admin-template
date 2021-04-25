import {
  Button,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Message,
  MessageBox
} from 'element-ui'

Message.install = Vue => {
  Vue.prototype.$message = Message
}

MessageBox.install = Vue => {
  Vue.prototype.$confirm = MessageBox.confirm
}

const components = {
  Button,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Message,
  MessageBox
}

const componentsHandler = {
  install(Vue) {
    Object.keys(components).forEach(k => Vue.use(components[k]))
  }
}

export default componentsHandler
