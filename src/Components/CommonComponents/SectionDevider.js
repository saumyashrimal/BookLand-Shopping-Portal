import React from 'react'

function SectionDevider(props) {
    return (
        <>
            <hr className="float-start solid" width={props.lwidth} />
            <hr className="float-end solid" width={props.lwidth} />
            <p className="text-secondary">{props.text}</p>
        </>
    )
}

export default SectionDevider
