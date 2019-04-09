var app = new Vue({
    name:'myVueApp',
    el: '#root',
    data () {
        return {
            messages:'Hello Vue.js!',
        }
    },
})


var app2 = new Vue({
    data () {
        return {
            messages2:'Hello,$ function!'
        }
    },
})

app2.$mount('#root2')  // Vue实例的 $mount方法代替 el选项