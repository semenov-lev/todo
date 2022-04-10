import React from "react";


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            created_by: '',
            project: ''
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
        this.props.createToDo(
            this.state.name,
            this.state.description,
            this.state.created_by,
            this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <div className="container py-5 h-50 card d-flex justify-content-center align-items-center">
                <div className="card-header m-2"><h1>Создание новой заметки ToDo</h1></div>
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
                                        onChange={(event) => this.handleSelectUsers(event)}>
                                    {this.props.users.map((user) => <option key={user.id}
                                                                            value={user.id}>{user.username}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-outline-info btn-lg px-5" type="submit">Создать
                    </button>
                </form>
            </div>
        )
    }
}

export default ToDoForm;
