const { ipcRenderer } = require("electron");
//订阅
const subscribe = async (service, cb) => {
  ipcRenderer.removeAllListeners(service);
  ipcRenderer.on(service, cb);
  return () => ipcRenderer.removeAllListeners(service);
};
//发布
const publish = async (service, json = {}) => {
  ipcRenderer.sendToHost(service, json);
};
// 取消订阅/取消监听
const unsubscribe = async (service) => {
  if (service) {
    ipcRenderer.removeAllListeners(service);
  } else {
    ipcRenderer.removeAllListeners();
  }
};

//响应
const response = async (service, cb) => {
  ipcRenderer.once(service, (event, json) => {
    cb(event, json);
  });
};
//请求
const request = async (service, json, cb) => {
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
export { subscribe, publish, unsubscribe, response, request };
