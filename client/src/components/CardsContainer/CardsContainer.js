import React from "react";

const CardsContainer = props => (
    <div className="container card-deck cards-container my-5 mx-auto">
        {props.children.map((child, i) => {
            return (
                <div 
                    className="col-4 card-container" 
                    key={i}>{child}
                </div>
            )
        })}
    </div>
)


export default CardsContainer;