import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import SVG from "react-inlinesvg";
import ReactEcharts from "echarts-for-react";
import Button from 'react-bootstrap/Button';
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

import wallet from "../../assets/icons/wallet-money-rounded.svg";
import book from "../../assets/icons/book-icon-rounded.svg";
import openBook from "../../assets/icons/open-book-rounded.svg";
import openBook2 from "../../assets/icons/open-book-2-rounded.svg";

const DashboardPub = () => {

  const { get_dashboard } = AdminProfile();
  const { authData } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlySale, setMonthlySale] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [yearlySale, setYearlySale] = useState([]);
  const [titleCount, setTitleCount] = useState(0);
  const [unsoldTitleCount, setUnsoldTitleCount] = useState(0);
  const [newCust, setNewCust] = useState([]);
  // const [soldTitleCount, setSoldTitleCount] = useState(0);
  // const [userMonthlySale, setUserMonthlySale] = useState(0);
  // const [userWeeklySales, setUserWeeklySales] = useState(0);
  // const [userYearlySale, setUserYearlySale] = useState(0);
  const [displaySalesChart, setdisplaySalesChart] = useState([]);
  const [xAxisTtile, setXAxixTitle] = useState('');
  // const [colorCode, setColorCode] = useState(['#E9E9F6', '#fcbdd6', '#097EDA', '#e6b9fa', '#d0ff73', '#6fc7f2']);
  const [currSale, setCurrSale] = useState({});
  const [prevSale, setPrevSale] = useState({});
  const [currMonthlySale, setMonthlyCurrSale] = useState({});
  const [prevMonthlySale, setMonthlyPrevSale] = useState({});
  // const [displaySalesCount, setdisplaySalesCount] = useState(0);
  const [displaySalesChartLegend, setdisplaySalesChartLegend] = useState([]);
  // const [displayCategorySalesChart, setdisplayCategorySalesChart] = useState([]);


  useEffect(() => {
    console.log("Dashbaord screen authdata: ", authData);
    if (authData === '' || authData === undefined || authData === null) {
    }
    else {
      dashboard();
    }

  }, [authData]);



  const dashboard = async () => {

    const response = await get_dashboard();
    console.log("Dashbaord screen : ", response);


    setTitleCount(response.title_count);
    setUnsoldTitleCount(response.unsoldTitles);
    setMonthlySale(response.monthlySale);
    let sortedArray = response.monthlySale.sort((a, b) => a.index - b.index);
    // const sortedArray = response.monthlySale.map((item, index) => ({ ...item, dayname: `Week ${index+1}` }));
    setMonthlySale(sortedArray); // setting sorted array
    console.log("After sorting monthly sale: ", sortedArray);
    let monthlySeriesOne = { name: '', data: [], type: 'bar', smooth: true }; // previous
    let monthlySeriesTwo = { name: '', data: [], type: 'bar', smooth: true }; // current
    for (let i = 0; i < sortedArray.length; i++) {
      monthlySeriesOne.name = sortedArray[i].previousseries;
      monthlySeriesOne.data.push(sortedArray[i].previous);
      monthlySeriesTwo.name = sortedArray[i].currentseries;
      monthlySeriesTwo.data.push(sortedArray[i].current);
    }
    setMonthlyCurrSale(monthlySeriesTwo);
    setMonthlyPrevSale(monthlySeriesOne);

    setWeeklySales(response.weeklySale);
    // Splitting weekly sale into two parts - current values and past values
    let xAxisData = [];
    let seriesOne = { name: '', data: [], type: 'bar', smooth: true }; // previous
    let seriesTwo = { name: '', data: [], type: 'bar', smooth: true }; // current
    for (let i = 0; i < response.weeklySale.length; i++) {
      xAxisData.push(response.weeklySale[i].xLabel);
      seriesOne.name = response.weeklySale[i].previousseries;
      seriesOne.data.push(response.weeklySale[i].previous);
      seriesTwo.name = response.weeklySale[i].currentseries;
      seriesTwo.data.push(response.weeklySale[i].current);
    }

    setCurrSale(seriesTwo);
    setPrevSale(seriesOne);
    setdisplaySalesChartLegend(xAxisData);
    setdisplaySalesChart(weeklySales);
    setXAxixTitle('By Week');
    setYearlySale(response.yearlySale);

    setTotalAmount(response.totalAmount);
    setNewCust(response.newly_added_customers);
    // setUserWeeklySales(response.user_weekly_purchased)

    // let usermsale = response.user_monthly_purchased;
    // setUserMonthlySale(usermsale);
    // console.log("week sale user : ", usermsale);
    // setUserYearlySale(response.user_yearly_purchased);
  }

  const changeSalesSelection = (e) => {
    // console.log("change sales selection : ", e);
    const val = Number(e);
    let xAxisData = [];
    let seriesOne = {name: '', data: [], type: 'bar', smooth: true}; // previous
    let seriesTwo = {name: '', data: [], type: 'bar', smooth: true}; // current
    switch (val) {
      case 0: 
      // Splitting weekly sale into two parts - current values and past values
      for(let i=0; i < weeklySales.length; i++){
        xAxisData.push(weeklySales[i].xLabel);
        seriesOne.name = weeklySales[i].previousseries;
        seriesOne.data.push(weeklySales[i].previous);
        seriesTwo.name = weeklySales[i].currentseries;
        seriesTwo.data.push(weeklySales[i].current);
      }
      
      setCurrSale(seriesTwo);
      setPrevSale(seriesOne);
      setdisplaySalesChartLegend(xAxisData);
      setdisplaySalesChart(weeklySales);
      // setdisplaySalesChartLegend([weeklySale[0].previousseries, ])
      setXAxixTitle('By Week');
      break;
      
      case 1: 
      for(let i=0; i < yearlySale.length; i++){
        xAxisData.push(yearlySale[i].xLabel);
        seriesOne.name = yearlySale[i].previousseries;
        seriesOne.data.push(yearlySale[i].previous);
        seriesTwo.name = yearlySale[i].currentseries;
        seriesTwo.data.push(yearlySale[i].current);
      }
      setCurrSale(seriesTwo);
      setPrevSale(seriesOne);
      setdisplaySalesChartLegend(xAxisData);
      setdisplaySalesChart(yearlySale);
      // const lastYear = date.getFullYear() - 1;
      setXAxixTitle('By Year');
      break;
      default: console.log('wrong value');
    }
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Dashboard" />
        <div className="body flex-grow-1 px-3">
          <div className="pub_dashboard_numbers_bar">
            <div className="card">
              <div className="card-body d-flex justify-content-around align-items-start">
                <div className="pub_dashboard_num_card">
                  <SVG src={wallet} height={55} />
                  <div className="data ">
                    <div className="title"> Total Amount</div>
                    <div className="number"><span style={{ color: '#555562', fontFamily: 'Roboto', fontSize: '20px' }}>₹ &nbsp;</span>{totalAmount}</div>
                  </div>
                </div>
                <div className="border_div mx-4"></div>
                <div className="pub_dashboard_num_card">
                  <SVG src={book} height={55} />
                  <div className="data ">
                    <div className="title"> Titles</div>
                    <div className="number">{titleCount < 10 ? "0" + titleCount : titleCount}</div>
                  </div>
                </div>
                <div className="border_div mx-4"></div>
                <div className="pub_dashboard_num_card">
                  <SVG src={openBook} height={55} />
                  <div className="data ">
                    <div className="title"> Titles sold</div>
                    <div className="number">
                      {(titleCount - unsoldTitleCount) < 10 ? "0" + (titleCount - unsoldTitleCount) : titleCount - unsoldTitleCount}
                    </div>
                  </div>
                </div>
                <div className="border_div mx-4"></div>
                <div className="pub_dashboard_num_card">
                  <SVG src={openBook2} height={55} />
                  <div className="data ">
                    <div className="title"> Titles Unsold</div>
                    <div className="number">
                      {unsoldTitleCount < 10 ? "0" + unsoldTitleCount : unsoldTitleCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="title mb-3">No of Titles</div>
                  <div className="number">{titleCount}</div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>

            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="title mb-3">No of Titles sold</div>
                  <div className="number">
                    {titleCount - unsoldTitleCount}
                  </div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="title">No of Titles Unsold</div>
                  <div className="number">{unsoldTitleCount}</div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-3">
              </div>
            </div> */}
          </div>
          <div className="middle_row_charts width_fix my-2">
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3 className="mx-4">Sales</h3>
                {/* <select name="salesLineChart" id="salesLineChart" className="form-select custom_select" onChange={(e) => changeSalesSelection(e)}>
                  <option value="0" selected>By Week</option>
                  <option value="1">By Year</option>
                </select> */}
                <div className="filter_btns">
                  <Button variant="outline-primary" onClick={()=> changeSalesSelection(0)}>Week</Button>
                  <Button variant="outline-danger" onClick={()=> changeSalesSelection(1)}>Year</Button>
                </div>
              </div>
              <ReactEcharts
                // key={Date.now()}
                theme="light"
                option={
                  {
                    // color: ["#0E37E1"],
                    tooltip: {
                      trigger: "axis",
                      axisPointer: {
                        type: "shadow"
                      }
                    },
                    grid: {
                      left: '7%',
                      right: '4%',
                      bottom: '8%',
                      containLabel: true
                    },
                    // legend: {
                    //   data: ['Previous', 'Current']
                    // },
                    tooltip:{
                      label: {
                        formatter : function(d){
                          console.log(d);
                          return d.label;
                        }
                      }
                    },
                    xAxis: {
                      type: 'category',
                      // data: ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7']
                      data: displaySalesChartLegend.map((data, index) => {
                        return data
                      }),
                      axisTick: {
                        alignWithLabel: true
                      },
                      name: xAxisTtile,
                      nameLocation: 'center',
                      nameGap: 50,
                      axisLabel : {
                        interval: 0,
                        rotate: 45
                      }
                    },
                    yAxis: {
                      type: 'value',
                      name: 'INR',
                      nameLocation: 'middle',
                      nameGap: 45,
                      axisLabel: {
                        formatter: `₹ {value}`
                      }
                    },
                    series: [
                      prevSale, currSale
                    ]
                  }
                }
                style={{ width: "100%", height: 350}}
              />
            </div>
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3 className="mt-2 mx-4">Number of New Customers</h3>
              </div>
              <ReactEcharts
                // key={Date.now()}
                theme="light"
                option={
                  {
                    tooltip: {
                      trigger: "axis",
                      axisPointer: {
                        type: "shadow"
                      }
                    },
                    grid: {
                      left: '10%',
                      right: '4%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: {
                      type: 'category',
                      // data: ['Weekly', 'Monthly', 'Yearly'],
                      data: newCust.map((data)=>{
                        return data.xAxisLabel
                      }),
                      // name: 'Weekly and monthly data',
                      // nameLocation: 'center',
                      // nameGap: 30
                    },
                    yAxis: {
                      type: 'value',
                      name: 'Number of new customers',
                      nameLocation: 'center',
                      nameGap: 40,
                      // min: Math.max(0),
                      // max: Math.max(5),
                      minInterval: 1
                    },
                    series: [
                      {
                        data: newCust.map((data) => {
                          return {
                            value: data.newcustomers,
                            itemStyle: {
                              // borderRadius: [100, 100, 0, 0]
                            }
                          }
                        }),
                        type: 'bar',
                        barWidth: "15%"
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 350 }}
              />
            </div>
          </div>
          <div className="third_row_charts my-2 mx-1">
            <div className="card">
              <div className="card_header">
                <h3 className="mt-2 mx-3">Monthly Sales</h3>
              </div>
              <ReactEcharts
                // key={Date.now()}
                theme="light"
                option={
                  {
                    // color: ["#0E37E1"],
                    tooltip: {
                      trigger: "axis",
                      axisPointer: {
                        type: "shadow"
                      }
                    },
                    grid: {
                      left: '7%',
                      right: '4%',
                      bottom: '8%',
                      containLabel: true
                    },
                    // legend: {
                    //   data: ['Previous', 'Current']
                    // },
                    tooltip:{
                      label: {
                        formatter : function(d){
                          console.log(d);
                          return d.label;
                        }
                      }
                    },
                    xAxis: {
                      type: 'category',
                      // data: ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7']
                      data: monthlySale.map((data, index) => {
                        // console.log("monthly sale : ", data);
                        return data.name;
                      }),
                      axisTick: {
                        alignWithLabel: true
                      },
                      name: 'By Month',
                      nameLocation: 'center',
                      nameGap: 30
                    },
                    yAxis: {
                      type: 'value',
                      name: 'INR',
                      nameLocation: 'middle',
                      nameGap: 45,
                      axisLabel: {
                        formatter: `₹ {value}`
                      }
                    },
                    series: [
                      currMonthlySale, prevMonthlySale
                    ]
                  }
                }
                style={{ width: "100%", height: 400, padding: '4px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPub;
