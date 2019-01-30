const f = {
    //添加至session
    setSession(obj){
        let session = window.sessionStorage.playList;
        let playList = JSON.parse(session);
        console.log(playList)
        console.log(playList.some((v)=>{
            return obj == v;
        }))
        playList.push(obj);
        window.sessionStorage.setItem("playList",JSON.stringify(playList));
      },
};
export default f;