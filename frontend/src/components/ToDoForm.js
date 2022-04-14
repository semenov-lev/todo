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
        if (this.isOperationUpdate()) {
            this.props.updateToDo(
                this.state.name,
                this.state.description,
                this.state.created_by,
                this.state.project)
        } else {
            this.props.createToDo(
                this.state.name,
                this.state.description,
                this.state.created_by,
                this.state.project)
        }
        event.preventDefault()
    }

    isOperationUpdate() {
        const operation = window.location.href.split("/")[window.location.href.split("/").length - 2]
        return operation === "update"
    }

    componentDidMount() {
        if (this.isOperationUpdate()) {
            this.props.setCurrentToDo(this.props.extra_props.id)
            this.setState({
                name: this.props.currentToDo.name,
                description: this.props.currentToDo.description,
                created_by: this.props.currentToDo.created_by,
                project: this.props.currentToDo.project
            })
        } else {
            this.setState({
                created_by: this.props.user_id,
                project: this.props.extra_props.id
            })
        }
    }

    render() {
        return (
            <div className="container py-5 h-50 card d-flex justify-content-center align-items-center">
                <div className="card-header m-2">
                    <h1>{this.isOperationUpdate() ? "Обновление заметки ToDo" : "Создание новой заметки ToDo"}</h1>
                </div>
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
                                Описание
                                <textarea className="form-control"
                                          placeholder="Описание"
                                          name="description"
                                          value={this.state.description}
                                          onChange={(event) => this.handleChange(event)}/>
                            </label>
                        </div>
                        <div className="d-flex flex-column m-2">
                            <label>
                                id Автора
                                <select className="form-select"
                                        name="created_by"
                                        value={this.state.created_by}
                                        onChange={(event) => this.handleChange(event)}
                                        disabled={!this.isOperationUpdate()}>
                                    {this.props.users.map((user) =>
                                        <option key={user.id}
                                                value={user.id}>{user.username}
                                        </option>)}
                                </select>
                            </label>
                            <label>
                                id Проекта
                                <select className="form-select"
                                        name="project"
                                        value={this.state.project}
                                        onChange={(event) => this.handleChange(event)}
                                        disabled={!this.isOperationUpdate()}>
                                    {this.props.projects.map((project) =>
                                        <option key={project.id}
                                                value={project.id}>{project.name}
                                        </option>)}
                                </select>
                            </label>
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

export default ToDoForm;
