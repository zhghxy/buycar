
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

export function initItem(type){
    /*return new Promise(function(resolve,reject){
        dispatch({type:'INIT-START'});
        return sendRequest(1).then(function(response){
            console.log(response);
            return{
                type:'INIT',
                result:response
            }
        });
    })*/
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
                        price:Math.round(parseFloat(e.price)*100)/100
                    }
                })
            })
        );
    }
    

   /* return {
        type:'INIT',
        result:[
            {
                header:'大牌店铺',
                name:"简爱",
                price:20,
                image:"../photo/1.jpg"
            },
            {
                header:'大牌店铺',
                name:"简爱1",
                price:20,
                image:"../photo/1.jpg"
            },
            {
                header:'奶粉冲调',
                name:"优选",
                price:20,
                image:"../photo/1.jpg"
            },
            {
                header:'进口食品',
                name:"优选",
                price:20,
                image:"../photo/1.jpg"
            }
        ]
    }*/
}

//获得单个标题下的信息
export function getByHeader(name){
    return {
        type:'GET',
        header:name
    }
}

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
     /*
    return {
        type:'INIT-HEADER',
        headerList:headers
    }*/
}

//页面滚动时设置高亮条目
export function activePage(i){
    return{
        type:'ACTIVE',
        active:i
    }
}

export function addItem(e){
    /*return{
        type:'ADD',
        item:{
            name:e.name,
            price:e.price,
            count:e.count
        }
    }*/
    return (dispatch,getState)=>{
        dispatch({type:'ADD-START'});
        return sendRequest("keyword=3&&id="+e.id+"&&count="+e.count).then(
            ()=>dispatch({
                type:'ADD',
                item:{
                    id:e.id,
                    name:e.name,
                    price:e.price,
                    count:e.count
                }
            })
        )
    }
}