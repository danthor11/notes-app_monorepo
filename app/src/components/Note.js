import { useState } from "react";
import { Link } from "react-router-dom";

export const Note = ({content,date,important,id}) => {
   const [importantBtn, setImportantBtn] = useState(important);
    return (
        <li>
          <Link to={`/notes/${id}`}>{content}</Link>
          <button style={{display:"block"}} onClick={() => setImportantBtn(!importantBtn)}>
            {importantBtn ? "Make not important" : "Make Important"}
          </button>
          <small>{date}</small>
        </li>
    )
}