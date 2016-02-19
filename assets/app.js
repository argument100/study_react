import React from "react";
import ReactDOM from "react-dom";


var AreaInput = React.createClass({
  
  render: function(){
    return(
      <div className="mdl-textfield mdl-js-textfield oh db">
        <input className="mdl-textfield__input" type="text" 
          id={this.props.data.id} value={this.props.data.value} placeholder={this.props.data.placeholder} />
        <label className="mdl-textfield__label" htmlFor="sample2"></label>
      </div>
    );
  }
});


var Area = React.createClass({
  
  getInitialState: function() {
    return {
      data: this.props.data
    };
  },
  render: function(){
    var area = this.props.data.map(function(item){
      return <AreaInput data={item} />
    });
    return(
      <div>
        {area}
      </div>
    );
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({data: nextProps.data});
  }
});


var Address = React.createClass({

  getInitialState: function() {
    return {
      addressData: "",
      data: [
        {id: "sample1", value: "", placeholder: "都道府県"},
        {id: "sample2", value: "", placeholder: "市区町村"}
      ]
    };
  },
  search: function(){
    let add = document.getElementById('sample1').value;
    
    let promise = Promise.resolve($.ajax({
      type: "GET",
      url: "http://zipcloud.ibsnet.co.jp/api/search?zipcode=" + add,
      dataType: "jsonp"
    }));
    
    promise.then((resolve) => {
      let reso = resolve.results[0];
      this.setState({
        data: [
          {id: "sample1", value: reso.address1, placeholder: "都道府県"},
          {id: "sample2", value: reso.address2 + reso.address3, placeholder: "市区町村"}
        ]
      });
    });
  },
  handleAddressChange: function(e){
    this.setState({addressData: e.target.value});
  },
  render: function(){
    return(
      <form action="#">
        <div className="searchBox">
          <div className="mdl-textfield mdl-js-textfield fl">
            <input className="mdl-textfield__input" onChange={this.handleAddressChange} value={this.state.addressData}
              type="text" id="sample1" placeholder="郵便番号" />
            <label className="mdl-textfield__label" htmlFor="sample1"></label>
          </div>
          <div className="submit">
            <button onClick={this.search} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              検索
            </button>
          </div>
        </div>
        
        <Area data={this.state.data} />
      </form>
    );
  }
});


ReactDOM.render(
  <Address />,
  document.getElementById('content')
);
