import React from "react"
import {Link} from "react-router-dom"


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}<br/>
                <Link to={`/project/${project.id}`}>Просмотр</Link>
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
                    {project.users.map((user) => <li key={user}>{user}</li>)}
                </ul>
            </td>
        </tr>
    )
}


const ProjectsList = ({projects}) => {
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


const ProjectsPage = ({page}) => {
    if (Object.keys(page).length > 0) {
        localStorage.setItem('projects_page', JSON.stringify(page))
    } else {
        page = JSON.parse(localStorage.getItem('projects_page'))
    }
    return (
        <div>
            <h1>Количество записей: {page.count}</h1>
            <ProjectsList projects={page.results}/>
        </div>
    )
}


export default ProjectsPage
