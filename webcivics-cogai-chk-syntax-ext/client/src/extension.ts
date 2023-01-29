import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the CHK language
    vscode.languages.register({ id: 'chk' });

    // Register the CHK syntax highlighting
    vscode.languages.setLanguageConfiguration('chk', {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\<\>\/\?\s]+)/g,
        comments: {
            lineComment: ';',
            blockComment: ['(*', '*)']
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        onEnterRules: [
            {
                beforeText: /^\s*(\(\*).*$/,
                afterText: /^\s*(\*\)).*$/,
                action: { indentAction: vscode.IndentAction.IndentOutdent, appendText: ' * ' }
            }
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"', notIn: ['string'] },
            { open: "'", close: "'", notIn: ['string', 'comment'] },
            { open: '`', close: '`', notIn: ['string', 'comment'] }
        ]
    });
}

export function deactivate() {
}
const CHKGrammar = vscode.languages.registerGrammarDefinition({
  language: 'chk',
  format: 'json',
  scopeName: 'source.chk',
  path: './syntaxes/chk.tmLanguage.json'

});

export function getGrammar() {
  return CHKGrammar;
}

export function activate(context: vscode.ExtensionContext) {
  // Register the CHK language
  const CHKLanguage = vscode.languages.register({
      id: 'chk',
      extensions: ['.chk'],
      aliases: ['CHK']
  });

  // Set the CHK language configuration
  vscode.languages.setLanguageConfiguration('chk', {
      comments: {
          lineComment: '#'
      },
      brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')']
      ],
      autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' }
      ],
      surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' }
      ]
  });

  // Load the CHK grammar
  const CHKGrammar = vscode.languages.registerGrammarDefinition({
      language: 'chk',
      format: 'json',
      scopeName: 'source.chk',
      path: './syntaxes/chk.tmLanguage.json'
  }, context);

  // Load the CHK theme
  const CHKTheme = vscode.languages.registerColorProvider({
      language: 'chk',
      path: './syntaxes/chk.tmTheme.json'
  }, context);
}
