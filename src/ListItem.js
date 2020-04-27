import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item">
        <button className="btn btn-info mr-3" onClick={props.editSkill}>u</button>
        {props.item.skill}
        <button className="btn btn-danger ml-3" onClick={props.deleteSkill}>x</button>
    </li>
}

export default ListItem;