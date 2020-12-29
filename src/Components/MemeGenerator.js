import React from 'react'
class MemeGenerator extends React.Component{
  constructor(){
    super();
    this.state={
      topText:"",
      bottomText:"",
      randomImg:"http://i.imgflip.com/1bij.jpg", 
      alldata:[]
    }
    this.changefn=this.changefn.bind(this);
    this.handlesubmit=this.handlesubmit.bind(this);
  }
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes").then(response=> response.json()).then(response =>{
      const {memes}=response.data;
      this.setState({alldata:memes
      });
      
    });
  }
  changefn(event){
    const {name,value}=event.target
    this.setState({[name]:value})
  }
  handlesubmit(event){
    event.preventDefault()
    const rand=Math.floor(Math.random()*this.state.alldata.length);
    const randim=this.state.alldata[rand].url
    this.setState({randomImg:randim})
    console.log(this.state.randomImg);

  }
  render(){
    // console.log(this.state.alldata);
return(
    <div>
      
      <form className="meme-form" onSubmit={this.handlesubmit}>
      <input type="text" placeholder="top text"name="topText" value={this.state.topText} onChange={this.changefn}/>
      <input type="text" placeholder="bottom text" name="bottomText" value={this.state.bottomText} onChange={this.changefn}/>
      <button>Gen</button>
      </form>
      <div className="meme">
      <img src={this.state.randomImg} alt=""/>
      <h2 className="top">{this.state.topText}</h2>
      <h2 className="bottom">{this.state.bottomText}</h2>
      </div>
    </div>
  );
  }
}
export default MemeGenerator