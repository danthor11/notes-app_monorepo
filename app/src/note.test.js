import React, { Component } from "react";
import "@testing-library/jest-dom/extend-expect"
import { render , fireEvent} from "@testing-library/react"
import {Note} from "./Note"
import {prettyDOM}  from "@testing-library/dom"

test('renders content', () => {
    const note = {
        content:"esto es el debug",
        important : false,
        date: new Date().toISOString()
    }

    const component = render(<Note {...note} />)

    // console.log(component)
    //Buscar contenido
    component.getByText(note.content)
    component.getByText("Make Important")

    // expect(component.container).toHaveTextContent("Caminiones")

    //Muestra todo lo renderizado 

    //component.debug()
     
    //Ver lo que se renderiza
    // const li =component.container.querySelector("li")

    // console.log(prettyDOM(li))

});


// test("clickin the button calls event handler event" , () => {
    
//     const note = {
//         content:"esto es el debug",
//         important : false,
//         date: new Date().toISOString()
//     }


//     const mockHandle = jest.fn()
//     const component = render(<Note {...note} toggleImportance={mockHandle}/>)

//     const button = component.getByText("Make Important")
//     fireEvent.click(button)
//     expect(mockHandle).toHaveBeenCalledTimes(1)
// })


