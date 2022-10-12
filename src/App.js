import React from 'react';
import './App.scss';
import $ from 'jquery'; 


//$(document).ready(function(){
//  $(".expand-button").focus(function(){
//    $(".text-area").css("height", "90vh");
//  });
//  $("button").blur(function(){
//    $(".text-area").css("height", "30vh");
//  });
//});




class TitleBar extends React.Component{
  constructor(props){
    super(props);
    this.state={textheight:""};
   

  }
 
 //function to expand this area and hide other text areas 
expandArea(){
   $(".title-bar .title-icon-shrink").css("display","inline-block");
    $(".title-bar .title-icon-expand").css("display","none")

    $(".expandable").css("display","none");
    $(this.props.targetElement).css("display", "inline-block");
    let textAreaEllement=this.props.targetElement+" .text-area";
    $(textAreaEllement).css("height", "100vh");
    this.setState({textheight:$(textAreaEllement.css("height"))});
  };


  shrinkArea(){
    $(".title-bar .title-icon-shrink").css("display","none");
     $(".title-bar .title-icon-expand").css("display","inline-block")
     $(".expandable").css("display","inline-block");
     let textAreaEllement=this.props.targetElement+" .text-area";
     $(textAreaEllement).css("height", this.state.textheight);
   };
 

  render(){
    return(
      <div className="title-bar">
      <div className="title-heading">
       {this.props.title}
      </div>
      <div className="title-icon-expand"><button  onClick={()=>{this.expandArea();;}} className="expand-button">X</button></div>
      <div className="title-icon-shrink"><button onClick={()=>{this.shrinkArea();;}}>S</button></div>
      </div>
    );
  }
}



class Editor extends React.Component{

  render(){
    return(
      <div className="editor expandable">
       <TitleBar targetElement={".editor"} title={"EDITOR"} />
       <div className="mb-2">
  <textarea className="form-control text-area editor-area" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
        </div>
    )
  }
}


class Previewer extends React.Component{

  render(){
    return(
      <div className="previewer expandable">
       <TitleBar targetElement={".previewer"} title={"PREVIEWER"}/>
       <div className="mb-2">
  <textarea className="form-control text-area previewer-area" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
        </div>
    )
  }
}




function App() {
  return (
    <div className="MyApp container">
      <div className="row">
      <Editor/>
      first
      </div>
      <div className='row'>
      <Previewer/>

        secod
      </div>

        <p>
          Edi <code>src/App.js</code> and save it to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

    </div>
  );
}

export default App;
