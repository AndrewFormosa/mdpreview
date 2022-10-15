import React from 'react';
import './App.scss';
import $ from 'jquery'; 
import {marked} from 'marked';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

marked.options({
  breaks:true
})

let initText=`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, `+"`<div></div>`"+`, between 2 backticks.

`+"```"+`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '`+"```' && lastLine == '```')"+` {
    return multiLineCode;
  }
}
`+"```"+`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`



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
    $(textAreaEllement).css("height", "100%");
    $(textAreaEllement).css("min-height","80vh");
  


    this.setState({textheight:$(textAreaEllement.css("height"))});

  };


  shrinkArea(){
    $(".title-bar .title-icon-shrink").css("display","none");
     $(".title-bar .title-icon-expand").css("display","inline-block")
     $(".expandable").css("display","inline-block");
     let textAreaEllement=this.props.targetElement+" .text-area";
     $(textAreaEllement).css("height", this.state.textheight);
     $(textAreaEllement).css("min-height","30vh");
   };
 

  render(){
    return(
      <div className="title-bar">
      <div className="title-heading">
       {this.props.title}
      </div>
      <div className="title-icon-expand"><button  onClick={()=>{this.expandArea();;}} className="expand-button"><OpenInFullIcon/></button></div>
      <div className="title-icon-shrink"><button onClick={()=>{this.shrinkArea();;}}><CloseFullscreenIcon/></button></div>
      </div>
    );
  }
}




class Editor extends React.Component{
constructor(props){
  super(props);
  this.state={initialText:initText};}



  render(){
    return(
      <div className="editor expandable">
       <TitleBar targetElement={".editor"} title={"EDITOR"} />
       <div className="mb-2">
  <textarea onChange={()=>this.props.typeCallBack($("#editor").val())} className="form-control text-area editor-area" id="editor" rows="3">{this.state.initialText}</textarea>
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
        <div dangerouslySetInnerHTML={{__html:marked.parse(this.props.previewText)}}  id="preview" className="form-control preview-settings text-area" rows="3"></div>
     </div>
      </div>
        
    )
  }
}




class App extends React.Component {
constructor(props){
  super(props);
  this.state={text:initText};
  this.updateText=this.updateText.bind(this);
}



updateText(newText){
  let parsedText=marked.parse(newText);
  this.setState({text:newText});

}


render(){
  return (
    <div className="MyApp container">
<div className="row">
  <div>
  <h1 className="my-heading my-3 text-center">React Markdown Previewer</h1>
</div>
</div>
      <div className="row">
      <Editor typeCallBack={(newText)=> this.updateText(newText)}/>
      </div>
      <div className='row'>
      <Previewer previewText={this.state.text}/>
      <footer className="my-footer text-center my-3">By Andrew Formosa. Writen using React, JQuery, bootstrap and SASS as a freeCodeCamp project</footer>
      </div>
    </div>
  );
}
}



export default App;
