const env = require('./env.js');

const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

/**
 * 异步阻塞上传文件
 * url上传文件的地址
 * item要上传文件资源的路径 (本地路径)
 */
function asyncUpload(item,onfile) {
    const result=myfunc()
    var date= new Date()
    var month=date.getMonth() + 1
    let fileTypeIndex = item.lastIndexOf('.');
    let fileType = item.substring(fileTypeIndex);
    const aliyunFileKey = onfile+'/' + date.getFullYear()+'/'+month+'/'+date.getTime() + Math.floor(Math.random() * 150) + fileType;
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: env.uploadImageUrl,
            filePath: item,
            name: 'file',
            formData: {
                'key': aliyunFileKey,
                'policy': result.policyBase64,
                'OSSAccessKeyId': env.OSSAccessKeyId,
                'signature':result.signature,
                'success_action_status': '200',
              },
            success(res) {
                if (res.statusCode != 200) {
                    return wx.showToast({
                     title: '上传失败！',
                     icon:'none'
                   })
                   
                  }
                resolve({
                    data: aliyunFileKey
                });
            },
            fail: res => {
                console.error(res)
                return wx.showToast({
                    title: '上传失败！',
                    icon:'none'
                  })
            }
        })
    })
}
/**
 * 
 */
function myfunc() {
    let date = new Date();
    date.setHours(date.getHours() + env.timeout);
    let srcT = date.toISOString();
    console.log(srcT);
    const policyText = {
        "expiration": srcT, //设置该Policy的失效时间
        "conditions": [
            ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
        ]
    };
    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    const accesskey = 'BzH8mLArEDGREByUa4FZr4wx5plJKZ';
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);
    console.log(policyBase64);
    console.log("myfunc....");
    console.log(signature);
    return {
        'signature': signature,
        'policyBase64': policyBase64
    }
}

//暴露出去的方法
module.exports = {
    asyncUpload,
}