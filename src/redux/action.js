
export function sendRequest(param){
    const promise=new Promise(function(resolve,reject){
        const client=new XMLHttpRequest();
        client.onreadystatechange=()=>{
            if(client.readyState===4){
                if(client.status==200){
                  resolve(JSON.parse(client.responseText));
                }else{
                  reject(new Error(client.statusText));
                }
           }
        }
        client.open('GET',"http://localhost:8088/BuyCar/buy?"+param);
        client.send();
    })
   return promise;
}

//初始化页面内容
export function initItem(type){
    return (dispatch,getState)=>{
        dispatch({type:'INIT-START'});
        return sendRequest("keyword="+type).then(
            response=>dispatch({
                type:'INIT',
                result:response.result.map(e=>{
                    return {
                        header:e.header,id:e.id,image:e.image,name:e.name,
                        maxcount:parseInt(e.maxcount),
                        price:Math.round(parseFloat(e.price)*100)/100
                    }
                }),
                header:response.header.map(e=>e.header),
                list:response.list.map(e=>{
                    return {
                        id:e.id,
                        count:parseInt(e.count),
                        name:e.name,
                        price:Math.round(parseFloat(e.price)*100)/100,
                        image:e.image
                    }
                })
            })
        );
    }
    
}

//获得单个标题下的信息
export function getByHeader(name){
    return {
        type:'GET',
        header:name
    }
}

//初始化右侧导航
export function setHeader(){
    return (dispatch,getState)=>{
        dispatch({type:'INIT-HEADER-START'});
        return sendRequest("keyword=2").then(
            (response)=>{
                var arr=response.map(e=>e.header);
                
                dispatch({
                type:'INIT-HEADER',headerList:arr
            });}
        )
    }
}

//页面滚动时设置高亮条目
export function activePage(i){
    return{
        type:'ACTIVE',
        active:i
    }
}

//加入购物车
export function addItem(e){
    return (dispatch,getState)=>{
        dispatch({type:'ADD-START'});
        return sendRequest("keyword=3&&id="+e.id+"&&count="+e.count).then(
            ()=>dispatch({
                type:'ADD',
                item:{
                    id:e.id,
                    name:e.name,
                    price:e.price,
                    count:e.count,
                    image:e.image
                }
            })
        )
    }
}