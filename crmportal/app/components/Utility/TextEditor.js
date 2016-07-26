import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw, convertFromRaw, Entity,ContentState} from 'draft-js';
import React from 'react';
import PrismDecorator from 'draft-js-prism';
import Immutable from 'immutable';
import insertMediaBlock from './src/insertMediaBlock';
import TicketDetailContainer from './components/containers/TicketDetailContainer';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    const customBlockRenderMap = Immutable.Map({
      'custom': {
        element: 'div',
      }
    });

    var decorator = new PrismDecorator({defaultSyntax: 'javascript'});
    this.state = {
      blockRenderMap: DefaultDraftBlockRenderMap.merge(customBlockRenderMap),
      editorState: EditorState.createEmpty(decorator),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.custom = () => this._custom();
    this.color = (e) => this._color(e);
    this.colorClick = (e) => this._color(e);

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    //this.state.editorState = EditorState.createWithContent(convertFromRaw({"entityMap":{"0":{"type":"CUSTOM","mutability":"IMMUTABLE","data":{"ticketid":"tVTMFA0010ST"}}},"blocks":[{"key":"erp6t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2l1gp","text":" ","type":"custom","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}]},{"key":"d69et","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}));
  }

  _custom(){
    var entityKey = Entity.create(
      'CUSTOM',
      'IMMUTABLE',
      {ticketid:'tVTMFA0010ST'}
    );
    let {editorState} = insertMediaBlock(this.state.editorState, 'custom', entityKey);
    this.setState({editorState: editorState });
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();

    if (type === 'custom') {
      return {
        component: TicketDetailContainer,
        editable: false,
      };
    }
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const raw = convertToRaw(this.state.editorState.getCurrentContent());

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <button onClick={this.custom}>test</button>
        <div className={className} onClick={this.focus}>
          <Editor
            blockRenderMap={this.state.blockRenderMap}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
            blockRendererFn={this.myBlockRenderer}
          />
        </div>
        <div>{JSON.stringify(raw)}</div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  HIGHLIGHT: {
    backgroundColor: 'rgb(133, 251, 255)',
    color: 'black'
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'}
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
  {label: 'Highlight', style:'HIGHLIGHT'}
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
