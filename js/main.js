require.config({
    paths: {
        'vs': 'https://unpkg.com/monaco-editor@latest/min/vs'
    }
});
window.MonacoEnvironment = {
    getWorkerUrl: () => proxy
};

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], {
    type: 'text/javascript'
}));

var editorHTML
var editorCSS
var editorJS

// For HTML
require(["vs/editor/editor.main"], function () {
    editorHTML = monaco.editor.create(document.getElementById('containerHTML'), {
        value: '<!-- HTML -->',
        language: 'html',
        theme: 'vs-dark'
    });
});
// For CSS
require(["vs/editor/editor.main"], function () {
    editorCSS = monaco.editor.create(document.getElementById('containerCSS'), {
        value: '/* CSS */',
        language: 'css',
        theme: 'vs-dark'
    });
});
// For JS
require(["vs/editor/editor.main"], function () {
    editorJS = monaco.editor.create(document.getElementById('containerJS'), {
        value: '// JavaScript',
        language: 'javascript',
        theme: 'vs-dark'
    });
});

// To render the code in the iframe
function showPreview() {
    var htmlCode = editorHTML.getValue()
    var cssCode = "<style>" + editorCSS.getValue() + "</style>"
    var jsCode = "<script>" + editorJS.getValue() + "</script>"
    var frame = document.getElementById("preview-window").contentWindow.document
    frame.open()
    frame.write(htmlCode + cssCode + jsCode)
    frame.close()
}

// showPreview() every 3 seconds (reload the iframe)
setInterval(function () {
    showPreview()
}, 5000);