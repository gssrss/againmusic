import React from "react"
import axios from "axios"
import "./Covid19.css"
import TimeAgo from "react-timeago"
// import { AgGridReact } from "ag-grid-react"
// import "ag-grid-community/dist/styles/ag-grid.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css"

export default class Covid19 extends React.Component {
  state = { statistics: [] }
  componentDidMount() {
    axios
      .get("https://covid19.mathdro.id/api/confirmed")
      .then((response) => {
        let arrMain = []
        let arrProvince = []
        let arrMutual = []
        let arrSeparate = []
        //console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].provinceState) {
            arrMain.push(response.data[i])
          } else {
            arrProvince.push(response.data[i])
          }
        }
        for (let j = 0; j < arrProvince.length; j++) {
          if (!arrMutual.includes(arrProvince[j].countryRegion)) {
            arrMutual.push(arrProvince[j].countryRegion)
          }
        }
        for (let k = 0; k < arrMutual.length; k++) {
          arrSeparate.push({
            countryRegion: arrMutual[k],
            lastUpdate: arrMutual[k],
            confirmed: 0,
            recovered: 0,
            deaths: 0,
          })
        }

        for (let f = 0; f < arrSeparate.length; f++) {
          for (let e = 0; e < arrProvince.length; e++) {
            if (arrSeparate[f].countryRegion === arrProvince[e].countryRegion) {
              arrSeparate[f].confirmed += arrProvince[e].confirmed
              arrSeparate[f].recovered += arrProvince[e].recovered
              arrSeparate[f].deaths += arrProvince[e].deaths
              arrSeparate[f].lastUpdate = arrProvince[e].lastUpdate
            }
          }
        }
        for (let g = 0; g < arrMain.length; g++) {
          for (let d = 0; d < arrSeparate.length; d++) {
            if (arrSeparate[d].countryRegion === arrMain[g].countryRegion) {
              arrMain[g].confirmed += arrSeparate[d].confirmed
              arrMain[g].recovered += arrSeparate[d].recovered
              arrMain[g].deaths += arrSeparate[d].deaths
              arrMain[g].lastUpdate = arrSeparate[d].lastUpdate
              arrSeparate.splice(d, 1)
            }
          }
        }

        for (let z = 0; z < arrSeparate.length; z++) {
          arrMain.unshift(arrSeparate[z])
        }
        console.log(arrSeparate)
        // for (let n = 0; n < arrMain.length; n++) {
        //   arrMain[n].lastUpdate = String(arrMain[n].lastUpdate)
        // }

        //ReactTimeAgo date={date}

        this.setState({ statistics: arrMain })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <table className="tablstl">
        <tr>
          <th className="title">Country</th>
          <th className="title">Confirmed</th>
          <th className="title">Recovered</th>
          <th className="title">Deaths</th>
          <th className="title">Last Update</th>
        </tr>

        {this.state.statistics.map((stat, index) => (
          <tr key={index.toString()}>
            <td className="tdstyle">{stat.countryRegion}</td>
            <td className="tdstyle">{stat.confirmed}</td>
            <td className="tdstyle">{stat.recovered}</td>
            <td className="tdstyle">{stat.deaths}</td>
            <td className="tdstyle">
              {<TimeAgo date={stat.lastUpdate}></TimeAgo>}
            </td>
          </tr>
        ))}
      </table>
    )
  }
}
