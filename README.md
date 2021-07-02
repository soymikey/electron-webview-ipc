This is the dependency for electron to communicate with webview. It is based on ipcRenderer of electron.
# How it works
Inject electron's ipcRenderer to webview's window object.
once webview-dom has been loaded and listen on 'ipc-message',  To send message to webview-inside by using webview-dom.send().

# How to use

##### preload.js

`const { subscribe, publish, response, request }=require('electron-webview-ipc')`

- global.subscribe=subscribe
- global.publish=publish
- global.response=response
- global.request=request


##### electron.html
`<webview  id='webview' src={webviewUrl}   preload='preload.js'  ></webview>`

##### electron.js
`const webview = document.querySelector('webview');`
`webview.addEventListener('ipc-message', async (event) => {
      const json = event.args[0];
      const service = event.channel
	  webview.send(service, result);
	  }`
	  
##### webview.html

###### //request sync
`request(service, data, (event, json) => {
  console.log('ok', json); })`

###### //request async
`const result=await request(service, data)`

###### //response sync
`response(service,(event,json)=>{
 console.log('ok', json); })`

###### //subscribe 
`const unsubscribeService=subscribe(service, (event, json) => {
    console.log('ok',json);
  })
`
###### //unsubscribe
`unsubscribeService()`


Happy Coding~~





