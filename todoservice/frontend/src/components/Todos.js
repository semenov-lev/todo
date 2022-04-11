import React from "react"
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteButton}) => {
    return (
        <tr>
            <td>
                {todo.id}<br/>
                <Link to={`/todo/${todo.id}`}>Просмотр</Link>
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
            <td style={{textAlign: "center"}}>
                <button type="button" className="btn btn-outline-danger btn-lg"
                        onClick={() => deleteButton(todo.id)}>Удалить
                </button>
            </td>
        </tr>
    )
}


const TodosList = ({todos, deleteButton}) => {
    todos = todos ? todos : []
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
                </th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => <TodoItem todo={todo} key={todo.name} deleteButton={deleteButton}/>)}
            </tbody>
        </table>
    )
}


const TodosPage = ({page, deleteToDo}) => {
    const todos = page.results.filter((todo) => todo.is_active === true)
    return (
        <div>
            <h1>Количество записей: {page.count}</h1>
            <TodosList todos={todos} deleteButton={deleteToDo}/>
        </div>
    )
}


export default TodosPage;
