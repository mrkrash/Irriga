/*
* @Author: krash
* @Date:   2018-08-03 16:29:20
* @Last Modified by:   krash
* @Last Modified time: 2018-08-06 18:33:30
*/
'use strict';

class IrrigaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    fetch("settings.json").then( (response) => {
      return response.json()
    }).then( (json) => {
      this.setState(json);
      let t = 1;
      let d = new Date();
      let year = d.getFullYear();
      let sundayMarch = this.lastSunday(year + "0331");
      let sundayOctober = this.lastSunday(year + "1031");
      if (d >= sundayMarch || d <= sundayOctober) {
        t = 2
      }
      let Hprato = parseInt(this.state.Hprato) + parseInt(t);
      let Hpiante = parseInt(this.state.Hpiante) + parseInt(t);
      this.setState({Hprato: Hprato, Hpiante: Hpiante})
    });
  };

  componentDidMount() {
    fetch("status").then( (response) => {
      return response.json()
    }).then( (json) => {
      this.setState(json);
    });
  }

  lastSunday(s) {
    var d = new Date(s.substring(0,4), s.substring(4,6) - 1, s.substring(6));
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name == "Hprato" || name == "Hpiante") {
      let d = new Date();
      let year = d.getFullYear();
      let sundayMarch = this.lastSunday(year + "0331");
      let sundayOctober = this.lastSunday(year + "1031");
      if (d >= sundayMarch || d <= sundayOctober) {
        value = parseInt(value) - 2;
      } else {
        value = parseInt(value) - 1;
      }
    }

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    // event.preventDefault();

  }
  handleFlow(zone) {
    if (zone == 'piante') {
      fetch("tgpiante").then( (response) => {
        return response.json()
      }).then( (json) => {
        this.setState(json);
      });
    } else if (zone == 'prato') {
      fetch("tgprato").then( (response) => {
        return response.json()
      }).then( (json) => {
        this.setState(json);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} method='POST' className='pure-form pure-form-stacked'>
        <div className='pure-g'>
          <div className='pure-u-1 pure-u-md-1-2'>
            <fieldset>
              <div className='pure-g'>
                <div className='pure-u-1-2 pure-u-md-1-3'>
                  <legend>Prato</legend>
                </div>
                <div className={this.state.prato ? "pure-u-1-2 pure-u-md-1-3 verde" : "pure-u-1-2 pure-u-md-1-3 rosso"}>
                  Stato: {this.state.prato ? 'Attivo' : 'Spento'}
                </div>
                <div className='pure-u-1-2 pure-u-md-1-3'>
                  <button onClick={() => {this.handleFlow('prato')}} className={this.state.prato ? 'pure-button-active pure-button button-error' : 'pure-button button-success'} type='button'>{this.state.prato ? 'Spegni' : 'Attiva'}</button>
                </div>
              </div>
              <div className='pure-g'>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Hprato'>Ora</label>
                  <select name='Hprato' value={this.state.Hprato} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                  </select>
                </div>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Mprato'>Minuti</label>
                  <select name='Mprato' value={this.state.Mprato} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='30'>30</option>
                    <option value='40'>40</option>
                    <option value='50'>50</option>
                  </select>
                </div>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Qprato'>Quanto`</label>
                  <select name='Qprato' value={this.state.Qprato} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                    <option value='41'>41</option>
                    <option value='42'>42</option>
                    <option value='43'>43</option>
                    <option value='44'>44</option>
                    <option value='45'>45</option>
                    <option value='46'>46</option>
                    <option value='47'>47</option>
                    <option value='48'>48</option>
                    <option value='49'>49</option>
                    <option value='50'>50</option>
                    <option value='51'>51</option>
                    <option value='52'>52</option>
                    <option value='53'>53</option>
                    <option value='54'>54</option>
                    <option value='55'>55</option>
                    <option value='56'>56</option>
                    <option value='57'>57</option>
                    <option value='58'>58</option>
                    <option value='59'>59</option>
                  </select>
                </div>
              </div>
              <legend>Giorni</legend>
              <div className='pure-g'>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Luprato'>Lun</label>
                  <input name='Luprato' type='checkbox' checked={this.state.Luprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Maprato'>Mar</label>
                  <input name='Maprato' type='checkbox' checked={this.state.Maprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Meprato'>Mer</label>
                  <input name='Meprato' type='checkbox' checked={this.state.Meprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Giprato'>Gio</label>
                  <input name='Giprato' type='checkbox' checked={this.state.Giprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Veprato'>Ven</label>
                  <input name='Veprato' type='checkbox' checked={this.state.Veprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Saprato'>Sab</label>
                  <input name='Saprato' type='checkbox' checked={this.state.Saprato} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Doprato'>Dom</label>
                  <input name='Doprato' type='checkbox' checked={this.state.Doprato} onChange={this.handleInputChange} />
                </div>
              </div>
            </fieldset>
          </div>
          <div className='pure-u-1 pure-u-md-1-2'>        
            <fieldset>
              <div className='pure-g'>
                <div className='pure-u-1-2 pure-u-md-1-3'>
                  <legend>Piante</legend>
                </div>
                <div className={this.state.piante ? "pure-u-1-2 pure-u-md-1-3 verde" : "pure-u-1-2 pure-u-md-1-3 rosso"}>
                  Stato: {this.state.piante ? 'Attivo' : 'Spento'}
                </div>
                <div className='pure-u-1-2 pure-u-md-1-3'>
                  <button onClick={() => { this.handleFlow('piante')}} className={this.state.piante ? 'pure-button-active pure-button button-error' : 'pure-button button-success'} type='button'>{this.state.piante ? 'Spegni' : 'Attiva'}</button>
                </div>
              </div>
              <div className='pure-g'>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Hpiante'>Ora</label>
                  <select name='Hpiante' value={this.state.Hpiante} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                  </select>
                </div>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Mpiante'>Minuti</label>
                  <select name='Mpiante' value={this.state.Mpiante} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='30'>30</option>
                    <option value='40'>40</option>
                    <option value='50'>50</option>
                  </select>
                </div>
                <div className='pure-u-1 pure-u-md-1-3'>
                  <label htmlFor='Qpiante'>Quanto`</label>
                  <select name='Qpiante' value={this.state.Qpiante} onChange={this.handleInputChange} className='pure-u-23-24'>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                    <option value='41'>41</option>
                    <option value='42'>42</option>
                    <option value='43'>43</option>
                    <option value='44'>44</option>
                    <option value='45'>45</option>
                    <option value='46'>46</option>
                    <option value='47'>47</option>
                    <option value='48'>48</option>
                    <option value='49'>49</option>
                    <option value='50'>50</option>
                    <option value='51'>51</option>
                    <option value='52'>52</option>
                    <option value='53'>53</option>
                    <option value='54'>54</option>
                    <option value='55'>55</option>
                    <option value='56'>56</option>
                    <option value='57'>57</option>
                    <option value='58'>58</option>
                    <option value='59'>59</option>
                  </select>
                </div>
              </div>
              <legend>Giorni</legend>
              <div className='pure-g'>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Lupiante'>Lun</label>
                  <input name='Lupiante' type='checkbox' checked={this.state.Lupiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Mapiante'>Mar</label>
                  <input name='Mapiante' type='checkbox' checked={this.state.Mapiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Mepiante'>Mer</label>
                  <input name='Mepiante' type='checkbox' checked={this.state.Mepiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Gipiante'>Gio</label>
                  <input name='Gipiante' type='checkbox' checked={this.state.Gipiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Vepiante'>Ven</label>
                  <input name='Vepiante' type='checkbox' checked={this.state.Vepiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Sapiante'>Sab</label>
                  <input name='Sapiante' type='checkbox' checked={this.state.Sapiante} onChange={this.handleInputChange} />
                </div>
                <div className='pure-u-1-7 pure-u-md-1-3'>
                  <label htmlFor='Dopiante'>Dom</label>
                  <input name='Dopiante' type='checkbox' checked={this.state.Dopiante} onChange={this.handleInputChange} />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className='pure-g'>
          <div className='pure-u-1'><button type='submit' className='pure-button pure-input-1 pure-button-primary'>Invia</button></div>
        </div>
      </form>
    )
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<IrrigaForm />, domContainer);