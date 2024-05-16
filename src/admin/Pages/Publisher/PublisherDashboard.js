import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import SVG from "react-inlinesvg";
import tick from "../../assets/icons/video-tick.svg";
import userRounded from "../../assets/icons/profile-circle.svg";
import users from "../../assets/icons/profile-2user.svg";
import money from "../../assets/icons/money.svg";
import edit from "../../assets/icons/message-edit.svg";
import location from "../../assets/icons/location-pin.svg";
import book from "../../assets/icons/book-icon.svg";
import ReactEcharts from "echarts-for-react";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

const PublisherDashBoard = () => {

  const { get_dashboard } = AdminProfile();
  const { authData } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlySale, setMonthlySale] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [yearlySale, setYearlySale] = useState([]);
  const [titleCount, setTitleCount] = useState(0);
  const [unsoldTitleCount, setUnsoldTitleCount] = useState(0);
  const [soldTitleCount, setSoldTitleCount] = useState(0);
  const [userMonthlySale, setUserMonthlySale] = useState(0);
  const [userWeeklySales, setUserWeeklySales] = useState(0);
  const [userYearlySale, setUserYearlySale] = useState(0);
  const [displaySalesChart, setdisplaySalesChart] = useState([]);
  const [colorCode, setColorCode] = useState(['#E9E9F6', '#FF953F', '#E9E9F6', '#097EDA', '#E9E9F6', '#FF953F', '#E9E9F6']);


  useEffect(() => {
    console.log("Dashbaord screen authdata: ", authData);
    if(authData === '' || authData === undefined || authData === null){
    }
    else{
      dashboard();
    }
    
  }, [authData]);



  const dashboard = async () => {
    
    const response = await get_dashboard();
    console.log("Dashbaord screen : ", response);

    
    setTitleCount(response.title_count);
    setUnsoldTitleCount(response.unsoldTitles);
    // const soldcount = titleCount - unsoldTitleCount
    // console.log("sold count : ", soldcount);
    // setSoldTitleCount(soldcount);

    // setMonthlySale(response.monthlySale);
    // let sortedArray = response.monthlySale.sort((a, b) => a.ordinal - b.ordinal);
    const sortedArray = response.monthlySale.map((item, index) => ({ ...item, dayname: `Week ${index+1}` }));
    setMonthlySale(sortedArray); // setting sorted array
    console.log("After sorting monthly sale: ", sortedArray);
    
    setWeeklySales(response.weeklySale);
    console.log("Before sorting : ", response.weeklySale);
    const weeklysortedArray = response.weeklySale.sort((a, b) => a.ordinal - b.ordinal);
    setWeeklySales(weeklysortedArray); // setting sorted array
    console.log("After sorting weekly sale: ", weeklySales);
    console.log("weeklysortedArray: ", weeklysortedArray);
    setdisplaySalesChart(weeklysortedArray);

    
    setYearlySale(response.yearlySale);
    console.log("Before sorting : ", response.yearlySale);
    let yearsortedArray = response.yearlySale.sort((a, b) => a.ordinal - b.ordinal);
    yearsortedArray = yearsortedArray.map((item, index) => ({ ...item, dayname: item.monthname }));
    setYearlySale(yearsortedArray); // setting sorted array
    console.log("After sorting weekly sale: ", yearlySale);

    setTotalAmount(response.totalAmount)
    setUserWeeklySales(response.user_weekly_purchased)
    
    let usermsale = response.user_monthly_purchased;
    setUserMonthlySale(usermsale);
    console.log("week sale user : ", usermsale);
    setUserYearlySale(response.user_yearly_purchased);
  }

  const changeSalesSelection = (e) => {
    console.log("change sales selection : ", e);
    const val = Number(e.target.value);
    console.log(val);
    let sortedArray = [];
    switch (val) {
      case 0: 
      sortedArray = weeklySales.sort((a, b) => a.ordinal - b.ordinal);
      setWeeklySales(sortedArray); // setting sorted array
      console.log("After sorting : ", weeklySales);
      setdisplaySalesChart(weeklySales); 
      break;
      case 1: 
      sortedArray = monthlySale.sort((a, b) => a.ordinal - b.ordinal);
      sortedArray = sortedArray.map((item, index) => ({ ...item, dayname: `Week ${index+1}` }));
      setMonthlySale(sortedArray); // setting sorted array
      console.log("After sorting : ", monthlySale);
      setdisplaySalesChart(monthlySale);
      break;
      case 2: 
      sortedArray = yearlySale.sort((a, b) => a.ordinal - b.ordinal);
      sortedArray = sortedArray.map((item, index) => ({ ...item, dayname: item.monthname }));
      setYearlySale(sortedArray); // setting sorted array
      console.log("After sorting : ", yearlySale);
      setdisplaySalesChart(yearlySale);
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
          <div className="dashboard_numbers_bar">
          <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{totalAmount}</div>
                  <div className="title"> Total Amount</div>
                </div>
                <SVG src={money} height={25} width={25} fill="#3498db"/>
              </div>
              <div className="card_footer px-3 pb-3">
                {/* Report last week */}
                </div>
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{titleCount}</div>
                  <div className="title mb-3">Titles</div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
              {/* <div className="card_footer px-3 pb-3">
                Publisher wise
              </div> */}
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">
                    {/* {soldTitleCount} */}
                    {titleCount - unsoldTitleCount}
                    </div>
                  <div className="title mb-3">Titles sold</div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
              {/* <div className="card_footer px-3 pb-3">
                <SVG src={location} height={10} width={10}/> Located in India
              </div> */}
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{unsoldTitleCount}</div>
                  <div className="title">Titles Unsold</div>
                  {/* <div className="title">Users</div> */}
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-3">
                {/* Added last week */}
                </div>
            </div>
          </div>
          <div className="middle_row_charts my-3">
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3>Sales</h3>
                <select name="salesLineChart" id="salesLineChart" className="form-select custom_select" onChange={(e) => changeSalesSelection(e)}>
                  {/* <option value="0">Please Select</option> */}
                  <option value="0" selected>Last Week</option>
                  <option value="1">Last Month</option>
                  <option value="2">Last Year</option>
                </select>
              </div>
              
              {/* {weeklySales.map((data, index) => (
                <p>{data.amount}</p>
              )

              )} */}
              <ReactEcharts
                // key={Date.now()}
                theme="light"
                option={
                  {
                    color: ["#0E37E1"],
                    tooltip: {
                      trigger: "axis",
                      axisPointer: {
                        type: "shadow"
                      }
                    },
                    xAxis: {
                      type: 'category',
                      data: displaySalesChart.map((data, index) => {
                        return data.dayname
                      })
                      // data:['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7']
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [
                      {
                        // data: [650, 940, 1750, 2764, 1550, 1870, 980],
                        data: displaySalesChart.map((data, index) => {
                          return {
                            value: data.amount,
                            itemStyle: {
                              // color: '#'+ Math.floor(Math.random()*16777215).toString(16),
                              color: colorCode[index],
                              borderRadius: [100, 100, 0, 0]
                            }
                          }
                        }),
                        type: 'line',
                        smooth: true
                        // barWidth: "40%",
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 400 }}
              />
            </div>
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3 className="my-2">Number of Added Customers</h3>
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
                    xAxis: {
                      type: 'category',
                      data: ['Weekly', 'Monthly', 'Yearly']
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [
                      {
                        data: [
                          {
                            value: parseInt(userWeeklySales),
                            itemStyle: {
                              color: '#E9E9F6',
                              borderRadius: [100, 100, 0, 0]
                            }
                          },
                          {
                            value: parseInt(userMonthlySale),
                            itemStyle: {
                              color: '#FF953F',
                              borderRadius: [100, 100, 0, 0]
                            }
                          },
                          {
                            value: parseInt(userYearlySale),
                            itemStyle: {
                              color: '#E9E9F6',
                              borderRadius: [100, 100, 0, 0]
                            }
                          }
                          
                          ],
                        type: 'bar',
                        barWidth: "40%",
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 400 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublisherDashBoard;
