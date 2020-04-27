import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newSkills: "",
      editingIndex: null,
      editing: false,
      skills: [{
        id: 1,
        skill: "React"
      }, {
        id: 2,
        skill: "Vue"
      }, {
        id: 3,
        skill: "Angular"
      }]
    }
  }

  handleChange = (event) => {
    this.setState({
      newSkills: event.target.value
    })
  }

  addSkill = () => {
    const newSkills = {
      skill: this.state.newSkills,
      id: this.generateId()
    }

    const skills = this.state.skills;

    skills.push(newSkills);

    this.setState({
      skills: skills,
      newSkills: ""
    })

  }

  editSkill = (index) => {
    const skills = this.state.skills[index];
    this.setState({
      editing: true,
      newSkills: skills.skill,
      editingIndex: index
    })
  }

  updateSkill = () => {

    //get the index of editing skill
    const skill = this.state.skills[this.state.editingIndex];

    //getting skill from text input and assign new skill value
    skill.skill = this.state.newSkills;

    //intializing skills
    const skills = this.state.skills;

    //assigning skill getting from text input
    skills[this.state.editingIndex] = skill;

    //setting skills
    this.setState({ skills, editing: false, editingIndex: null, newSkills: "" })

  }

  deleteSkill = (index) => {
    const skills = this.state.skills;

    delete skills[index];

    this.setState({ skills })
  }

  generateId = () => {
    const lastSkill = this.state.skills[this.state.skills.length - 1];
    if (lastSkill) {
      return lastSkill.id + 1;
    }
    return 1;
  }

  render() {

    return (
      <div className="App">
        <div className="container mt-3">
          <h2>React CRUD</h2>
          <input className="form-control"
            type="text"
            placeholder="Add Your Skills"
            onChange={this.handleChange}
            value={this.state.newSkills}
          />
          <button className="form-control btn btn-info mt-3" onClick={this.state.editing ? this.updateSkill : this.addSkill}>
            {this.state.editing ? 'Update Skill' : 'Add Skill'}
          </button>

          {
            !this.state.editing &&
            <ul className="list-group mt-3">
              {
                this.state.skills.map((item, index) => {
                  return <li key={item.id} className="list-group-item">
                    <button className="btn btn-info mr-3" onClick={() => this.editSkill(index)}>u</button>
                    {item.skill}
                    <button className="btn btn-danger ml-3" onClick={() => this.deleteSkill(index)}>x</button>
                  </li>
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
