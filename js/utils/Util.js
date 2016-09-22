
export default {
    /**
     * 刷新页面，route可以为空，会刷新当前页面
     * @param nav
     * @param route
     */
   refresh(nav, route) {

        if (!route) {
            let routes = nav.getCurrentRoutes();
            let length = routes.length;
            route = routes[length - 1]; // 使用当前页对应的route
        }

        // todo 最好的方式是直接使用route.page，但是不好使，这种写法只支持一层节点，如果有多层会有问题
        // todo 暂时未处理page是function的情况
        let Tag = route.component.type;
        nav.replace({
            component: <Tag {...route.component.props} />,
        });

    },
    /**
     * 跳转页面
     * @param navigator 
     * @param name 新页面名称
     * @param component 新页面组件
     * @param data 参数
     * @param type 跳出方式  'Bottom' - 底部 默认右侧跳出
     * @private
     */
    transform(navigator, name, component, data, type){
      if(navigator&&component){
        navigator.push({
          name: name,
          component: component,
          params: {
            data: data
          },
          type: type,
        });
      }
    },
    //序列化对象
    serialize: function (obj, prefix) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(
            //  typeof v === "object" ?
            //serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    },
    /**
     * 基于 fetch 封装的 GET请求
     * @param url
     * @returns {Promise}
     */
    fetchGet: function(url, params) {
        if (params) {
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                    }
                })
                .then((response) => {
                    if (response && response.error_code === 0) {
                        resolve(response)//response.error_code 是与服务器端的约定，非0就是错误
                    } else {
                        reject(response.message)//response.message也是与服务器端的约定，error_code !==0 就需要返回message
                    }
                })
                .catch((err)=> {
                    reject(_parseErrorMsg(err))
                })
        })
    },
      // 校验是否有重复key
      keysDupliCheck: function(combinedObject, ...args){
          // let chips = Array.prototype.slice.call(arguments, 1);
          // 合并前总数
          let chipsTotalLength = 0;
          for(let i=0; i<args.length; i++){
              chipsTotalLength += Object.keys(args[i]).length;
          }

          if(chipsTotalLength == Object.keys(combinedObject).length){
              return true;
          }

          return false;
      },
}
