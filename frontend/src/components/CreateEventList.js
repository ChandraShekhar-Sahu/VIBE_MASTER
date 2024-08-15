import React from "react";



export default class CreateEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EventTitle: '',
            EventDescription: "",
        };
        this.changeTitle = this.changeTitle.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
    }


    changeTitle(event) {
        this.setState({ EventTitle: event.target.value });
    }

    changeDescription(event) {
        this.setState({ EventDescription: event.target.value });
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onCreateEvent({
            title: this.state.EventTitle,
            description: this.state.EventDescription || "Default description",
            completed: false // Assuming the property is `completed` instead of `complete`
        });
        this.setState({ EventTitle: '', EventDescription: '' });
    }

    render() {
        return (
            <div className=" font-bold text-2xl px-4 text-slate-50">
            <form className="event-form my-5 bg-slate-500 shadow-slate-400 rounded shadow-xl " onSubmit={this.submitForm}>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 pl-6 pt-6">
                        <label htmlFor="eventtitle" className="form-label px-2 pl-3 pb-4">Event Name:</label>
                        <input
                            type="text"
                            className="form-control pl-3"
                            id="eventtitle"
                            placeholder="ENTER EVENT NAME HERE!!"
                            value={this.state.EventTitle}
                            onChange={this.changeTitle}
                        />
                    </div>
                    <div className="col-md-6 mb-3 pr-6 pt-6">
                        <label htmlFor="description" className="form-label px-2 pl-3 pb-4">Event Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="ENTER EVENT DETAILS HERE!! Time, venue, date etc"
                            value={this.state.EventDescription}
                            onChange={this.changeDescription}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-4 ">
                    <button className="btn btn-success text-lg font-bold" type="submit">
                        ADD
                    </button>
                </div>
            </form>
            </div>
        )
    }
}
