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
        playList.push(obj);
        console.log(playList)
        window.sessionStorage.setItem("playList",JSON.stringify(playList));
      },
};
export default f;