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
};
export default f;