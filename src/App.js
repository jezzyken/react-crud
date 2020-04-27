import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import LoadingGif from './loading.gif'

import ListItem from './ListItem'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      newSkills: "",
      editingIndex: null,
      editing: false,
      notification: null,
      skills: []
    };

    this.apiUrl = "https://5ea65cbd84f6290016ba686f.mockapi.io"

    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.updateSkill = this.updateSkill.bind(this);


  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/skills`);


    setTimeout(() => {
      this.setState({
        skills: response.data,
        loading: false
      })
    }, 1000)

  }

  handleChange = (event) => {
    this.setState({
      newSkills: event.target.value
    })
  }

  async addSkill() {

    // const newSkills = {
    //   skill: this.state.newSkills,
    //   id: this.generateId()
    // }

    const response = await axios.post(`${this.apiUrl}/skills`, {
      skill: this.state.newSkills
    })

    const skills = this.state.skills;

    skills.push(response.data);

    this.setState({
      skills: skills,
      newSkills: ""
    })

    this.alert("Skill Added Successfully");

  }

  editSkill = (index) => {
    const skills = this.state.skills[index];
    this.setState({
      editing: true,
      newSkills: skills.skill,
      editingIndex: index
    })
  }

  async updateSkill() {

    //get the index of editing skill
    const skill = this.state.skills[this.state.editingIndex];


    const response = await axios.put(`${this.apiUrl}/skills/${skill.id}`, {
      skill: this.state.newSkills
    })


    //getting skill from text input and assign new skill value
    //skill.skill = this.state.newSkills;


    //intializing skills
    const skills = this.state.skills;

    //assigning skill getting from text input
    skills[this.state.editingIndex] = response.data;

    //setting skills
    this.setState({ skills, editing: false, editingIndex: null, newSkills: "" })

    this.alert("Skill Updated Successfully");

  }

  async deleteSkill(index) {
    const skills = this.state.skills;
    const skill = skills[index];

    await axios.delete(`${this.apiUrl}/skills/${skill.id}`)

    delete skills[index];

    this.setState({ skills });

    this.alert("Skill Deleted Successfully");
  }

  // generateId = () => {
  //   const lastSkill = this.state.skills[this.state.skills.length - 1];
  //   if (lastSkill) {
  //     return lastSkill.id + 1;
  //   }
  //   return 1;
  // }

  alert = (notification) => {
    this.setState({
      notification
    })

    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 600);
  }

  render() {

    return (
      <div className="App">
        <div className="container mt-3">
          <h2>React CRUD</h2>
          {
            this.state.notification &&
            <div className="alert alert-success">{this.state.notification}</div>
          }

          <input className="form-control"
            type="text"
            placeholder="Add Your Skills"
            onChange={this.handleChange}
            value={this.state.newSkills}
          />
          <button className="form-control btn btn-info mt-3"
            onClick={this.state.editing ? this.updateSkill : this.addSkill}
            disabled={this.state.newSkills.length < 3}>
            {this.state.editing ? 'Update Skill' : 'Add Skill'}
          </button>
          {
            this.state.loading &&
            <img src={LoadingGif} alt="loading" />
          }

          {
            (!this.state.editing || this.state.loading) &&
            <ul className="list-group mt-3">
              {
                this.state.skills.map((item, index) => {
                  return <ListItem
                    key={item.id}
                    item={item}
                    editSkill={() => this.editSkill(index)}
                    deleteSkill={() => this.deleteSkill(index)}
                  />
                })
              }
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
