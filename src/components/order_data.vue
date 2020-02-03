<template>
  <div class="order_data">
    <h1>order_data</h1>
    <input @change="test" type="file" accept=".png, .jpg, .jpeg"/>
    <img src="">
    <button @click="myclick">asdasdasd</button>
  </div>
</template>

<script>
  import {business_data, AV} from './get_data'

  export default {
    name: "order_data",
    data: function () {
      return {
        business_msg: {
          icon: 'http://lc-URfkqxY5.cn-n1.lcfile.com/6c6a22e4b94e23307edb.jpg',
          name: '1',
          tel: 123,
          address: '1',
          notice: '1',
          goods: [
            {
              goods_name: "1",
              price: "1",
              numb: "1",
              title: "1",
              goods_pic: "http://lc-URfkqxY5.cn-n1.lcfile.com/6c6a22e4b94e23307edb.jpg"
            },
            {
              goods_name: "2",
              price: "2",
              numb: "2",
              title: "2",
              goods_pic: "http://lc-URfkqxY5.cn-n1.lcfile.com/6c6a22e4b94e23307edb.jpg"
            }
          ]
        }
      }
    },
    methods: {
      test(event) {
        let files = event.target.files || event.dataTransfer.files;
        let file = new AV.File(files[0].name, files[0]);
        /*        file.save({
                    onprogress: function (progress) {
                      console.log(progress);
                      alert('上传OK')
                    }
                  }
                ).then(function (file) {
                  console.log(file.attributes.url);
                }, function (error) {
                  console.log(error)
                  // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
                });*/


      },
      myclick: function () {
        let obj = JSON.parse(JSON.stringify(this.business_msg))
        console.log(this.business_msg)
        console.log(obj)
      }
    }
  }
</script>

<style scoped>

</style>
