const app = new Vue({
  el: '#app',
  data: {
    title: 'Nestjs Websockets Chat',
    name: '',
    text: '',
    messages: [],
    socket: null
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text
        }
        this.socket.emit('msgToServer', message)
        this.text = ''
      }
    },
    receivedMessage(message) {
      this.messages.push(message)
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0
    }
  },
  created() {
    this.socket = io('ws://192.168.1.108:4123', {
      path: "/io_ws",
      transportOptions: {
        websocket: {
          extraHeaders: {
            user_id: '1',
            product_id: '2'
          }
        }  
      },
      transports: [
        "websocket"
      ],
    })
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
    })
  }
})