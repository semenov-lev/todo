import React from "react";


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            created_by: this.props.user_id,
            project: this.props.extra_props.id
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
                                <input className="form-control"
                                       type="text"
                                       readOnly
                                       name="name"
                                       value={this.state.created_by}
                                       onChange={(event) => this.handleChange(event)}/>
                            </label>
                                                        <label>
                                id Проекта
                                <input className="form-control"
                                       type="text"
                                       readOnly
                                       name="name"
                                       value={this.state.project}
                                       onChange={(event) => this.handleChange(event)}/>
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
