const f = {
    //添加至session
    setSession(obj){
        let session = window.sessionStorage.playList;
        let playList = JSON.parse(session);
        // console.log(session)
        console.log(playList.some((v)=>{
            return obj == v;
        }))
        playList.push(obj);
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