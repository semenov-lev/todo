import React from "react"


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>
                    id
                </th>
                <th>
                    Имя пользователя
                </th>
                <th>
                    Имя
                </th>
                <th>
                    Фамилия
                </th>
                <th>
                    email
                </th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => <UserItem user={user} key={user.id}/>)}
            </tbody>
        </table>
    )
}


const UsersPage = ({page}) => {
    if (Object.keys(page).length > 0) {
        localStorage.setItem('users_page', JSON.stringify(page))
    } else {
        page = JSON.parse(localStorage.getItem('users_page'))
    }
    return (
        <div>
            <h1>Количество записей: {page.count}</h1>
            <UserList users={page.results}/>
        </div>
    )
}


export default UsersPage
