var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} //Redux
var _ReactDOM = ReactDOM,render = _ReactDOM.render;var _ReactRedux =
ReactRedux,Provider = _ReactRedux.Provider,connect = _ReactRedux.connect;var _Redux =
Redux,createStore = _Redux.createStore;var _React =
React,Component = _React.Component;

var EDITORWINDOWSIZE = 'EDITORWINDOWSIZE';
var PREVIEWWINDOWSIZE = 'PREVIEWWINDOWSIZE';
var UPDATE = 'UPDATE';

var placeholder = 'Bib0T';














































//Allow for line breaks with enter
marked.setOptions({ breaks: true });

//Allow for links adhering to codepen rules i.e. _blank
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + '</a>';
};
var updatePreviewer = function updatePreviewer(text) {
  return {
    type: UPDATE,
    text: text };

};
var editorWindowSize = function editorWindowSize(size) {
  return {
    type: EDITORWINDOWSIZE,
    windowSize: size };

};
var previewWindowSize = function previewWindowSize(size) {
  return {
    type: PREVIEWWINDOWSIZE,
    windowSize: size };

};

var reducer = function reducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { text: placeholder, windowSize: "" };var action = arguments[1];
  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, { text: action.text });
    case EDITORWINDOWSIZE:
      return Object.assign({}, state, { editorSize: action.windowSize });
    case PREVIEWWINDOWSIZE:
      return Object.assign({}, state, { previewSize: action.windowSize });
    default:
      return state;}

};
var store = createStore(reducer);


//React
var Toolbar = function (_Component) {_inherits(Toolbar, _Component);
  function Toolbar(props) {_classCallCheck(this, Toolbar);var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this,
    props));
    _this.maximizeWindow = _this.maximizeWindow.bind(_this);
    _this.minimizeWindow = _this.minimizeWindow.bind(_this);return _this;
  }_createClass(Toolbar, [{ key: 'maximizeWindow', value: function maximizeWindow(
    e) {
      this.props.changeSize('window-max');
    } }, { key: 'minimizeWindow', value: function minimizeWindow(
    e) {
      this.props.changeSize('window-min');
    } }, { key: 'render', value: function render()
    {
      return (
        React.createElement('div', { 'class': 'toolbar' },
          React.createElement('p', null, this.props.title),
          React.createElement('div', null,
            React.createElement('button', { className: 'toolbar-button', onClick: this.minimizeWindow }, React.createElement('i', { 'class': 'fas fa-window-minimize' })),
            React.createElement('button', { className: 'toolbar-button', onClick: this.maximizeWindow }, React.createElement('i', { 'class': 'fas fa-window-maximize' })))));



    } }]);return Toolbar;}(Component);var

Previewer = function (_Component2) {_inherits(Previewer, _Component2);function Previewer() {_classCallCheck(this, Previewer);return _possibleConstructorReturn(this, (Previewer.__proto__ || Object.getPrototypeOf(Previewer)).apply(this, arguments));}_createClass(Previewer, [{ key: 'render', value: function render()
    {
      var markdown = {
        __html: marked(this.props.text, { renderer: renderer }) };

      return (
        React.createElement('div', { 'class': "app-item " + this.props.size },
          React.createElement(Toolbar, {
            title: "HTML Previewer",
            changeSize: this.props.changeSize }),
          React.createElement('div', { id: 'preview', dangerouslySetInnerHTML: markdown })));


    } }]);return Previewer;}(Component);var

Editor = function (_Component3) {_inherits(Editor, _Component3);
  function Editor(props) {_classCallCheck(this, Editor);var _this3 = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this,
    props));
    _this3.updateText = _this3.updateText.bind(_this3);return _this3;
  }_createClass(Editor, [{ key: 'updateText', value: function updateText(
    e) {
      this.props.update(e.target.value);
    } }, { key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: "app-item " + this.props.size },
          React.createElement(Toolbar, {
            title: "HTML Editor",
            changeSize: this.props.changeSize }),
          React.createElement('textarea', {
            id: 'editor',
            value: this.props.text,
            onChange: this.updateText })));


    } }]);return Editor;}(Component);var

App = function (_Component4) {_inherits(App, _Component4);
  function App(props) {_classCallCheck(this, App);return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
  }_createClass(App, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'app' },
          React.createElement(Editor, { className: this.props.size,
            text: this.props.text,
            update: this.props.update,
            size: this.props.editorSize,
            changeSize: this.props.changeEditorSize }),
          React.createElement(Previewer, {
            text: this.props.text,
            size: this.props.previewSize,
            changeSize: this.props.changePreviewSize })));


    } }]);return App;}(Component);


//React-Redux
var mapStateToProps = function mapStateToProps(state) {
  return {
    text: state.text,
    editorSize: state.editorSize,
    previewSize: state.previewSize };

};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update: function update(text) {
      dispatch(updatePreviewer(text));
    },
    changeEditorSize: function changeEditorSize(size) {
      dispatch(editorWindowSize(size));
    },
    changePreviewSize: function changePreviewSize(size) {
      dispatch(previewWindowSize(size));
    } };

};

var Container = connect(mapStateToProps, mapDispatchToProps)(App);

//ReactDOM render of components
render(
React.createElement(Provider, { store: store },
  React.createElement(Container, null)),
document.getElementById('root'));