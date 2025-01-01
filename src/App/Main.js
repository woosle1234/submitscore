import React from "react";
import bg from "../Asset/background.png"
import logo from "../Asset/Title Card (white glitched).png"
import badwords from "../Asset/bannedwords.json"
import filteredSound from "../neuro-sama-filtered.mp3"



class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      World: 0,
      Score: 0,
      Name: ""
    };
  }

  async componentDidMount() {

  }

  validateText = (event) => {
    let text = event.target.value.replace(/[^\w\s]/gi, "")
    text = text.replace(/[0-9]*/gi, "")
    this.setState({ Name: text });
  }

  filterText = (text) => {
    let valid = true
    let test = text.replaceAll(" ", "").toLowerCase()
    if (badwords.some(word => test.includes(word))) {
      valid = false
    }

    return valid
  }

  submitScore = async event => {
    event.preventDefault()

    var sound = new Audio(filteredSound)

    let score = 1000000000 - parseInt(event.target.time.value)

    if (this.filterText(event.target.name.value)) {
      let url = process.env.SENDURL + event.target.name.value.trim() + "/" + score + "/" + event.target.world.value

      let response = await fetch(url,{
        method: "GET"
      })
      console.log(response)
      if(response.ok){
        if(response.statusText === "OK")
          window.alert("submitted")
        else
          window.alert("Error: "+response.statusText)
      }else{
        window.alert(res.statusText)
      }

    } else {
      sound.play()
      window.alert("[Filtered]")
    }


  }

  render() {

    return (<div style={{ backgroundImage: `url(${bg})`, width: "100vw" }}>
      <div className="container p-5">
        <div className="row">
          <div className="col mb-3">
            < img className="img-fluid" src={logo} alt="..." />
          </div>
        </div>
        <div className="row">
          <div className="col border border-danger-subtle bg-warning bg-gradient">
            <form className="p-3 " onSubmit={this.submitScore} >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={this.state.Name} onChange={this.validateText} maxLength={15} required />
                <div id="nameHelp" className="form-text" style={{ color: "red" }}>Nothing inapporiate also no numbers or special characters.</div>
              </div>
              <div className="mb-3">
                <select className="form-select" id="world" aria-label="Default select example" defaultValue="0">
                  <option value="0">Vedal's World</option>
                  <option value="1">Evil's World</option>
                  <option value="2">Anny's World</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time in miliseconds (ms)</label>
                <input type="number" className="form-control" id="time" aria-describedby="scoreHelp" required />
                <div id="scoreHelp" className="form-text">Make sure is in miliseconds</div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      

    </div>)

  }
}

export default Main;
