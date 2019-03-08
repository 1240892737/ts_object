const f = {
    //添加至session
    setSession(obj){
        let session = window.sessionStorage.getItem('playList');
        if(!session){
            // console.log(obj)
            let arr = [];
            arr.push(obj);
            window.sessionStorage.setItem("playList",JSON.stringify(arr));
            return;
        }
        let playList = JSON.parse(session);
        // console.log(playList);
        let index = 0;
        if(playList.some((v,i)=>{index=i; return obj.id == v.id;})){
            playList.splice(index,1);
        }else{
            if(playList.length>=50) playList.shift();
        }
        // console.log(session)
        // console.log(playList.some((v)=>{
        //     return obj == v;
        // }))
        playList.push(obj);
        console.log(playList)
        window.sessionStorage.setItem("playList",JSON.stringify(playList));
      },
    //处理音频时间
    timerdispose(currentTime){
        currentTime = Math.floor(currentTime);
        let currentMinute = Math.floor(currentTime/60);
        if(currentMinute<10) currentMinute = '0'+currentMinute;
        let currentSec = Math.floor(currentTime%60);
        if(currentSec<10) currentSec = '0'+currentSec;
        return currentMinute +':'+ currentSec;
    },
    timeDays(time){
        time = new Date(time);
        let nowTime1 = new Date();
        let todayTime = new Date(new Date().toLocaleDateString()).getTime()/1000;
        let diffTime = (nowTime1 - time)/1000;
        if(diffTime<180) return "刚刚";
        if(diffTime<3600) return Math.floor(diffTime/60)+"分钟前";
        // if(diffTime<10800) return Math.floor(diffTime/3600)+"天前";
        if(time/1000 > todayTime) return `${this.duoling(time.getHours())}:${this.duoling(time.getMinutes())}`;
        if(nowTime1.getFullYear()!= time.getFullYear()) return `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 ${this.duoling(time.getHours())}:${this.duoling(time.getMinutes())}`;
        return `${time.getMonth()+1}月${time.getDate()}日 ${this.duoling(time.getHours())}:${this.duoling(time.getMinutes())}`;
    },
    duoling(num){
       return num<10?'0'+num:num;
    },
    setLocal(name,res){
        window.localStorage.setItem(name,JSON.stringify(res));
    },
    getLocal(name){
        return JSON.parse(window.localStorage.getItem(name));
    },
    myArrdel(arr,target){
        let index = arr.indexOf(target);
        if(index!=-1){
            arr.splice(index,1);
            console.log(arr)
        }
        return arr;
    },
    setlocalLog(target){
        if(window.localStorage.getItem('localLog')==null) f.setLocal('localLog',[]);
        let localLog = f.getLocal('localLog');
        f.myArrdel(localLog,target)
        localLog.push(target);
        while(localLog.length>10){
            localLog.shift();
        }
        f.setLocal('localLog',localLog);
    },
    compose(...arg){
        return (result)=>{
            return arg.reduceRight((result,fn)=>{
                return fn(result);
            },result);
        }
    },
    searchName(val,searchName){
        let val1 = val.toLowerCase();
        let searchNameL = searchName.toLowerCase();
        let index = val1.indexOf(searchNameL);
        if(index == -1) return val;//如果找不到直接返回
        let str1 = val.slice(0,index);
        let str3 = val.slice(index,index+searchNameL.length);
        let str2 = val.slice(index+searchNameL.length);
        return `${str1}<span style="color:#78C9EF;">${str3}</span>${str2}`
    },
    isNaN_null(res){
        if(!isNaN(res)&&res!=null)
        return true;else return false;
    }
};
export default f;