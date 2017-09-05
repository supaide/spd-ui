<template>
  <div class="spd-qiniu" :style="{width: width, height: height}">
  <div class="spd-qiniu-tips" v-if="tips && tips.length>0">{{tips}}</div>
  <slot></slot>
  <input type="file" @change="addFile">
  <div class="spd-qiniu-img">
    <img :src="img" ref="img">
  </div>
</div>
</template>
<script>
import Config from './config'
import {http} from 'spd-webutil'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    bucket: {
      type: String,
      required: true
    },
    tips: String,
    img: {
      type: String,
      default: ''
    },
    width: String,
    height: String,
    error: Function,
    success: Function,
    getFileName: Function
  },
  data () {
    return {
      file: null,
      reader: null,
      dataURL: null
    }
  },
  methods: {
    imgLoadEnd (file) {
      this.dataURL = this.reader.result
      this.$refs.img.src = this.dataURL
    },
    renderImg (file) {
      if (!this.reader) {
        this.reader = new FileReader()
        this.reader.onloadend = this.imgLoadEnd
      }
      this.reader.readAsDataURL(file)
    },
    addFile (e) {
      let file = e.target.files[0]
      if (!file) {
        return
      }
      this.file = file
      if (file.type.indexOf('image') >= 0) {
        this.renderImg(file)
      }
    },
    upload () {
      if (!Config.api) {
        console.log('token接口未设置')
        return
      }
      let qnQueryError = '七牛Query接口异常'
      http(Config.api, {bucket: this.bucket}, (result) => {
          let params = {
            ak: result.split(':')[0],
            bucket: this.bucket
          }
          let qiniuApi = Config.qiniuApi + '?ak=' + result.split(':')[0] + '&bucket=' + this.bucket
          http(Config.qiniuApi, params, (content) => {
              if (!content || !content.http || !content.http.up) {
                if (this.error) {
                  this.error(this.name, qnQueryError)
                } else {
                  alert(qnQueryError)
                }
                return
              }
              let fileName = this.getFileName ? this.getFileName(this.name) : this.file.name
              if (!fileName) {
                return
              }
              let uploadApi = this.getHosts(content.http.up)
              let formData = {}
              formData.file = this.file
              formData.chunk = 0
              formData.chunks = 1
              formData.token = result
              formData.key = fileName
              http(uploadApi[0], formData, () => {
                if (this.success) {
                  this.success(this.name)
                }
              }, () => {
                let msg = '上传失败'
                if (this.error) {
                  this.error(this.name, msg)
                } else {
                  alert(msg)
                }
              }, {credentials: 'omit', ignoreDefaultParams: true, preProcess: false})
            }, () => {
              if (this.error) {
                this.error(this.name, qnQueryError)
              } else {
                alert(qnQueryError)
              }
            }, {credentials: 'omit', ignoreDefaultParams: true, method: 'get', preProcess: false, ignoreBlock: true})
        },
        (codes, msgs) => {
          if (this.error) {
            this.error(this.name, msgs)
          } else {
            alert(msgs || 'token获取失败')
          }
        })
    },
    getHosts (hosts) {                                                
      let result = [];                                                              
      let uploadIndex = -1;                                                         
      for (let i = 0; i < hosts.length; i++) {                                      
        var host = hosts[i];                                                        
        if (host.indexOf("upload") !== -1) {                                        
          uploadIndex = i;                                                          
        }                                                                           
        if (host.indexOf('-H') === 0) {                                             
          //result.push(host.split(' ')[2]);                                        
        } else {                                                                    
          result.push(host);                                                        
        }                                                                           
      }                                                                             

      if (uploadIndex !== -1) {                                                     
        let uploadDomain = result[uploadIndex];                                     
        result[uploadIndex] = result[0];                                            
        result[0] = uploadDomain;                                                   
      }                                                                             
      return result;                                                                
    }
  },
  destroyed () {
    this.reader = null
    this.dataURL = null
    this.file = null
  }
}
</script>
<style lang="less">
@import "../../style/spd/widget/spd-qiniu//spd-qiniu.less";
</style>
