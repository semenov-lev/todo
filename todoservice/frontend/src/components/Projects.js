import React from "react";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.username}
            </td>
            <td>
                {project.first_name}
            </td>
            <td>
                {project.last_name}
            </td>
            <td>
                {project.email}
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

export default UserList;
