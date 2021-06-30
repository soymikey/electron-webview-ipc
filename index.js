const { ipcRenderer } = require('electron');
//订阅
global.subscribe = async (service, cb) => {
  ipcRenderer.removeAllListeners(service);
  ipcRenderer.on(service, cb);
  return () => ipcRenderer.removeAllListeners(service);
};
//发布
global.publish = async (service, json = {}) => {
  ipcRenderer.sendToHost(service, json);
};
// 取消订阅/取消监听
global.unsubscribe = async (service) => {
  if (service) {
    ipcRenderer.removeAllListeners(service);
  } else {
    ipcRenderer.removeAllListeners();
    global.initIcp();
  }
};

//响应
global.response = async (service, cb) => {
  ipcRenderer.once(service, (event, json) => {
    cb(event, json);
  });
};
//请求
global.request = async (service, json, cb) => {
  if (cb) {
    ipcRenderer.once(service, (event, json) => {
      return cb(event, json);
    });
    ipcRenderer.sendToHost(service, json);
  } else {
    return new Promise((resolve, reject) => {
      ipcRenderer.once(service, (event, json) => {
        resolve(json);
      });
      ipcRenderer.sendToHost(service, json);
    });
  }
};
