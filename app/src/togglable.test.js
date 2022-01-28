import React, { Component } from "react";
import "@testing-library/jest-dom/extend-expect"
import { render , fireEvent} from "@testing-library/react"
import {Note} from "./Note"
import {prettyDOM}  from "@testing-library/dom"
import {Togglable} from "./Togglable"
import i18n from "./i18n/index"

describe('Togglable', () => {
    const buttonLabel = "show"
    let component 

    beforeEach(()=>{
        component = render(
            <Togglable message={buttonLabel}>
                <div>TextDivContent</div>
            </Togglable>
        )
    })

    test('Renders its children but they are not visible', () => {
        const el = component.getByText("TextDivContent")
        expect(el.parentNode).toHaveStyle("display:none")
    });
    
    test('After clicking it will show', () => {
        const el = component.getByText("TextDivContent")
        expect(el.parentNode).toHaveStyle("display:none")
        
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        
        expect(el.parentNode).toHaveStyle("display:block")
    });

    test('toggled content can be closed', () => {
        const cancelBtn = component.getByText(i18n.TOGGLABLE.cancelButton)
        expect(cancelBtn.parentNode).toHaveStyle("display:none")

        fireEvent.click(cancelBtn)

        expect(cancelBtn.parentNode).not.toHaveStyle("display:none")

    });
    

    

});
