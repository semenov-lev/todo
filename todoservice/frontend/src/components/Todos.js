import React from "react"


const TodoItem = ({todo}) => {
    return (
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
        </tr>
    )
}


const TodosList = ({todos}) => {
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
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => <TodoItem todo={todo} key={todo.name}/>)}
            </tbody>
        </table>
    )
}


const TodosPage = ({page}) => {
    return (
        <div>
            <h1>Количество записей: {page.count}</h1>
            <TodosList todos={page.results}/>
        </div>
    )
}


export default TodosPage
