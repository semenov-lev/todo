import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            deadline_timestamp: '',
            users: [],
            rep_url: '',
            status: '',
            status_values: {
                'В процессе': 'PRC',
                'Сдан': 'DON',
                'Просрочен': 'EXP',
                'Отменен': 'CNL'
            }
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        if (this.isOperationUpdate()){
           this.props.updateProject(
            this.state.name,
            this.state.description,
            this.state.deadline_timestamp,
            this.state.users,
            this.state.rep_url,
            this.state.status_values[this.state.status])
        }
        else {
            this.props.createProject(
            this.state.name,
            this.state.description,
            this.state.deadline_timestamp,
            this.state.users,
            this.state.rep_url)
        }
        event.preventDefault()
    }

    handleSelectUsers(event) {
        if (event.target.selectedOptions) {
            let selected_users = []
            for (let i = 0; i < event.target.selectedOptions.length; i++) {
                selected_users.push(event.target.selectedOptions.item(i).value)
            }
            this.setState({users: selected_users}, () => console.log(selected_users))
        } else {
            this.setState({users: []}, () => console.log("Пусто"))
        }
    }

    isOperationUpdate() {
        const operation = window.location.href.split("/")[window.location.href.split("/").length - 2]
        return operation === "update"
    }

    convertDate(date) {
        if (date) {
            let date_parts = date.split('.')
            let time_parts = date.split(' ')[1].split(':')
            return new Date(
                parseInt(date_parts[2].slice(0, 4)),
                parseInt(date_parts[1]) - 1,
                parseInt(date_parts[0]),
                time_parts[0],
                time_parts[1],
                time_parts[2]).toISOString().slice(0, -8)
        }
    }

    componentDidMount() {
        if (this.isOperationUpdate()) {
            const users_id = []
            this.props.setCurrentProject(this.props.extra_props.id)
            if (this.props.currentProject.users) {
                for (let i in this.props.users){
                    if (this.props.currentProject.users.includes(this.props.users[i].username)){
                        users_id.push(this.props.users[i].id)
                    }
                }
            }
            this.setState({
                name: this.props.currentProject.name,
                description: this.props.currentProject.description,
                deadline_timestamp: this.convertDate(this.props.currentProject.deadline_timestamp),
                users: users_id,
                rep_url: this.props.currentProject.rep_url,
                status: this.props.currentProject.status
            })
        }
    }

    render() {
        return (
            <div className="container py-5 h-50 card d-flex justify-content-center align-items-center">
                <div className="card-header m-2">
                    <h1>{this.isOperationUpdate() ? "Обновление проекта" : "Создание нового проекта"}</h1></div>
                <form className="form-group d-flex flex-column" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="d-flex justify-content-around">
                        <div className="d-flex flex-column m-2">
                            <label>
                                Наименование
                                <input className="form-control"
                                       type="text"
                                       placeholder="Введите название проекта"
                                       name="name"
                                       value={this.state.name}
                                       onChange={(event) => this.handleChange(event)}/>
                            </label>

                            <label>
                                Дата окончания
                                <input className="form-control"
                                       type="datetime-local"
                                       name="deadline_timestamp"
                                       min={new Date().toISOString().slice(0, -8)}
                                       value={this.state.deadline_timestamp}
                                       onChange={(event) => this.handleChange(event)}/>
                            </label>

                            <label>
                                Описание
                                <textarea className="form-control"
                                          placeholder="Описание"
                                          name="description"
                                          value={this.state.description}
                                          onChange={(event) => this.handleChange(event)}/>
                            </label>

                            <label>
                                Ссылка на репозиторий
                                <input className="form-control"
                                       type="url"
                                       name="rep_url"
                                       value={this.state.rep_url}
                                       onChange={(event) => this.handleChange(event)}/>
                            </label>
                        </div>
                        <div className="d-flex flex-column m-2">
                            <label>
                                Участники
                                <select className="form-control"
                                        name="users"
                                        multiple
                                        size={8}
                                        onChange={(event) => this.handleSelectUsers(event)}>
                                    {this.props.users.map((user) =>
                                        <option key={user.id}
                                                value={user.id}
                                                selected={this.state.users.includes(user.id)}>{user.username}
                                        </option>)}
                                </select>
                            </label>

                            {this.isOperationUpdate() ?
                                <label>
                                    Статус
                                    <select className="form-select"
                                            name="status"
                                            value={this.state.status}
                                            onChange={(event) => this.handleChange(event)}>
                                        <option value={'Сдан'}
                                                selected={this.state.status === 'Сдан'}>Сдан
                                        </option>
                                        <option value={'В процессе'}
                                                selected={this.state.status === 'В процессе'}>В процессе
                                        </option>
                                        <option value={'Просрочен'}
                                                selected={this.state.status === 'Просрочен'}>Просрочен
                                        </option>
                                        <option value={'Отменен'}
                                                selected={this.state.status === 'Отменен'}>Отменен
                                        </option>
                                    </select>
                                </label> : null}
                        </div>
                    </div>
                    <button className="btn btn-outline-info btn-lg px-5"
                            type="submit">{this.isOperationUpdate() ? "Обновить" : "Создать"}
                    </button>
                </form>
            </div>
        )
    }
}

export default ProjectForm;
