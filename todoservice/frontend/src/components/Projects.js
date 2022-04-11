import React from "react"
import {Link} from "react-router-dom"


const ProjectItem = ({project, deleteButton}) => {
    let todos = project.todos ? project.todos : []
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
                <a style={{color: "black"}} href={project.rep_url}>{project.rep_url}</a>
            </td>
            <td>
                {project.status}
            </td>
            <td>
                {project.deadline_timestamp ? project.deadline_timestamp : "Не назначен"}
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
                    {project.users.map((user) => <li key={user}>{user}</li>)}
                </ul>
            </td>
            <td style={{textAlign: "center"}}>
                <button type="button" className="btn btn-outline-danger btn-lg"
                        onClick={() => deleteButton(project.id)}>Удалить
                </button>
            </td>
        </tr>
    )
}


const ProjectsList = ({projects, deleteButton}) => {
    projects = projects ? projects : []
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
                    ToDo
                </th>
                <th>
                    Участники
                </th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project={project} deleteButton={deleteButton} key={project.id}/>)}
            </tbody>
        </table>
    )
}


const ProjectsPage = ({page, deleteProject, handleChange, handleSubmit, search_field, handleCancel}) => {
    return (
        <div>
            <div className="d-flex justify-content-around align-items-center mt-3">
                <h3>Количество проектов: {page.count}</h3>
                <div className="alert alert-success" role="alert">
                    <Link className="alert-link" to='/projects/create'>Создать новый проект</Link>
                </div>
                <div>
                    <form className="form-group d-flex align-items-stretch" onSubmit={(event) => handleSubmit(event)}>
                        <div className="d-flex align-items-stretch">
                            <label>
                                Поиск по имени
                                <input className="form-control"
                                       type="text"
                                       placeholder="Введите наименование проекта"
                                       name="search_field"
                                       value={search_field}
                                       onChange={(event) => handleChange(event)}/>
                            </label>
                            <button className="btn btn-outline-info btn-default" type="submit">Поиск</button>
                        </div>
                        <div className="d-flex align-items-stretch">
                            <button className="btn btn-outline-danger btn-sm" type="reset" onClick={(event) => handleCancel(event)}>Отменить</button>
                        </div>
                </form>
            </div>
        </div>
    <ProjectsList projects={page.results} deleteButton={deleteProject}/>
</div>
)
}


export default ProjectsPage;
