import React from "react";
import {Link, useParams} from "react-router-dom";


const ProjectTable = ({project}) => {
    let users = project.users ? project.users : []
    let todos = project.todos ? project.todos : []
    return (
        <table>
            <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Наименование
                </th>
                <th>
                    Описание
                </th>
                <th>
                    Ссылка на репозиторий
                </th>
                <th>
                    Статус
                </th>
                <th>
                    Дедлайн
                </th>
                <th>
                    Время создания
                </th>
                <th>
                    Время обновления
                </th>
                <th>
                    ToDo
                </th>
                <th>
                    Участники
                </th>
                <th>
                    Действия
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    {project.id}
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.description}
                </td>
                <td>
                    <a href={project.rep_url}>Репозиторий</a>
                </td>
                <td>
                    {project.status}
                </td>
                <td>
                    {project.deadline_timestamp}
                </td>
                <td>
                    {project.create_timestamp}
                </td>
                <td>
                    {project.update_timestamp}
                </td>
                <td>
                    <ul>
                        {todos.map((todo) => <li key={todo.name}>{todo.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {users.map((user) => <li key={user}>{user}</li>)}
                    </ul>
                </td>
                <td className="m-auto">
                    <Link className="list-group-item list-group-item-action link-primary mb-3"
                          to={`/project/update/${project.id}`}>Изменить проект</Link>
                    <Link className="list-group-item list-group-item-action link-primary"
                          to={`/todos/create/${project.id}`}>Добавить ToDo</Link>
                </td>
            </tr>
            </tbody>
        </table>
    )
}


const ProjectDetail = ({setCurrentProject, project}) => {
    let {id} = useParams();
    setCurrentProject(id)
    return (
        <div>
            <ProjectTable project={project}/>
        </div>
    )
}


export default ProjectDetail;
