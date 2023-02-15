import { useEffect } from "react";

const Alarm = ({value, handleAlarm, list}) => {

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      handleAlarm();
      console.log('wrong')
      console.log(value.msg)

    },1000)
    return ()=>clearTimeout(timeout);
  },[list]);

  return <p className={value.type}>{value.msg}</p>
}

export default Alarm;