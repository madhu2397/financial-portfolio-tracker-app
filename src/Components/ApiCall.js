import React, { Component } from "react";
import axios from "axios";

class ApiCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      livePrice: null,
      proLoss: null,
    };
  }

  componentDidMount() {
    //const{symbol,buyprice,share}=this.props; //Destructuring
    const { buyprice, share } = this.props; //Destructuring
    //let sym = symbol;
    let buy = buyprice;
    let sh = share;
    // const apikey="TN7FTGXLR3WJAP4R";
    // const api_url='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&apikey=${apikey}';
    const api_url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&apikey=ZP66SKBFS4XOOMLW";
    axios
      .get(api_url)
      .then((response) => {
        let lastRefreshed = response.data["Meta Data"]["3. Last Refreshed"];
        let date = lastRefreshed.substring(0, 10);
        console.log("final", date);
        let live = response.data["Time Series (Daily)"][date]["4. close"];
        let diff = (live - buy) * sh;
        diff = diff.toFixed(2);
        this.setState({
          livePrice: live,
          proLoss: diff,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <>
        <td>{this.state.livePrice}</td>
        <td>{this.state.proLoss}</td>
      </>
    );
  }
}

export default ApiCall;
//"35VEPZDURMM5DLHT";
