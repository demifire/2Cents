import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './EditDraftPostForm.css';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

//Actions
import { getTypeAndDraftPostData, addNewPost, addNewPostFromDraft, editDraftPost } from '../../actions/actions.js'

class EditDraftPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      subject: "",
      body: "",
      type_id: "",
      price: ""
    }
  }

  //This will set state from props everytime props changes
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.detailedDraftPost !== prevState.detailedDraftPost) {
      return {
        original: {
          user_id: nextProps.user.id,
          subject: nextProps.detailedDraftPost.subject,
          body: nextProps.detailedDraftPost.body,
          type_id: nextProps.detailedDraftPost.type_id,
          price: nextProps.detailedDraftPost.price
        }
      };
    }
    else return null;
  }

  componentDidMount() {
    const { name } = jwtDecode(localStorage.getItem('id_token'))
    const { id } = this.props.match.params

    this.props.dispatch(
      getTypeAndDraftPostData(id, name)
    )
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    console.log("On Change - handleChange this.state.form:", this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  //Submit an object called form and iterate over this.state with for...in to check for which data to use (org data vs newly changed data)
  submittingForm = () => {
    let form = {};

    for (const key in this.state) {
      if (this.state[key] === "") {
        form[key] = this.state.original[key]
      } else {
        form[key] = this.state[key]
      }
    }
    //Because form was created from an iteration of this.state, form now also includes original. Delete original to dispatch a clean form to axios
    delete form.original;

    return form;
  }

  addToPosts = () => {
    this.props.dispatch(
      addNewPostFromDraft(this.props.detailedDraftPost.id, this.submittingForm())
    );
  }


  editToDraftPosts = () => {
    this.props.dispatch(
      editDraftPost(this.props.detailedDraftPost.id, this.submittingForm())
    );
  }

  DefaultType = () => {
    if (!this.props.detailedDraftPost.type_id) {
      return <option>Select Media Type...</option>
    } else {
      return (<option key={this.props.detailedDraftPost.type_id} value={this.props.detailedDraftPost.type_id}>
        {this.props.type.filter(type => type.id === this.props.detailedDraftPost.type_id)[0].type}
      </option>)
    }
  }

  SelectType = () => {
    if (!this.props.detailedDraftPost.type_id) {
      return this.props.type.map(line => <option key={line.id} value={line.id}>{line.type}</option>)
    } else {
      return (this.props.type.filter(type => type.id !== this.props.detailedDraftPost.type_id).map(line => <option key={line.id} value={line.id}>{line.type}</option>))
    }
  }

  render() {
    console.log(this.props)
    return (
      <div id="edit-draft-post-container">

        <div id="edit-draft-post-title">Edit Draft Post</div>

        {/* Edit Draft Post form */}
        <form onSubmit={this.handleSubmit}>

          <label className="edit-draft-post-label">Subject:</label>
          <input onChange={this.handleChange} className="user-edit-draft-post-input" type="text" name="subject" defaultValue={this.props.detailedDraftPost.subject} />

          <br />

          <label className="edit-draft-post-label">Body:</label>
          <input onChange={this.handleChange} className="user-edit-draft-post-input" type="text" name="body" defaultValue={this.props.detailedDraftPost.body} />

          <br />

          <label className="edit-draft-post-label">Media Type:
          </label>
          <select onChange={this.handleChange} name="type_id">
            {this.DefaultType()}
            {this.SelectType()}
          </select>

          <br />

          <label className="edit-draft-post-label">Set a Price:</label>
          <input onChange={this.handleChange} className="user-edit-draft-post-input" type="text" name="price" defaultValue={this.props.detailedDraftPost.price} />


          <br />
          <input id="user-edit-draft-post-btn" type="submit" value="Submit new request" onClick={this.addToPosts} />

          <input id="user-save-draft-post-btn" type="submit" value="Save draft for later" onClick={this.editToDraftPosts} />
          <br />
        </form>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    type: state.type,
    detailedDraftPost: state.detailedDraftPost
  }
}

export default connect(mapStateToProps)(EditDraftPostForm);