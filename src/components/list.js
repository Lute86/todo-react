import {useState} from 'react';
import './list.css'
import Alarm from './alarm'
import useLocalStorage from '../hooks/useLocalStorage';


const ToDo = () => {

  const [list, setList] = useLocalStorage('task-list',[]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showAlarm, setShowAlarm] = useState({
    show:false, 
    type:'', 
    msg:''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!task){
      handleAlarm(true, 'danger', 'Enter a task');
    }
    else if( task && isEditing){
      setList(list.map((item)=>{
        if(item.id===editId){
          return {...item,title:task}
        }else{
        return item}
      }));
      handleAlarm(true,'success','Task modified')
      setEditId(null);
      setIsEditing(false);
      setTask('');
    }
    else{
      const newTask = {id:new Date().getTime().toString(), title:task, overline:false};
      setList([...list,newTask]);
      handleAlarm(true,'success','Task added')
      setTask('');} 
  };

  const handleEdit = (llave) => {
    const editedItem = list.find((item)=>{return item.id===llave});
    setList(list.map((item)=>{
      const {id} = item;
      if(llave===id){
        return {...item, overline:false};
      }
      return item
    }))
    setIsEditing(true);
    setEditId(llave);
    setTask(editedItem.title)
  };

  const handleAlarm = (show, type, msg) => {
    setShowAlarm({show, type, msg});
  };

  const removeAll = () => {
    setList([]);
    handleAlarm(true, 'success', 'List succesfully emptied')
  };

  const handleClick = (llave) => {
    
    setList(list.map((item)=>{
      const {id, task, overline} = item;
      if(llave===id){
        return {...item, overline:!overline}
      }
      return item;
    }))
  }

  return (
    <div className='primary'>
      <form onSubmit={handleSubmit} className='container'>
        <h3>To do list</h3>
        <input type='text' placeholder='Enter task' value={task} onChange={(e)=>setTask(e.target.value)} />
        <button className='submit-btn'>Submit</button>
      </form>
      <ul>
        {list.map((item)=>{
        const {id, title, overline} = item;

        return <li className={isEditing && item.id===editId?'list isEditing':'list'} key={id}>
          <div style={{textDecoration:overline?'line-through':'none'}} onClick={()=>handleClick(id)}><p style={{textDecoration:overline?'line-through':'none'}}>{title}</p> </div>
          <div className='botones'>
          {/* style caso B idStyle===id && overly */}
          <button onClick={()=>handleEdit(id)}>
            Edit
          </button>
          <button className='delete' onClick={()=>{
            setList(list.filter((item)=>{return item.id!==id}))
            handleAlarm(true, 'success', 'Task succesfully deleted')
            if(isEditing){
              setEditId(null);
              setIsEditing(false);
              setTask('');
            }
            }}>
            Delete
          </button>
          </div>
        </li>
        })}  
      </ul>

      {list.length>1 && <button className='delete clear-btn' onClick={removeAll}>Clear All</button>}
      {showAlarm.show && <Alarm value={showAlarm} handleAlarm={handleAlarm} list={list} />}
    </div>
    

  )
};


export default ToDo;