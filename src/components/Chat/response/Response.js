import React from "react";
import "./response.css";
import { FaGg} from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { Image } from "antd";


function Response({ loading, responseResult }) {

  const renderTable = (data)=>{
    if(data.length !== 0){
    return(
        <div  className="response-main-table-container">
          <table>
            <thead>
              <tr style={{ textAlign: "center"}}>
                {Object.keys(data[0])?.map((column, index) => (
                  <th className="table_heading" key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  {Object.keys(data[0])?.map((column, colIndex) => (
                    <td className="table_column" key={colIndex}>{item[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
  }
  }

  const convertResponseDfToArray = (responseDf) => {
    return Object.entries(responseDf).map(([key, value]) => ({
      " ": key,
      "": value
    }));
  };

  return (
    <div className='container-response'>
      <span><FaGg/></span>
      {
        !loading ? <BeatLoader size={15}  color="#0b87f8" style={{ backgroundColor: 'transparent' }} />
        :  
        (
          <>
            <div style={{ overflow: 'auto' }}>
              {(responseResult?.hasOwnProperty('table') && responseResult['table'] !== "None" )&& (
                Array.isArray(responseResult.table) ? 
                (renderTable(responseResult?.table))
                :
                (renderTable(convertResponseDfToArray(responseResult?.table)))
              )}

              {(responseResult?.hasOwnProperty('llm2_response') && responseResult['llm2_response'] !== "None") && (
                <p>
                  {responseResult?.llm2_response}
                </p>
              )}
              
              {(responseResult?.hasOwnProperty('image') && responseResult['image'] !== "None") && (
                <Image
                  src={`data:image/jpeg;base64,${responseResult?.image}`}
                  alt="result image"
                />
              )}

              {(responseResult?.hasOwnProperty('text') && responseResult['text'] !== "None") && (
                <p>
                  {responseResult?.text}
                </p>
              )}
            </div>
          </>
        )
      }
   
    </div>
  );
}

export default Response;