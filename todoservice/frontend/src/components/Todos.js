import React from "react"


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                <a href={todo.url}>{todo.name}</a>
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
                <a href={todo.created_by}>{todo.created_by}</a>
            </td>
            <td>
                <a href={todo.project}>{todo.project}</a>
            </td>
        </tr>
    )
}


const TodosList = ({todos}) => {
    return (
        <table>
            <thead>
            <tr>
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
                    Автор
                </th>
                <th>
                    Проект
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
    if (Object.keys(page).length > 0) {
        localStorage.setItem('todos_page', JSON.stringify(page))
    } else {
        page = JSON.parse(localStorage.getItem('todos_page'))
    }
    return (
        <div>
            <h1>Количество записей: {page.count}</h1>
            <TodosList todos={page.results}/>
        </div>
    )
}


export default TodosPage
