import React from "react";
import { useState , forwardRef , useImperativeHandle} from "react";
import PropTypes from "prop-types"
import i18n from "../i18n/index";

export const Togglable = forwardRef(({children,message ="muestrame esto"},ref) => {
    const [visible, setVisible] = useState(false);
    const hidenWhenVisible = {display:visible ? "none":""}
    const showWhenVisible = {display: visible ? "": "none"}

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref,() => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hidenWhenVisible}>
                <button onClick={toggleVisibility} >{message}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>{i18n.TOGGLABLE.cancelButton}</button>
            </div>
        </>
    )

    
})

Togglable.displayName ="Togglable"

Togglable.propTypes = {
    message : PropTypes.string
}