import React from "react";


const UsersList = ({user}) => {
    return(
        <li>{user}</li>
    )
}


const ProjectItem = ({project}) => {
    return (
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
                   {/*{project.users.map((user) => <UsersList user={user} key={user}/>)}*/}
                </ul>
            </td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
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
            {projects.map((project) => <ProjectItem project={project} key={project.id}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList;
