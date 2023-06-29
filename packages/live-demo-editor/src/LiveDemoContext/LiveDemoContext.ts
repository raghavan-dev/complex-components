import { createContext } from 'react';
import { Scope } from 'react-runner';

export type LiveDemoContextProps = {
  demo: {
    /**
     * The raw string of the editor code.
     */
    editorCode: string;

    /**
     * The raw string of the code that needs to be shown.
     */
    sourceCode: string;
    
    /**
     * The raw string of the preview code that needs to be shown.
     */
    previewCode: string;
    
    /**
     * The language of the code for syntax highlighting.
     */
    language: 'jsx' | 'tsx';
    
    /**
     * Globals and imports that can be used in the code.
     */
    scope: Scope;
    
    /**
     * The error in the demo code if it exists.
     */
    error: string | null;
  },
  events: {
    /**
     * Callback for changes to the code using the editor.
     *
     * @param code The raw string of the changed code
     */
    onCodeChange: (code: string) => void;
    
    /**
     * Callback to invoke when the code preview button is clicked.
     */
    onCodePreviewToggleClick: () => void;

    /**
     * Callback to invoke when the copy source code button is clicked.
     */
    onCopySourceCodeClick: () => void;

    /**
     * Callback to invoke when there is an error in the code or an error is cleared in
     * the code.
     *
     * @param error The error in the code.
     */
    onErrorStateChange: (maybeError: string | null) => void;

    /**
     * Callback to invoke when the reset demo button is clicked.
     */
    onResetDemoClick: () => void;
  },
  flags: {
    isPreview: boolean;
  }
};

export const LiveDemoContext = createContext<LiveDemoContextProps>({
  demo: {
    editorCode: '',
    error: null,
    language: 'jsx',
    previewCode: '',
    scope: {},
    sourceCode: '',
  },
  events: {
    onCodeChange: () => {},
    onCodePreviewToggleClick: () => {},
    onCopySourceCodeClick: () => {},
    onErrorStateChange: () => {},
    onResetDemoClick: () => {},
  },
  flags: {
    isPreview: true
  }
});
