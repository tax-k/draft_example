import React from 'react';
import './App.css';

import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { editorState: EditorState.createEmpty() };

		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	}

	onChange = (editorState) => {
		this.setState({ editorState });
		const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    console.log('')
	};

	_onBoldClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
	}

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			this.onChange(newState);
			return 'handled';
		}

		return 'not-handled';
	}

	render() {
		return (
			<div>
				<button onClick={this._onBoldClick.bind(this)}>Bold</button>
				<Editor
					editorState={this.state.editorState}
					handleKeyCommand={this.handleKeyCommand}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

export default App;
