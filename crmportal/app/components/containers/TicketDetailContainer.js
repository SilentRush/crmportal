import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import TicketDetail from "../views/TicketDetail";
import AccountMiniDetail from "../views/AccountMiniDetail";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {Entity} from 'draft-js';

class TicketDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {showNotes: false};
    this.clickShowNotes = this.clickShowNotes.bind(this);
  }

  componentDidMount(){
    var data;
    let ticketId;
    if(this.props.params)
      ticketId = this.props.params.ticketid;
    ticketApi.getTicket(ticketId).then(
      () => {
        accountApi.getAccount(this.props.ticket.account.accountid);
      }
    );
  }

  clickShowNotes(){
    if(this.state.showNotes)
      this.setState({showNotes: false})
    else
      this.setState({showNotes: true});
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-4 col-xs-12 col-md-4">
          <AccountMiniDetail account={this.props.account} clickShowNotes={this.clickShowNotes} showNotes={this.state.showNotes} />
        </div>
        <div className="col-sm-8 col-xs-12 col-md-8">
          <TicketDetail ticket={this.props.ticket} />
          <div className="ticketDetailContainer card-shadow">
            <div className="ticketDetailHeader">Comments</div>
            <div className="ticketDetail">
              <CommentListContainer comments={comments} isEdit={false} />
              <CommentContainer isEdit={true} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const comments = [
  {"entityMap":{},"blocks":[{"key":"6kic1","text":" ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4orh4","text":"// It is important to import the Editor which accepts plugins.","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"51u8o","text":"import Editor from 'draft-js-plugins-editor';\nimport createHashtagPlugin from 'draft-js-hashtag-plugin';\nimport React from 'react';\n\n// Creates an Instance. At this step, a configuration object can be passed in\n// as an argument.\nconst hashtagPlugin = createHashtagPlugin();\n\n// The Editor accepts an array of plugins. In this case, only the hashtagPlugin\n// is passed in, although it is possible to pass in multiple plugins.\nconst MyEditor = ({ editorState, onChange }) => (\n <Editor\n editorState={ editorState }\n onChange={ onChange }\n plugins={ [hashtagPlugin] }\n />\n);\n\nexport default MyEditor;","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"485mf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"38b4q","text":"asdasdasdasd","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]},
  {"entityMap":{},"blocks":[{"key":"9creq","text":"Bob the builder WEEEEE","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"HIGHLIGHT"}],"entityRanges":[]}]}
]

const mapStateToProps = function(store) {
  return {
    ticket: store.ticketState.ticket,
    account: store.accountState.account
  };
};

export default connect(mapStateToProps)(TicketDetailContainer);
