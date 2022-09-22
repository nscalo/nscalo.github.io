(this["webpackJsonps3-project"]=this["webpackJsonps3-project"]||[]).push([[0],{46:function(e,t,a){},47:function(e,t,a){},7:function(e,t){e.exports={VIEW_LIST_S3_ITEM:"VIEW_LIST_S3_ITEM",SELECT_S3_ITEM:"SELECT_S3_ITEM",PROTO:"http",HOST:"20.120.53.95",PORT:8080,IMAGES_PATH:"http://20.120.53.95:8080/",FILENAMES:[]}},76:function(e,t,a){"use strict";a.r(t);var c=a(0),i=a.n(c),n=a(20),s=a.n(n),r=(a(46),a(47),a(23)),o=a(19),l=a(2),d=a(3),u=a(4),h=a(5),m=a(7),f=a(29),j=a.n(f),v=(a(41),a(40),a(1));Math.random().toString(36).substr(2,9);var b=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(l.a)(this,a);for(var c=arguments.length,i=new Array(c),n=0;n<c;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={imageState:null,update:!1,url:"",score_test:"0.00",score_validation:"0.00",filenames:[]},e}return Object(d.a)(a,[{key:"fetchData",value:function(){var e=this;j.a.get(m.PROTO+"://"+m.HOST+":"+m.PORT+"/backend/images/20").then((function(t){for(var c=0,i=0;i<t.data.paths.length;i++)c=0===t.data.drifted[i]?0:1,a.stateData[a.stateData.length]={image:m.IMAGES_PATH+t.data.paths[i],checked:!1,viewed:!1,drifted:c,predicted:"Not yet known",path:t.data.paths[i].replace("images/temp/","").replace("-resized","")};return e.setState({update:!0}),t})).catch((function(e){console.log(e)}))}},{key:"componentWillMount",value:function(){this.fetchData()}},{key:"componentDidMount",value:function(){this.setState({imageState:a.stateData})}},{key:"selectCheckbox",value:function(e){this.state.filenames.push(a.stateData[e].path)}},{key:"submitImages",value:function(e){var t=this;e.target;j.a.post(m.PROTO+"://"+m.HOST+":"+m.PORT+"/backend/drift/1000/10/face_aging",{filenames:this.state.filenames}).then((function(e){document.body.style.cursor="wait";var c=e.data.predictions,i=e.data.score_test,n=e.data.score_validation;if(a.stateData.length>0){for(var s in a.stateData){var r=Object.create(a.stateData[s],{});r.image in t.state.filenames?a.stateData[s]={image:r.image,checked:r.checked,viewed:r.viewed,drifted:r.drifted,predicted:c[s].y_pred_test,path:r.path}:a.stateData[s]={image:r.image,checked:r.checked,viewed:r.viewed,drifted:r.drifted,predicted:"Not yet known",path:r.path}}t.setState({imageState:a.stateData,score_test:i,score_validation:n}),console.log(i,n),document.body.style.cursor="default"}})).catch((function(e){console.log(e)}))}},{key:"selectAllCheckBoxes",value:function(e){for(var t in e)this.state.filenames.push(a.stateData[e[t]].path);var c,i=document.querySelectorAll(".checkbox_images"),n=Object(o.a)(i);try{for(n.s();!(c=n.n()).done;){var s=c.value;s.checked?s.checked=!1:s.checked=!0}}catch(r){n.e(r)}finally{n.f()}return!0}},{key:"render",value:function(){var e=this,t=this.props.imageState,c=null,i=[];for(var n in t)a.stateData[n]=t[n];return this.state.imageState&&(c=this.state.imageState.map((function(t,a){var c="checkbox["+a.toString()+"]";return i.push(a),Object(v.jsxs)("div",{className:"image-box image-grid-item",children:[Object(v.jsx)("div",{className:"image-tile",children:Object(v.jsx)("img",{src:t.image,alt:""})}),Object(v.jsx)("div",{className:"image-tile",children:t.path}),Object(v.jsx)("div",{className:"image-checkbox",children:Object(v.jsx)("input",{type:"checkbox",className:"checkbox_images",name:c,onChange:function(){return e.selectCheckbox(a)}})}),Object(v.jsx)("div",{className:"image-caption",children:Object(v.jsxs)("em",{children:["Drifted: ",t.drifted,", Prediction: ",t.predicted]})})]},a)}))),Object(v.jsxs)("div",{className:"clearfix",children:[Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("h1",{className:"heading",children:"PREDICTING FACE IMAGE GRID FOR DRIFT"})}),Object(v.jsx)("div",{className:"row",children:Object(v.jsxs)("label",{children:["Select All ",Object(v.jsx)("input",{type:"checkbox",name:"Select_all",value:"1",onClick:function(){return e.selectAllCheckBoxes(i)}})]})}),Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("button",{onClick:function(t){return e.submitImages(t)},children:"Submit Image(s)"})}),Object(v.jsx)("div",{className:"row image-grid",children:c}),Object(v.jsxs)("div",{className:"row",children:["Score Test (Accuracy): ",Object(v.jsx)("em",{className:"text-color-red",children:this.state.score_test})]}),Object(v.jsxs)("div",{className:"row",children:["Score Validation (Accuracy): ",Object(v.jsx)("em",{className:"text-color-blue",children:this.state.score_validation})]}),Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("button",{onClick:function(t){return e.submitImages(t)},children:"Submit Image(s)"})})]})}}]),a}(i.a.Component);b.stateData=[];var g=function(e){return{type:m.VIEW_LIST_S3_ITEM,item:{viewed:!0,name:e},evaluate:function(e){for(var t=0,a=null,c={},i=0;i<e.length;i++)t=e[i],a=b.stateData[t],c[t]={image:a.image,checked:a.checked,viewed:!0,drifted:a.drifted};return c}}},p=function(e){return{type:m.SELECT_S3_ITEM,item:{viewed:!0,name:e},evaluate:function(e){for(var t=0,a=null,c={},i=0;i<e.length;i++)t=e[i],a=b.stateData[t],c[t]={image:a.image,checked:!0,viewed:a.viewed,drifted:a.drifted};return c}}},O=Object(r.b)((function(e){return{imageState:e.imageState}}),(function(e){return{onLoad:function(t){e(g(t))},onSelect:function(t){e(p(t))}}}))(b);var S=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)("header",{className:"row",children:Object(v.jsx)(O,{})})})},x=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,78)).then((function(t){var a=t.getCLS,c=t.getFID,i=t.getFCP,n=t.getLCP,s=t.getTTFB;a(e),c(e),i(e),n(e),s(e)}))},k=a(24),_=Object(k.a)({imageState:function(){arguments.length>0&&void 0!==arguments[0]||b.stateData;var e=arguments.length>1?arguments[1]:void 0;switch(e.type){case m.VIEW_LIST_S3_ITEM:case m.SELECT_S3_ITEM:var t=e.evaluate(e.item.name);return t;default:return{}}}}),T=_,I=Object(k.b)(T);s.a.render(Object(v.jsx)(r.a,{store:I,children:Object(v.jsx)(S,{})}),document.getElementById("root")),x()}},[[76,1,2]]]);
//# sourceMappingURL=main.58b2ee13.chunk.js.map