/*
* @Author: krash
* @Date:   2018-08-03 16:29:20
* @Last Modified by:   krash
* @Last Modified time: 2018-08-06 18:33:30
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IrrigaForm = function (_React$Component) {
  _inherits(IrrigaForm, _React$Component);

  function IrrigaForm(props) {
    _classCallCheck(this, IrrigaForm);

    var _this = _possibleConstructorReturn(this, (IrrigaForm.__proto__ || Object.getPrototypeOf(IrrigaForm)).call(this, props));

    _this.state = {
      Hprato: '',
      Mprato: '',
      Qprato: '',
      Luprato: '',
      Maprato: '',
      Meprato: '',
      Giprato: '',
      Veprato: '',
      Saprato: '',
      Doprato: '',
      Hpiante: '',
      Mpiante: '',
      Qpiante: '',
      Lupiante: '',
      Mapiante: '',
      Mepiante: '',
      Gipiante: '',
      Vepiante: '',
      Sapiante: '',
      Dopiante: '',
      piante: false,
      prato: false,
      pianteButton: '',
      pratoButton: ''
    };
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(IrrigaForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      fetch("settings.json").then(function (response) {
        return response.json();
      }).then(function (json) {
        _this2.setState(json);
        var t = 1;
        var d = new Date();
        var year = d.getFullYear();
        var sundayMarch = _this2.lastSunday(year + "0331");
        var sundayOctober = _this2.lastSunday(year + "1031");
        if (d >= sundayMarch || d <= sundayOctober) {
          t = 2;
        }
        var Hprato = parseInt(_this2.state.Hprato) + parseInt(t);
        var Hpiante = parseInt(_this2.state.Hpiante) + parseInt(t);
        _this2.setState({ Hprato: Hprato, Hpiante: Hpiante });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      fetch("status").then(function (response) {
        return response.json();
      }).then(function (json) {
        _this3.setState(json);
      });
    }
  }, {
    key: 'lastSunday',
    value: function lastSunday(s) {
      var d = new Date(s.substring(0, 4), s.substring(4, 6) - 1, s.substring(6));
      d.setDate(d.getDate() - d.getDay());
      return d;
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;

      if (name == "Hprato" || name == "Hpiante") {
        var d = new Date();
        var year = d.getFullYear();
        var sundayMarch = this.lastSunday(year + "0331");
        var sundayOctober = this.lastSunday(year + "1031");
        if (d >= sundayMarch || d <= sundayOctober) {
          value = parseInt(value) - 2;
        } else {
          value = parseInt(value) - 1;
        }
      }

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      // event.preventDefault();

    }
  }, {
    key: 'handleFlow',
    value: function handleFlow(zone) {
      var _this4 = this;

      if (zone == 'piante') {
        fetch("tgpiante").then(function (response) {
          return response.json();
        }).then(function (json) {
          _this4.setState(json);
        });
      } else if (zone == 'prato') {
        fetch("tgprato").then(function (response) {
          return response.json();
        }).then(function (json) {
          _this4.setState(json);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit, method: 'POST', className: 'pure-form pure-form-stacked' },
        React.createElement(
          'div',
          { className: 'pure-g' },
          React.createElement(
            'div',
            { className: 'pure-u-1 pure-u-md-1-2' },
            React.createElement(
              'fieldset',
              null,
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1-2 pure-u-md-1-3' },
                  React.createElement(
                    'legend',
                    null,
                    'Prato'
                  )
                ),
                React.createElement(
                  'div',
                  { className: this.state.prato ? "pure-u-1-2 pure-u-md-1-3 verde" : "pure-u-1-2 pure-u-md-1-3 rosso" },
                  'Stato: ',
                  this.state.prato ? 'Attivo' : 'Spento'
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-2 pure-u-md-1-3' },
                  React.createElement(
                    'button',
                    { onClick: function onClick() {
                        _this5.handleFlow('prato');
                      }, className: this.state.prato ? 'pure-button-active pure-button button-error' : 'pure-button button-success', type: 'button' },
                    this.state.prato ? 'Spegni' : 'Attiva'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Hprato' },
                    'Ora'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Hprato', value: this.state.Hprato, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '1' },
                      '1'
                    ),
                    React.createElement(
                      'option',
                      { value: '2' },
                      '2'
                    ),
                    React.createElement(
                      'option',
                      { value: '3' },
                      '3'
                    ),
                    React.createElement(
                      'option',
                      { value: '4' },
                      '4'
                    ),
                    React.createElement(
                      'option',
                      { value: '5' },
                      '5'
                    ),
                    React.createElement(
                      'option',
                      { value: '6' },
                      '6'
                    ),
                    React.createElement(
                      'option',
                      { value: '7' },
                      '7'
                    ),
                    React.createElement(
                      'option',
                      { value: '8' },
                      '8'
                    ),
                    React.createElement(
                      'option',
                      { value: '9' },
                      '9'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '11' },
                      '11'
                    ),
                    React.createElement(
                      'option',
                      { value: '12' },
                      '12'
                    ),
                    React.createElement(
                      'option',
                      { value: '13' },
                      '13'
                    ),
                    React.createElement(
                      'option',
                      { value: '14' },
                      '14'
                    ),
                    React.createElement(
                      'option',
                      { value: '15' },
                      '15'
                    ),
                    React.createElement(
                      'option',
                      { value: '16' },
                      '16'
                    ),
                    React.createElement(
                      'option',
                      { value: '17' },
                      '17'
                    ),
                    React.createElement(
                      'option',
                      { value: '18' },
                      '18'
                    ),
                    React.createElement(
                      'option',
                      { value: '19' },
                      '19'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '21' },
                      '21'
                    ),
                    React.createElement(
                      'option',
                      { value: '22' },
                      '22'
                    ),
                    React.createElement(
                      'option',
                      { value: '23' },
                      '23'
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Mprato' },
                    'Minuti'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Mprato', value: this.state.Mprato, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '30' },
                      '30'
                    ),
                    React.createElement(
                      'option',
                      { value: '40' },
                      '40'
                    ),
                    React.createElement(
                      'option',
                      { value: '50' },
                      '50'
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Qprato' },
                    'Quanto`'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Qprato', value: this.state.Qprato, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '1' },
                      '1'
                    ),
                    React.createElement(
                      'option',
                      { value: '2' },
                      '2'
                    ),
                    React.createElement(
                      'option',
                      { value: '3' },
                      '3'
                    ),
                    React.createElement(
                      'option',
                      { value: '4' },
                      '4'
                    ),
                    React.createElement(
                      'option',
                      { value: '5' },
                      '5'
                    ),
                    React.createElement(
                      'option',
                      { value: '6' },
                      '6'
                    ),
                    React.createElement(
                      'option',
                      { value: '7' },
                      '7'
                    ),
                    React.createElement(
                      'option',
                      { value: '8' },
                      '8'
                    ),
                    React.createElement(
                      'option',
                      { value: '9' },
                      '9'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '11' },
                      '11'
                    ),
                    React.createElement(
                      'option',
                      { value: '12' },
                      '12'
                    ),
                    React.createElement(
                      'option',
                      { value: '13' },
                      '13'
                    ),
                    React.createElement(
                      'option',
                      { value: '14' },
                      '14'
                    ),
                    React.createElement(
                      'option',
                      { value: '15' },
                      '15'
                    ),
                    React.createElement(
                      'option',
                      { value: '16' },
                      '16'
                    ),
                    React.createElement(
                      'option',
                      { value: '17' },
                      '17'
                    ),
                    React.createElement(
                      'option',
                      { value: '18' },
                      '18'
                    ),
                    React.createElement(
                      'option',
                      { value: '19' },
                      '19'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '21' },
                      '21'
                    ),
                    React.createElement(
                      'option',
                      { value: '22' },
                      '22'
                    ),
                    React.createElement(
                      'option',
                      { value: '23' },
                      '23'
                    ),
                    React.createElement(
                      'option',
                      { value: '24' },
                      '24'
                    ),
                    React.createElement(
                      'option',
                      { value: '25' },
                      '25'
                    ),
                    React.createElement(
                      'option',
                      { value: '26' },
                      '26'
                    ),
                    React.createElement(
                      'option',
                      { value: '27' },
                      '27'
                    ),
                    React.createElement(
                      'option',
                      { value: '28' },
                      '28'
                    ),
                    React.createElement(
                      'option',
                      { value: '29' },
                      '29'
                    ),
                    React.createElement(
                      'option',
                      { value: '30' },
                      '30'
                    ),
                    React.createElement(
                      'option',
                      { value: '31' },
                      '31'
                    ),
                    React.createElement(
                      'option',
                      { value: '32' },
                      '32'
                    ),
                    React.createElement(
                      'option',
                      { value: '33' },
                      '33'
                    ),
                    React.createElement(
                      'option',
                      { value: '34' },
                      '34'
                    ),
                    React.createElement(
                      'option',
                      { value: '35' },
                      '35'
                    ),
                    React.createElement(
                      'option',
                      { value: '36' },
                      '36'
                    ),
                    React.createElement(
                      'option',
                      { value: '37' },
                      '37'
                    ),
                    React.createElement(
                      'option',
                      { value: '38' },
                      '38'
                    ),
                    React.createElement(
                      'option',
                      { value: '39' },
                      '39'
                    ),
                    React.createElement(
                      'option',
                      { value: '40' },
                      '40'
                    ),
                    React.createElement(
                      'option',
                      { value: '41' },
                      '41'
                    ),
                    React.createElement(
                      'option',
                      { value: '42' },
                      '42'
                    ),
                    React.createElement(
                      'option',
                      { value: '43' },
                      '43'
                    ),
                    React.createElement(
                      'option',
                      { value: '44' },
                      '44'
                    ),
                    React.createElement(
                      'option',
                      { value: '45' },
                      '45'
                    ),
                    React.createElement(
                      'option',
                      { value: '46' },
                      '46'
                    ),
                    React.createElement(
                      'option',
                      { value: '47' },
                      '47'
                    ),
                    React.createElement(
                      'option',
                      { value: '48' },
                      '48'
                    ),
                    React.createElement(
                      'option',
                      { value: '49' },
                      '49'
                    ),
                    React.createElement(
                      'option',
                      { value: '50' },
                      '50'
                    ),
                    React.createElement(
                      'option',
                      { value: '51' },
                      '51'
                    ),
                    React.createElement(
                      'option',
                      { value: '52' },
                      '52'
                    ),
                    React.createElement(
                      'option',
                      { value: '53' },
                      '53'
                    ),
                    React.createElement(
                      'option',
                      { value: '54' },
                      '54'
                    ),
                    React.createElement(
                      'option',
                      { value: '55' },
                      '55'
                    ),
                    React.createElement(
                      'option',
                      { value: '56' },
                      '56'
                    ),
                    React.createElement(
                      'option',
                      { value: '57' },
                      '57'
                    ),
                    React.createElement(
                      'option',
                      { value: '58' },
                      '58'
                    ),
                    React.createElement(
                      'option',
                      { value: '59' },
                      '59'
                    )
                  )
                )
              ),
              React.createElement(
                'legend',
                null,
                'Giorni'
              ),
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Luprato' },
                    'Lun'
                  ),
                  React.createElement('input', { name: 'Luprato', type: 'checkbox', checked: this.state.Luprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Maprato' },
                    'Mar'
                  ),
                  React.createElement('input', { name: 'Maprato', type: 'checkbox', checked: this.state.Maprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Meprato' },
                    'Mer'
                  ),
                  React.createElement('input', { name: 'Meprato', type: 'checkbox', checked: this.state.Meprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Giprato' },
                    'Gio'
                  ),
                  React.createElement('input', { name: 'Giprato', type: 'checkbox', checked: this.state.Giprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Veprato' },
                    'Ven'
                  ),
                  React.createElement('input', { name: 'Veprato', type: 'checkbox', checked: this.state.Veprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Saprato' },
                    'Sab'
                  ),
                  React.createElement('input', { name: 'Saprato', type: 'checkbox', checked: this.state.Saprato, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Doprato' },
                    'Dom'
                  ),
                  React.createElement('input', { name: 'Doprato', type: 'checkbox', checked: this.state.Doprato, onChange: this.handleInputChange })
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'pure-u-1 pure-u-md-1-2' },
            React.createElement(
              'fieldset',
              null,
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1-2 pure-u-md-1-3' },
                  React.createElement(
                    'legend',
                    null,
                    'Piante'
                  )
                ),
                React.createElement(
                  'div',
                  { className: this.state.piante ? "pure-u-1-2 pure-u-md-1-3 verde" : "pure-u-1-2 pure-u-md-1-3 rosso" },
                  'Stato: ',
                  this.state.piante ? 'Attivo' : 'Spento'
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-2 pure-u-md-1-3' },
                  React.createElement(
                    'button',
                    { onClick: function onClick() {
                        _this5.handleFlow('piante');
                      }, className: this.state.piante ? 'pure-button-active pure-button button-error' : 'pure-button button-success', type: 'button' },
                    this.state.piante ? 'Spegni' : 'Attiva'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Hpiante' },
                    'Ora'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Hpiante', value: this.state.Hpiante, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '1' },
                      '1'
                    ),
                    React.createElement(
                      'option',
                      { value: '2' },
                      '2'
                    ),
                    React.createElement(
                      'option',
                      { value: '3' },
                      '3'
                    ),
                    React.createElement(
                      'option',
                      { value: '4' },
                      '4'
                    ),
                    React.createElement(
                      'option',
                      { value: '5' },
                      '5'
                    ),
                    React.createElement(
                      'option',
                      { value: '6' },
                      '6'
                    ),
                    React.createElement(
                      'option',
                      { value: '7' },
                      '7'
                    ),
                    React.createElement(
                      'option',
                      { value: '8' },
                      '8'
                    ),
                    React.createElement(
                      'option',
                      { value: '9' },
                      '9'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '11' },
                      '11'
                    ),
                    React.createElement(
                      'option',
                      { value: '12' },
                      '12'
                    ),
                    React.createElement(
                      'option',
                      { value: '13' },
                      '13'
                    ),
                    React.createElement(
                      'option',
                      { value: '14' },
                      '14'
                    ),
                    React.createElement(
                      'option',
                      { value: '15' },
                      '15'
                    ),
                    React.createElement(
                      'option',
                      { value: '16' },
                      '16'
                    ),
                    React.createElement(
                      'option',
                      { value: '17' },
                      '17'
                    ),
                    React.createElement(
                      'option',
                      { value: '18' },
                      '18'
                    ),
                    React.createElement(
                      'option',
                      { value: '19' },
                      '19'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '21' },
                      '21'
                    ),
                    React.createElement(
                      'option',
                      { value: '22' },
                      '22'
                    ),
                    React.createElement(
                      'option',
                      { value: '23' },
                      '23'
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Mpiante' },
                    'Minuti'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Mpiante', value: this.state.Mpiante, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '30' },
                      '30'
                    ),
                    React.createElement(
                      'option',
                      { value: '40' },
                      '40'
                    ),
                    React.createElement(
                      'option',
                      { value: '50' },
                      '50'
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Qpiante' },
                    'Quanto`'
                  ),
                  React.createElement(
                    'select',
                    { name: 'Qpiante', value: this.state.Qpiante, onChange: this.handleInputChange, className: 'pure-u-23-24' },
                    React.createElement(
                      'option',
                      { value: '0' },
                      '0'
                    ),
                    React.createElement(
                      'option',
                      { value: '1' },
                      '1'
                    ),
                    React.createElement(
                      'option',
                      { value: '2' },
                      '2'
                    ),
                    React.createElement(
                      'option',
                      { value: '3' },
                      '3'
                    ),
                    React.createElement(
                      'option',
                      { value: '4' },
                      '4'
                    ),
                    React.createElement(
                      'option',
                      { value: '5' },
                      '5'
                    ),
                    React.createElement(
                      'option',
                      { value: '6' },
                      '6'
                    ),
                    React.createElement(
                      'option',
                      { value: '7' },
                      '7'
                    ),
                    React.createElement(
                      'option',
                      { value: '8' },
                      '8'
                    ),
                    React.createElement(
                      'option',
                      { value: '9' },
                      '9'
                    ),
                    React.createElement(
                      'option',
                      { value: '10' },
                      '10'
                    ),
                    React.createElement(
                      'option',
                      { value: '11' },
                      '11'
                    ),
                    React.createElement(
                      'option',
                      { value: '12' },
                      '12'
                    ),
                    React.createElement(
                      'option',
                      { value: '13' },
                      '13'
                    ),
                    React.createElement(
                      'option',
                      { value: '14' },
                      '14'
                    ),
                    React.createElement(
                      'option',
                      { value: '15' },
                      '15'
                    ),
                    React.createElement(
                      'option',
                      { value: '16' },
                      '16'
                    ),
                    React.createElement(
                      'option',
                      { value: '17' },
                      '17'
                    ),
                    React.createElement(
                      'option',
                      { value: '18' },
                      '18'
                    ),
                    React.createElement(
                      'option',
                      { value: '19' },
                      '19'
                    ),
                    React.createElement(
                      'option',
                      { value: '20' },
                      '20'
                    ),
                    React.createElement(
                      'option',
                      { value: '21' },
                      '21'
                    ),
                    React.createElement(
                      'option',
                      { value: '22' },
                      '22'
                    ),
                    React.createElement(
                      'option',
                      { value: '23' },
                      '23'
                    ),
                    React.createElement(
                      'option',
                      { value: '24' },
                      '24'
                    ),
                    React.createElement(
                      'option',
                      { value: '25' },
                      '25'
                    ),
                    React.createElement(
                      'option',
                      { value: '26' },
                      '26'
                    ),
                    React.createElement(
                      'option',
                      { value: '27' },
                      '27'
                    ),
                    React.createElement(
                      'option',
                      { value: '28' },
                      '28'
                    ),
                    React.createElement(
                      'option',
                      { value: '29' },
                      '29'
                    ),
                    React.createElement(
                      'option',
                      { value: '30' },
                      '30'
                    ),
                    React.createElement(
                      'option',
                      { value: '31' },
                      '31'
                    ),
                    React.createElement(
                      'option',
                      { value: '32' },
                      '32'
                    ),
                    React.createElement(
                      'option',
                      { value: '33' },
                      '33'
                    ),
                    React.createElement(
                      'option',
                      { value: '34' },
                      '34'
                    ),
                    React.createElement(
                      'option',
                      { value: '35' },
                      '35'
                    ),
                    React.createElement(
                      'option',
                      { value: '36' },
                      '36'
                    ),
                    React.createElement(
                      'option',
                      { value: '37' },
                      '37'
                    ),
                    React.createElement(
                      'option',
                      { value: '38' },
                      '38'
                    ),
                    React.createElement(
                      'option',
                      { value: '39' },
                      '39'
                    ),
                    React.createElement(
                      'option',
                      { value: '40' },
                      '40'
                    ),
                    React.createElement(
                      'option',
                      { value: '41' },
                      '41'
                    ),
                    React.createElement(
                      'option',
                      { value: '42' },
                      '42'
                    ),
                    React.createElement(
                      'option',
                      { value: '43' },
                      '43'
                    ),
                    React.createElement(
                      'option',
                      { value: '44' },
                      '44'
                    ),
                    React.createElement(
                      'option',
                      { value: '45' },
                      '45'
                    ),
                    React.createElement(
                      'option',
                      { value: '46' },
                      '46'
                    ),
                    React.createElement(
                      'option',
                      { value: '47' },
                      '47'
                    ),
                    React.createElement(
                      'option',
                      { value: '48' },
                      '48'
                    ),
                    React.createElement(
                      'option',
                      { value: '49' },
                      '49'
                    ),
                    React.createElement(
                      'option',
                      { value: '50' },
                      '50'
                    ),
                    React.createElement(
                      'option',
                      { value: '51' },
                      '51'
                    ),
                    React.createElement(
                      'option',
                      { value: '52' },
                      '52'
                    ),
                    React.createElement(
                      'option',
                      { value: '53' },
                      '53'
                    ),
                    React.createElement(
                      'option',
                      { value: '54' },
                      '54'
                    ),
                    React.createElement(
                      'option',
                      { value: '55' },
                      '55'
                    ),
                    React.createElement(
                      'option',
                      { value: '56' },
                      '56'
                    ),
                    React.createElement(
                      'option',
                      { value: '57' },
                      '57'
                    ),
                    React.createElement(
                      'option',
                      { value: '58' },
                      '58'
                    ),
                    React.createElement(
                      'option',
                      { value: '59' },
                      '59'
                    )
                  )
                )
              ),
              React.createElement(
                'legend',
                null,
                'Giorni'
              ),
              React.createElement(
                'div',
                { className: 'pure-g' },
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Lupiante' },
                    'Lun'
                  ),
                  React.createElement('input', { name: 'Lupiante', type: 'checkbox', checked: this.state.Lupiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Mapiante' },
                    'Mar'
                  ),
                  React.createElement('input', { name: 'Mapiante', type: 'checkbox', checked: this.state.Mapiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Mepiante' },
                    'Mer'
                  ),
                  React.createElement('input', { name: 'Mepiante', type: 'checkbox', checked: this.state.Mepiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Gipiante' },
                    'Gio'
                  ),
                  React.createElement('input', { name: 'Gipiante', type: 'checkbox', checked: this.state.Gipiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Vepiante' },
                    'Ven'
                  ),
                  React.createElement('input', { name: 'Vepiante', type: 'checkbox', checked: this.state.Vepiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Sapiante' },
                    'Sab'
                  ),
                  React.createElement('input', { name: 'Sapiante', type: 'checkbox', checked: this.state.Sapiante, onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'pure-u-1-7 pure-u-md-1-3' },
                  React.createElement(
                    'label',
                    { htmlFor: 'Dopiante' },
                    'Dom'
                  ),
                  React.createElement('input', { name: 'Dopiante', type: 'checkbox', checked: this.state.Dopiante, onChange: this.handleInputChange })
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'pure-g' },
          React.createElement(
            'div',
            { className: 'pure-u-1' },
            React.createElement(
              'button',
              { type: 'submit', className: 'pure-button pure-input-1 pure-button-primary' },
              'Invia'
            )
          )
        )
      );
    }
  }]);

  return IrrigaForm;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(IrrigaForm, null), domContainer);