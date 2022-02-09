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
            <td>
                {user.is_superuser}
            </td>
            <td>
                {user.password}
            </td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table>
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
            <th>
                Администратор
            </th>
            <th>
                Пароль
            </th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList
