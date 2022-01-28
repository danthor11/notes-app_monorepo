import { useState } from "react";

export const Note = ({content,date,important}) => {
   const [importantBtn, setImportantBtn] = useState(important);
    return (
        <li>
          <p>{content}</p>
          <button style={{display:"block"}} onClick={() => setImportantBtn(!importantBtn)}>
            {importantBtn ? "Make not important" : "Make Important"}
          </button>
          <small>{date}</small>
        </li>
    )
}