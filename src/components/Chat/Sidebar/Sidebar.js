import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
// import { AiOutlineFileAdd } from 'react-icons/ai';
import "./sidebar.css";
import { BiLogOut } from "react-icons/bi";



const Sidebar = ({ toggle, toggleHandle, faqsHandle,promptList, chatType, setDisabledFAQ, disabledFAQ  }) => {
  
  const { user, logOut } = useUserAuth();
  // const [ promptList, setPromptList ] = useState([])
  const [initials, setInitials] = useState();
  const [ showPrompt, setShowPrompt ] = useState(false);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setInitials(user.email.substring(0, 1).toUpperCase());
    }
  }, [user.email]);

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const promptHandle = (e)=>{
    setShowPrompt(true)
    console.log('hello')
  }

  return (
    <div className={ toggle ? 'toggle-sidebar ': 'sidebar'}>
      <div className='flex-faqs'>
        <p className='faqs'>FAQs</p>
        {/* <button onClick={()=> toggleHandle()} ><FaBars/></button> */}
      </div>
{
        chatType === 'csv' ?
        <div className='chats'>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""}> What is the distribution of valid complaints across areas?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > What is the distribution of branch ratings in the dataset?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Plot a bar graph of the distribution of branch ratings in the dataset?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > provide me table of the average score for all these LSM,CC,CA,BFA,ATM,VOC,SR,AOP,CB,CRT,PMS,O-EF,VMS performance metric across all branches?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Which branch has the highest total points MTD and which one has the lowest?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > How many branches have valid complaints and behavior complaints?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Provide me the table of the distribution of ratings among different clusters?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > How do branches compare to the overall average or benchmarks in terms of KPI points and other metrics?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Provide me with a table where I can find the "Hall of Shame" Ratings ascending order in result wise?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > How much branch performance differ across different clusters and areas</p>
        </div>
        :
        <div className='chats'>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > What were the amendments to the project documents?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > What is letter of hypothecation?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > What is EPC direct agreement?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > What is acceptable letter of credit?</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Give me summary of environmental,health and safety guidelines.</p>
        <p onClick={(e)=> {
          if(!disabledFAQ){ faqsHandle(e)}
          }} className={disabledFAQ ? "non-clickable-paragraph" : ""} > Give me main points of rules of interpretation?</p>
      </div>
      }
      {/* <div className='flex-faqs'>
      {/* <span onClick={(e)=> promptHandle(e)} > <AiOutlineFileAdd /> </span> */}
        {/* <p className='prompts'>My Prompts  </p> */}
        {/* <button onClick={()=> toggleHandle()} ><FaBars/></button> */}
      {/* </div> */} 
      {/* <div className='prompts-chats'>

        {
          promptList.length === 0 ?  <div>You have no Prompts</div> 
          :
          promptList.map((questions, index) =>(
            <p className="letter-transform" key={index} onClick={(e)=> faqsHandle(e)} >{questions}</p>
          ))
        } */}

        {/* {
          showPrompt ? 
            <div className="prompt-container">
          
              <input type='text' value={'dshsd'} placeholder='Save your prompts' /> 
              <button className="saveBtn">Save</button>
              <button className="cancelBtn" >Cancel</button>
            </div>
            : <></>
        }
         */}
      {/* </div> */}
      <div className='flex-2'>
        {/* <button onClick={handleLogOut}>Log out</button> */}
        <p className="user">
          <span>{initials}</span> {user.email}
          <div onClick={handleLogOut}><BiLogOut style={{ marginLeft: '5px' }} size={30} color='#0b87f8' cursor={'pointer'} /></div>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
