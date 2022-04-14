import React from "react";
import {Link, useParams} from "react-router-dom";


const ToDoTable = ({todo}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Название
                </th>
                <th>
                    Описание
                </th>
                <th>
                    Дата создания
                </th>
                <th>
                    Дата обновления
                </th>
                <th>
                    id Автора
                </th>
                <th>
                    id Проекта
                </th>
                <th>
                    Действия
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    {todo.id}
                </td>
                <td>
                    {todo.name}
                </td>
                <td>
                    {todo.description}
                </td>
                <td>
                    {todo.create_timestamp}
                </td>
                <td>
                    {todo.update_timestamp}
                </td>
                <td>
                    {todo.created_by}
                </td>
                <td>
                    {todo.project}
                </td>
                <td>
                    <Link className="list-group-item list-group-item-action link-primary mb-3"
                          to={`/todo/update/${todo.id}`}>Изменить ToDo</Link>
                </td>
            </tr>
            </tbody>
        </table>
    )
}


const ToDoDetail = ({setCurrentToDo, todo}) => {
    let {id} = useParams();
    setCurrentToDo(id)
    return (
        <div>
            <ToDoTable todo={todo}/>
        </div>
    )
}


export default ToDoDetail;
