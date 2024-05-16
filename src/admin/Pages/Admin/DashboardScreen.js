import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import SVG from "react-inlinesvg";
import tick from "../../assets/icons/video-tick.svg";
import customerTicket from "../../assets/icons/receipt-item.svg";
import wallet from "../../assets/icons/wallet-money.svg";
import userRounded from "../../assets/icons/profile-circle.svg";
import languageicon from "../../assets/icons/language.svg";
import categoryicon from "../../assets/icons/category.svg";
import users from "../../assets/icons/profile-2user.svg";
import book from "../../assets/icons/book-icon.svg";
import location from "../../assets/icons/global.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import ReactEcharts from "echarts-for-react";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

const DashboardScreen = () => {
  const { get_dashboard } = AdminProfile();
  const { authData } = useAuth();
  const [totalPublishers, setTotalPublishers] = useState(0);
  const [pubTitle, setPubTitle] = useState([]);
  const [pubTitleCount, setPubTitleCount] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState([]);
  const [catTitleCount, setCatTitleCount] = useState(0);
  const [langTitle, setLangTitle] = useState([]);
  const [langTitleCount, setLangTitleCount] = useState(0);
  // Users Count
  const [returningUserCount, setReturningUserCount] = useState(0);
  const [usercountMonthly, setusercountMonthly] = useState(0);
  const [usercountWeekly, setusercountWeekly] = useState(0);
  const [usercountYearly, setusercountYearly] = useState(0);
  const [displayUserCount, setdisplayUserCount] = useState(0);
  // Sales
  const [revenue, setRevenue] = useState(0);
  const [monthlySale, setMonthlySale] = useState([]);
  const [weeklySale, setWeeklySale] = useState([]);
  const [yearlySale, setYearlySale] = useState([]);
  const [displaySalesCount, setdisplaySalesCount] = useState(0);
  const [displaySalesChart, setdisplaySalesChart] = useState([]);

  const [pubSales, setPubSales] = useState([]);
  const [pubSalesCount, setPubSalesCount] = useState(0);
  const [publisherTitle, setPublisherTitle] = useState('');
  const [genreSales, setGenreSales] = useState([]);
  const [langSales, setLangSales] = useState([]);
  const [colorCode, setColorCode] = useState(['#E9E9F6', '#FF953F', '#E9E9F6', '#097EDA', '#E9E9F6', '#FF953F', '#E9E9F6']);



  const [borderRadius, setBorderRadius] = useState([]); // use if needed for the column width in bar graphs

  useEffect(() => {
    dashboard();
    // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // console.log("Random color", randomColor)
  }, [authData]);

  const dashboard = async () => {
    const response = await get_dashboard();
    console.log("Dashbaord screen : ", response);
    if (response !== undefined) {
      setTotalPublishers(response.totalpublishers);
      setCategoryTitle(response.categoryTitle);
      setCatTitleCount(response.categoryTitle[0].title);
      setPubTitle(response.publisherTitle);
      setPubTitleCount(response.publisherTitle[0].title); // by default setting the first value
      setLangTitle(response.languageTitle);
      setLangTitleCount(response.languageTitle[0].title); // by default setting the
      // User Count
      setReturningUserCount(response.returningUserCount);
      setdisplayUserCount(response.usercountWeekly);
      setdisplaySalesCount(response.weeklySale[0].amount);
      setusercountWeekly(response.usercountWeekly);
      setusercountMonthly(response.usercountMonthly);
      setusercountYearly(response.usercountYearly);
      // Sales
      setRevenue(response.revenue);

      // setMonthlySale(response.monthlySale);
      // let sortedArray = response.monthlySale.sort((a, b) => a.ordinal - b.ordinal);
      const sortedArray = response.monthlySale.map((item, index) => ({ ...item, dayname: `Week ${index+1}` }));
      setMonthlySale(sortedArray); // setting sorted array
      console.log("After sorting monthly sale: ", sortedArray);
      
      setWeeklySale(response.weeklySale);
      console.log("Before sorting : ", response.weeklySale);
      const weeklysortedArray = response.weeklySale.sort((a, b) => a.ordinal - b.ordinal);
      setWeeklySale(weeklysortedArray); // setting sorted array
      console.log("After sorting weekly sale: ", weeklySale);
      console.log("weeklysortedArray: ", weeklysortedArray);
      
      setdisplaySalesChart(weeklysortedArray);
      
      setYearlySale(response.yearlySale);
      console.log("Before sorting : ", response.yearlySale);
      let yearsortedArray = response.yearlySale.sort((a, b) => a.ordinal - b.ordinal);
      yearsortedArray = yearsortedArray.map((item, index) => ({ ...item, dayname: item.monthname }));
      setYearlySale(yearsortedArray); // setting sorted array
      console.log("After sorting weekly sale: ", yearlySale);

      setPubSales(response.publisherSales);
      setPubSalesCount(response.publisherSales[0].linetotal);
      setPublisherTitle(response.publisherSales[0].publisher);
      setGenreSales(response.genreSales);
      setLangSales(response.languageSales);

    }


  }

  const changeUserCount = (e) => {
    console.log("change user count : ", e);
    const val = Number(e.target.value);
    console.log(val);
    switch (val) {
      case 0: console.log(usercountWeekly); setdisplayUserCount(usercountWeekly); break;
      case 1: console.log(usercountMonthly); setdisplayUserCount(usercountMonthly); break;
      case 2: console.log(usercountYearly); setdisplayUserCount(usercountYearly); break;
      default: console.log('wrong value');
    }
  }

  const changeSalesCount = (e) => {
    console.log("change sales count : ", e);
    const val = Number(e.target.value);
    console.log(val);
    switch (val) {
      case 0: console.log(usercountWeekly); setdisplaySalesCount(weeklySale); break;
      case 1: console.log(usercountMonthly); setdisplaySalesCount(monthlySale); break;
      default: console.log('wrong value');
    }
  }

  const changeSalesSelection = (e) => {
    console.log("change sales selection : ", e);
    const val = Number(e.target.value);
    console.log(val);
    let sortedArray = [];
    switch (val) {
      case 0: 
      sortedArray = weeklySale.sort((a, b) => a.ordinal - b.ordinal);
      setWeeklySale(sortedArray); // setting sorted array
      console.log("After sorting : ", weeklySale);
      setdisplaySalesChart(weeklySale); 
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

  const changePublisherTitle = (e) => {
    console.log("change pub title : ", e);
    const val = Number(e.target.value);
    console.log("change pub title count : ", val);
    setPubTitleCount(val);
  }

  const changeLanguageTitle = (e) => {
    console.log("change lang title : ", e);
    const val = Number(e.target.value);
    console.log("change lang title count : ", val);
    setLangTitleCount(val);
  }

  const changeCatTitleCount = (e) => {
    console.log("change cat title : ", e);
    const val = Number(e.target.value);
    console.log("change cat title count : ", val);
    setCatTitleCount(val);
  }

  const changePubSales = (e) => {
    console.log("change pub sales : ", e);
    const val = e.target.value;
    console.log("pub sales name : ", val);

    // const cval = Number(e.target.value);
    // console.log("pub sales count : ", cval);
    // setPubSalesCount(val.linetotal);
    // if (pubSales && pubSales[val]) {
    // const selectedLineTotal = setPubSales(val.linetotal);
    // console.log('Selected Line Total:', selectedLineTotal);

    // setPubSalesCount(selectedLineTotal)
    // }
    if (pubSales && pubSales[val]) {
      // Access the linetotal value based on the selected index
      const selectedLineTotal = pubSales[val].linetotal;
      const selectedPubName = pubSales[val].publisher;


      // Use the selected linetotal value as needed
      console.log('Selected Line Total:', selectedLineTotal);

      // You can set the value to state or perform any other actions with it
      // For example, if you want to set it to a state variable:
      setPubSalesCount(selectedLineTotal)
      setPublisherTitle(selectedPubName);
    }
  }



  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Dashboard" />
        <div className="body px-3">
          <div className="dashboard_numbers_bar">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{totalPublishers}</div>
                  <div className="title">Publishers</div>
                </div>
                <SVG src={tick} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-4">
                <SVG src={location} height={10} width={10} /> Across the Globe
              </div>
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{displayUserCount}</div>
                  <div className="title">Users</div>
                </div>
                <SVG src={userRounded} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-2">
                <select name="userWise" id="userWise" className="form-select custom_select" onChange={(e) => changeUserCount(e)}>
                  <option value="0">Weekly</option>
                  <option value="1">Monthly</option>
                  <option value="2">Yearly</option>
                </select>
              </div>
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{returningUserCount}</div>
                  <div className="title">Users returning to buy</div>
                </div>
                <SVG src={users} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-4">Report last week</div>
            </div>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="data ">
                  <div className="number">{pubTitleCount}</div>
                  <div className="title">Titles</div>
                </div>
                <SVG src={book} height={25} width={25} />
              </div>
              <div className="card_footer px-3 pb-2">
                <select name="pubWise" id="pubWise" className="form-select custom_select" onChange={(e) => changePublisherTitle(e)}>
                  {
                    pubTitle && pubTitle.map((data, index) => {
                      return <option value={data.title} key={index}>{data.publisher}</option>
                    })
                  }
                </select>
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
              {/* {weeklySale} */}

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
                      // data: ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7']
                      data: displaySalesChart.map((data, index) => {
                        return data.dayname
                      })
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
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 400 }}
              />
            </div>
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3 className="my-2">Genre wise Sales</h3>
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
                      data: genreSales.map((genre, index) => {
                        return genre.category
                      })
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [
                      {
                        // data: [
                        //   {
                        //     value: 135,
                        //     itemStyle: {
                        //       color: '#E9E9F6',
                        //       borderRadius: [100, 100, 0, 0]
                        //     }
                        //   },
                        // ],
                        data: genreSales.map((genre, index) => {
                          return {
                            value: genre.linetotal,
                            itemStyle: {
                              // color: '#'+ Math.floor(Math.random()*16777215).toString(16),
                              color: colorCode[index],
                              borderRadius: [100, 100, 0, 0]
                            }
                          }
                        }),
                        type: 'bar',
                        barWidth: "20%"
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 400 }}
              />
            </div>
          </div>
          <div className="third_row my-3">
            <div className="card px-2">
              <div className="card_header d-flex align-items-center justify-content-between">
                <div className="publisher_sales">
                  <h3
                  >
                    {/* {publisherTitle} */}
                    Publisher Sales
                  </h3>
                  {/* <span className="number">{pubSalesCount}</span><span> Sales</span> */}
                </div>
                {/* <select name="salesLineChart" id="salesLineChart" className="form-select custom_select" onChange={(e) => changePubSales(e)}>
                  {
                    pubSales && pubSales.map((data, index) => {
                      return <option value={index} key={index}>{data.publisher}</option>
                    })
                  }
                </select> */}
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
                      data: pubSales.map((pub, index) => {
                        return pub.publisher
                      })
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [
                      {
                        data: pubSales.map((pub, index) => {
                          return {
                            value: pub.linetotal,
                            itemStyle: {
                              // color: '#'+ Math.floor(Math.random()*16777215).toString(16),
                              color: colorCode[index],
                              borderRadius: [100, 100, 0, 0],
                              width: '20px',
                              maintainAspectRatio: false
                            }
                          }
                        }),
                        barWidth: "20%",
                        type: 'bar'
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 300, maintainAspectRatio: false }}
              />
            </div>
            <div className="text_info_cards">
              {/* <div className="ticket_card card">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="data ">
                  <div className="title my-2">Customer Tickets</div>
                    <div className="number">191</div>
                  </div>
                  <SVG src={customerTicket} height={25} width={25}/>
                </div>
                <div className="card_footer px-3 pb-3 tickets">
                  <p>Ticket Status</p>
                  <div className="ticket_status">
                    <span className="open_tickets">17 Open</span>
                    <span className="pending_tickets">93 Pending</span>
                    <span className="closed_tickets">81 Closed</span>
                  </div>
                </div>
              </div> */}
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="data ">
                    <div className="number">{langTitleCount}</div>
                    <div className="title">Language Title</div>
                  </div>
                  <SVG src={languageicon} fill="#3498db" height={25} width={25} />
                </div>
                <div className="card_footer px-3 pb-3">
                  <select name="langWise" id="langWise" className="form-select custom_select" onChange={(e) => changeLanguageTitle(e)}>
                    {
                      langTitle && langTitle.map((data, index) => {
                        return <option value={data.title} key={index}>{data.language}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              {/* <div className="card">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="data ">
                    <div className="title mb-3">Payment Due to <br /> Publishers</div>
                    <div className="number">Rs. 17,894</div>
                  </div>
                  <SVG src={wallet} height={25} width={25} />
                </div>
                <div className="card_footer px-3 pb-3">
                  <SVG src={location} height={10} width={10}/> Located in India
                </div>
              </div> */}
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="data ">
                    <div className="number">{catTitleCount}</div>
                    <div className="title">Category Title</div>
                  </div>
                  <SVG src={categoryicon} height={25} width={25} />
                </div>
                <div className="card_footer px-3 pb-3">
                  <select name="userWise" id="userWise" className="form-select custom_select" onChange={(e) => changeCatTitleCount(e)}>
                    {
                      categoryTitle && categoryTitle.map((data, index) => {
                        return <option value={data.title} key={index}>{data.category}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="gateway_performance card">
              <div className="card_header publisher_sales">
                <h3 className="my-1">Sales By Language</h3>
                <div className="d-flex align-items-center justify-content-evenly">
                  {/* <span className="number">1,879</span>
                  <span className="growth mx-3">
                    <SVG src={arrowUp} height={10} width={10} />
                    + 3.5%
                  </span> */}
                </div>
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
                      data: langSales.map((lang, index) => {
                        return lang.language
                      })
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: [
                      {
                        data: langSales.map((lang, index) => {
                          return {
                            value: lang.linetotal,
                            itemStyle: {
                              // color: '#'+ Math.floor(Math.random()*16777215).toString(16),
                              color: colorCode[index],
                              borderRadius: [100, 100, 0, 0],
                              width: '20px',
                              maintainAspectRatio: false
                            }
                          }
                        }),
                        barWidth: "20%",
                        type: 'bar'
                      }
                    ]
                  }
                }
                style={{ width: "100%", height: 300, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardScreen;
