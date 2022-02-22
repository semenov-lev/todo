import React from "react";
import {useParams} from "react-router-dom";


const ProjectTable = ({project}) => {
    let users = project.users ? project.users : []
    return (
        <table>
            <thead>
            <tr>
                <th>
                    id
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
                    Участники
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
                        {users.map((user) => <li key={user}>{user}</li>)}
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    )
}


const ProjectDetail = ({getProject, project}) => {
    let {id} = useParams();
    getProject(id);
    return (
        <div>
            <ProjectTable project={project}/>
        </div>
    )
}


export default ProjectDetail;
