import React from 'react';
import './App.scss';
import $ from 'jquery'; 
import {marked} from 'marked';
import DOMPurify from 'dompurify';

import sanitizeHtml from 'sanitize-html';
import Markdown from 'marked-react';
import { newObjectInRealm } from 'jsdom/lib/jsdom/living/generated/utils';

marked.options({
  breaks:true
})


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
constructor(props){
  super(props)
}




  render(){
    return(
      <div className="editor expandable">
       <TitleBar targetElement={".editor"} title={"EDITOR"} />
       <div className="mb-2">
  <textarea onChange={()=>this.props.typeCallBack($("#editor").val())} className="form-control text-area editor-area" id="editor" rows="3"></textarea>
</div>
        </div>
    )
  }
}


class Previewer extends React.Component{
  constructor(props){
    super(props);

  }


  render(){
    return(
      <div className="previewer expandable">
       <TitleBar targetElement={".previewer"} title={"PREVIEWER"}/>
       <div className="mb-2">
      <div dangerouslySetInnerHTML={{__html:this.props.previewText}}  id="preview" className="preview-settings" rows="3"/>

        <div/>
        </div>
      </div>
        
    )
  }
}






class App extends React.Component {
constructor(props){
  super(props);
  this.state={text:""};
  this.updateText=this.updateText.bind(this);
}


updateText(newText){
  let parsedText=marked.parse(newText);
  let sanitizedText=<div className="preview-settings" dangerouslySetInnerHTML={{__html:parsedText }}></div>
  let markedDown=<Markdown>{newText}</Markdown>;
  let otherSand=DOMPurify.sanitize(marked.parse(newText));
  this.setState({text:parsedText});

}




render(){
  return (
    <div className="MyApp container">
      <div className="row">
      <Editor typeCallBack={(newText)=> this.updateText(newText)}/>
      first
      </div>
      <div className='row'>
      <Previewer previewText={this.state.text}/>
      {this.state.text}
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
}

export default App;
