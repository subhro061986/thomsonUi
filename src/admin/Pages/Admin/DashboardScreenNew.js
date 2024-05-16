import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import Month from "../../Config/Month.json";
import Button from 'react-bootstrap/Button';
import SVG from "react-inlinesvg";
import ReactEcharts from "echarts-for-react";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
import publisherCountImg from "../../assets/img/publisherCountImg.png"
import userCountImg from "../../assets/img/userCountImg.png"
import RepeatCustomerImg from "../../assets/img/RepeatCustomerImg.png"
import TitleCountImg from "../../assets/img/TitleCountImg.png"
import greendot from "../../assets/img/greendot.png"
import graydot from "../../assets/img/graydot.png"

const DashboardScreenNew = () => {
  const { get_dashboard, get_admin_monthlysales, ssadminDashboard,salesVal ,dimensionsVal,legendVal,currMonthlySale,prevMonthlySale} = AdminProfile();
  const { authData } = useAuth();
  const [totalPublishers, setTotalPublishers] = useState(0);
  const [pubTitle, setPubTitle] = useState([]);
  // const [pubTitleCount, setPubTitleCount] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState([]);
  // const [catTitleCount, setCatTitleCount] = useState(0);
  const [langTitle, setLangTitle] = useState([]);
  const [langTitleCount, setLangTitleCount] = useState(0);
  const [allCount,setAllCount]= useState(0)
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
  const [currSale, setCurrSale] = useState({});
  const [prevSale, setPrevSale] = useState({});
  // const [currMonthlySale, setMonthlyCurrSale] = useState({});
  // const [prevMonthlySale, setMonthlyPrevSale] = useState({});
  const [displaySalesCount, setdisplaySalesCount] = useState(0);
  const [displaySalesChart, setdisplaySalesChart] = useState([]);
  const [displaySalesChartLegend, setdisplaySalesChartLegend] = useState([]);
  const [displayCategorySalesChart, setdisplayCategorySalesChart] = useState([]);

  const [pubSales, setPubSales] = useState([]);
  const [pubSalesCount, setPubSalesCount] = useState(0);
  const [publisherTitle, setPublisherTitle] = useState('');
  const [displayCount, setDisplayCount] = useState(0);
  const [tempDisplayCount, setTempDisplayCount] = useState(0);
  
  const [genreSales, setGenreSales] = useState([]);
  const [langSales, setLangSales] = useState([]);
  // const [colorCode, setColorCode] = useState(['#E9E9F6', '#FF953F', '#E9E9F6', '#097EDA', '#E9E9F6', '#FF953F', '#E9E9F6']);
  const [xAxisTtile, setXAxixTitle] = useState('');
  const [xAxisCategoryTtile, setxAxisCategoryTtile] = useState('');
  const [pubDropDownVal, setPubDropDownVal] = useState(0);
  const [langDropDownVal, setLangDropDownVal] = useState(0);
  const [genDropDownVal, setGenDropDownVal] = useState(0);

  const [toggleDropDownView, setToggleDropDownView] = useState(false);

  const [borderRadius, setBorderRadius] = useState([]); // use if needed for the column width in bar graphs
  const[selectedDropdownType, setSelectedDropdownType] = useState('');
  const[selectedDropdownTypeList, setSelectedDropdownTypeList] = useState([]);
  const[publisherCountStatus, setPublisherCountStatus]=useState(false);
  const[languageCountStatus, setLanguageCountStatus]=useState(false);
  const[genreCountStatus, setGenreCountStatus]=useState(false);
  const[titleCountMonthly,setTitleCountMonthly]=useState(0);
  const[titleCountWeekly,setTitleCountWeekly]=useState(0);
  const[weeklySalesCountStatus,setWeeklySalesCountStatus]=useState(true)
  const[yearlySalesCountStatus,setYearlySalesCountStatus]=useState(false)

  const [years, setYears] = useState([]);
  const [selectedYearDropDownValue, setSelectedYearDropDownValue]=useState("");
  const [selectedMonthDropDownValue, setSelectedMonthDropDownValue]=useState("");
  const [varLegendData, setVarLegendData] = useState([]);
  


  useEffect(() => {
    // if(authData !== '' || authData !== null || authData !== undefined){
      dashboard();
      updateYears(2023);
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth()+1;
      let paddedMonth=currentMonth.toString().padStart(2,'0')
      setSelectedYearDropDownValue(currentYear);
      setSelectedMonthDropDownValue(paddedMonth)
      //getMonthlySales(paddedMonth, currentYear);
    // }
    // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // console.log("Random color", randomColor)
    
  }, [authData]);





  useEffect(()=>{
    console.log("inside useEffect")
    if(selectedDropdownType !== ''){
      let tempArray=[]
      switch(selectedDropdownType){
        case "Publisher":
          tempArray=pubTitle.map((item, index) => ({ ...item, data: item.publisher }));
        break;
        case "Language":
          tempArray=langTitle.map((item, index) => ({ ...item, data: item.language }));
          break;
        case "Genre":
          tempArray=categoryTitle.map((item, index) => ({ ...item, data: item.category }));
          break;
        default:
          tempArray=[]
        }
        console.log("tempArray=",tempArray)
        setSelectedDropdownTypeList(tempArray)
    }

  },[selectedDropdownType])

  const updateYears = (startYear) => {
    const endDate = new Date().getFullYear();
    let years = [];
  
    for (var i = startYear; i <= endDate; i++) {
      years.push(startYear);
      startYear++;
    }
    setYears(years);
  }

  const dashboard = async () => {
    const response = await get_dashboard();
    console.log("Dashbaord screen : ", response);
    if (response !== undefined) {
      setTotalPublishers(response.totalpublishers);
      setCategoryTitle(response.categoryTitle);
      // setCatTitleCount(response.categoryTitle[0].title);
      setPubTitle(response.publisherTitle);
      // setPubTitleCount(response.publisherTitle[0].title); // by default setting the first value
      setDisplayCount(response.publisherTitle.reduce((acc, item) => acc + item.title, 0));
      setTempDisplayCount(response.publisherTitle.reduce((acc, item) => acc + item.title, 0));
      setAllCount(response.publisherTitle.reduce((acc, item) => acc + item.title, 0));
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
      // setMonthlyCurrSale(monthlySeriesTwo);
      // setMonthlyPrevSale(monthlySeriesOne);

      setWeeklySale(response.weeklySale);
      // Splitting weekly sale into two parts - current values and past values
      // let currVal = [];
      // let prevVal = [];
      let xAxisData = [];
      let seriesOne = { name: '', data: [], type: 'bar', smooth: true }; // previous
      let seriesTwo = { name: '', data: [], type: 'bar', smooth: true }; // current
      for (let i = 0; i < response.weeklySale.length; i++) {
        xAxisData.push(response.weeklySale[i].xLabel);
        seriesOne.name = response.weeklySale[i].previousseries;
        seriesOne.data.push(response.weeklySale[i].previous);
        seriesTwo.name = response.weeklySale[i].currentseries;
        seriesTwo.data.push(response.weeklySale[i].current);
        // currVal.push(
        //   {
        //     data : response.weeklySale[i].current,
        //     meta : response.weeklySale[i].currentseries
        //   }
        // );
        // prevVal.push(
        //   {
        //     data : response.weeklySale[i].previous,
        //     meta : response.weeklySale[i].previousseries
        //   }
        // );
        // currVal.push(response.weeklySale[i].current)
        // prevVal.push(response.weeklySale[i].previous)
      }

      setCurrSale(seriesTwo);
      setPrevSale(seriesOne);
      setdisplaySalesChartLegend(xAxisData);
      setdisplaySalesChart(weeklySale);
      setXAxixTitle('By Week');
      setTitleCountMonthly(response.titleCountMonthly)
      setTitleCountWeekly(response.titleCountWeekly)


      // console.log("Before sorting : ", response.weeklySale);
      // const weeklysortedArray = response.weeklySale.sort((a, b) => a.ordinal - b.ordinal);
      // setWeeklySale(weeklysortedArray); // setting sorted array
      // console.log("weekly sale: ", weeklySale);
      // console.log("weeklysortedArray: ", weeklysortedArray);


      setYearlySale(response.yearlySale);

      // console.log("Before sorting : ", response.yearlySale);
      // let yearsortedArray = response.yearlySale.sort((a, b) => a.ordinal - b.ordinal);
      // yearsortedArray = yearsortedArray.map((item, index) => ({ ...item, dayname: item.monthname }));
      // setYearlySale(yearsortedArray); // setting sorted array
      // console.log("After sorting weekly sale: ", yearlySale);

      if (response.publisherSales != null && response.publisherSales.length > 0) {

        setPubSales(response.publisherSales);
        setPubSalesCount(response.publisherSales[0].linetotal);
        setPublisherTitle(response.publisherSales[0].publisher);
      }
      if (response.genreSales != null && response.genreSales.length > 0) {
        setGenreSales(response.genreSales);
        setdisplayCategorySalesChart(response.genreSales);
      }
      if (response.languageSales != null && response.languageSales.length > 0) {
        setLangSales(response.languageSales);
      }
      setxAxisCategoryTtile('Genre');
    }


  }

  const getMonthlySales = async (month, year) => {
    let args = {
      "yearmonth": year + "-" + month
    };
    
    const response = await get_admin_monthlysales(args);
    // console.log("Sales resp ====>: ", response.monthlySale);
    // setMonthlySale(response.monthlySale);
    // let diemVal=['name']
    // let keys=Object.keys(response.monthlySale[0])
    // keys.forEach(element => {
    //   if(element!=='name' && element!=='index'){
    //     diemVal.push(element)
    //   }
    // });
    // console.log("LEGEND DATA",diemVal)
    // setVarLegendData(diemVal)
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
      // setMonthlyCurrSale(monthlySeriesTwo);
      // setMonthlyPrevSale(monthlySeriesOne);
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
    // console.log("change sales selection : ", e);
    const val = Number(e);
    // console.log(val);
    // let sortedArray = [];
    // let date = new Date();
    // let currVal = [];
    // let prevVal = [];
    let xAxisData = [];
    let seriesOne = { name: '', data: [], type: 'bar', smooth: true }; // previous
    let seriesTwo = { name: '', data: [], type: 'bar', smooth: true }; // current
    switch (val) {
      case 0:
        // Splitting weekly sale into two parts - current values and past values
        for (let i = 0; i < weeklySale.length; i++) {
          xAxisData.push(weeklySale[i].xLabel);
          seriesOne.name = weeklySale[i].previousseries;
          seriesOne.data.push(weeklySale[i].previous);
          seriesTwo.name = weeklySale[i].currentseries;
          seriesTwo.data.push(weeklySale[i].current);
        }

        setCurrSale(seriesTwo);
        setPrevSale(seriesOne);
        setdisplaySalesChartLegend(xAxisData);
        setdisplaySalesChart(weeklySale);
        // setdisplaySalesChartLegend([weeklySale[0].previousseries, ])
        setXAxixTitle('By Week');
        setWeeklySalesCountStatus(true)
        setYearlySalesCountStatus(false)
        break;

      // case 1: 
      // sortedArray = monthlySale.sort((a, b) => a.ordinal - b.ordinal);
      // sortedArray = sortedArray.map((item, index) => ({ ...item, dayname: `Week ${index+1}` }));
      // setMonthlySale(sortedArray); // setting sorted array
      // console.log("After sorting : ", monthlySale);
      // setdisplaySalesChart(monthlySale);
      // const lastMonthIndex = (date.getMonth() - 1 + 12) % 12; // Adding 12 and taking modulo to handle January
      // const lastMonthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(date.getFullYear(), lastMonthIndex));
      // console.log("LAST MONTH NAME : ", lastMonthName);

      // setdisplaySalesChart(monthlySale);
      // setXAxixTitle('By Month');
      // break;

      case 1:
        for (let i = 0; i < yearlySale.length; i++) {
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
        setWeeklySalesCountStatus(false)
        setYearlySalesCountStatus(true)
        break;
      default: console.log('wrong value');
    }
  }

  const changeCategorySalesSelection = (e) => {
    // console.log("change category sales selection : ", e);
    const val = Number(e.target.value);
    // console.log(val);
    // let sortedArray = [];
    // let date = new Date();
    switch (val) {
      case 0:
        setdisplayCategorySalesChart(genreSales);
        setxAxisCategoryTtile('Genre');
        break;
      case 1:
        setdisplayCategorySalesChart(pubSales);
        setxAxisCategoryTtile('Publisher');
        break;
      case 2:
        setdisplayCategorySalesChart(langSales);
        setxAxisCategoryTtile('Language');
        break;
      default: console.log('wrong value');
    }
  }

  const changePublisherTitle = (e) => {
    console.log("change pub title : ", e);
    const val = Number(e.target.value);
    console.log("change pub title count : ", val);
    // setPubTitleCount(val);
    setPubDropDownVal(val)
    setLangDropDownVal(0)
    setGenDropDownVal(0)
    if(val===0){
      setDisplayCount(tempDisplayCount)
    }
    else{
      setDisplayCount(val);
      
    }
    
    
  }

  const changeLanguageTitle = (e) => {
    console.log("change lang title : ", e);
    const val = Number(e.target.value);
    console.log("change lang title count : ", val);
    setLangTitleCount(val);
    setLangDropDownVal(val)
    setPubDropDownVal(0)
    setGenDropDownVal(0)
    if(val===0){
      setDisplayCount(tempDisplayCount)
    }
    else{
      setDisplayCount(val);
      
    }
  }

  const changeCatTitleCount = (e) => {
    console.log("change cat title : ", e);
    const val = Number(e.target.value);
    console.log("change cat title count : ", val);
    // setCatTitleCount(val);
    setGenDropDownVal(val)
    setPubDropDownVal(0)
    setLangDropDownVal(0)
    if(val===0){
      setDisplayCount(tempDisplayCount)
    }
    else{
      setDisplayCount(val);
      
    }
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

  const selectDropdownType= async(type) =>{
    console.log("selectDropdownType : ", type);
    console.log("selectedDropdownTypeList : ", selectedDropdownTypeList);
    setPubDropDownVal(0)
    setSelectedDropdownType(type)
    setToggleDropDownView(true); // drop down will be visible whenever the drop down type is selected

    switch(type){
      case 'Publisher':
        setPublisherCountStatus(true)
        setLanguageCountStatus(false)
        setGenreCountStatus(false)
        break;
      case 'Language':
        setPublisherCountStatus(false)
        setLanguageCountStatus(true)
        setGenreCountStatus(false)
        break;
      case 'Genre':
        setPublisherCountStatus(false)
        setLanguageCountStatus(false)
        setGenreCountStatus(true)
        break;

      }
  }
  const changeTitleCountDisplay = (e) => {
    const title = e.target.value;
    setPubDropDownVal(title);
    console.log("change pub title : ", title);
    const index = selectedDropdownTypeList.findIndex(item => item.data === title);
    const val = selectedDropdownTypeList[index].title;
    console.log("change pub title count : ", val);
    if(val===0){
      setDisplayCount(tempDisplayCount)
    }
    else{
      setDisplayCount(val);
    }
    
    
    // if(selectedDropdownType === 'Publisher'){
    //   setPubTitleCount(val);
    //   setDisplayCount(val);
    // }
    // else if(selectedDropdownType === 'Language'){
    //   setLangTitleCount(val);
    //   setDisplayCount(val);
    // }
    // else if (selectedDropdownType === 'Genre'){
    //   setCatTitleCount(val);
    //   setDisplayCount(val);
    // }
    // else {
     
    // }
  }

  const changeMonthlySalesFilter = (e) => {
    let val = e.target.value;
    setSelectedMonthDropDownValue(val);
    let year=selectedYearDropDownValue
    getMonthlySales(val, year);
    // let year ="2023", month ="01";
    // if(val !== undefined && val !== null){
    //   if(Number(val) <= 12){
    //     month = val;
    //   }
    //   else{
        
    //   }
      
    // }
  }

  const changeYearlySalesFilter=(e)=>{
    let val = e.target.value;
     let month =selectedMonthDropDownValue;
     setSelectedYearDropDownValue(val);
     getMonthlySales(month, val);
    // if(val !== undefined && val !== null){
    //   if(Number(val) <= 12){
    //     month = val;
    //   }
    //   else{
        
    //   }
      
    // }
  }


  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Dashboard" />
        <div className="body px-3">
          <div className="dashboard_numbers_bar">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                {/* <div>
                  <div className="data ">
                    <div className="title mb-2">No. of Publishers</div>
                    <div className="number">{totalPublishers}</div>
                  </div>
                </div> */}
                <div className="d-flex justify-content-between align-items-start">

                  <div className="metricImg">
                    <img src={publisherCountImg} width={37} height={37} />
                  </div>
                  <div className="ms-2 ps-2">
                    <div className="title ">Publishers</div>
                    <div className="number">{totalPublishers}</div>

                  </div>
                </div>
                <div className="border_div"></div>

                <div style={{marginTop:'3%'}}>
                  <div className="d-flex justify-content-start align-items-start" style={{ width: '108%' }}>

                    <div className="metricImg ">
                      <img src={userCountImg} width={37} height={37} />
                    </div>
                    <div className="ms-2 ps-2">
                      <div className="title ">Users Added</div>
                      <div className="number">{usercountYearly}</div>
                      <div className="d-flex justify-content-start align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                          <img src={greendot} height={6} width={6} style={{marginTop:'6%'}}/>
                          <div className="px-1">
                            <span className="display_title">Last Week  </span><span className="user_count">{usercountWeekly}</span>
                          </div>
                        </div>
                        <div className="border_div_sm mx-1"></div>
                        <div className="d-flex justify-content-start align-items-center">
                          <img src={graydot} height={6} width={6} style={{marginTop:'6%'}}/>
                          <div className="px-1">
                            <span className="display_title">Last Month  </span><span className="user_count">{usercountMonthly}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="data " style={{ width: '210px' }}>
                    <div className="title mb-2">Total No. of Users</div>
                    <div className="number">{usercountYearly}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <span className="display_title">Added Last Week</span> : <span className="user_count">{usercountWeekly}</span>
                      </div>
                      <div className="">
                        <span className="display_title">Last Month</span> : <span className="user_count">{usercountMonthly}</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="border_div"></div>
                <div>
                  <div className="d-flex justify-content-around align-items-start">

                    <div className="metricImg">
                      <img src={RepeatCustomerImg} width={37} height={37} />
                    </div>
                    <div className="ms-2 ps-2">
                      <div className="title ">Repeat Customers</div>
                      <div className="number">{returningUserCount}</div>

                    </div>
                  </div>
                  {/* <div className="data ">
                    <div className="title mb-2">Repeat Customers</div>
                    <div className="number">{returningUserCount}</div>
                  </div> */}
                </div>
                <div className="border_div"></div>

                <div className="d-flex justify-content-around align-items-center" style={{ minHeight: '100%' }}>

                  <div className="d-flex justify-content-around align-items-start">
                    <div className="metricImg">
                      <img src={TitleCountImg} width={37} height={37} />
                    </div>
                    <div className="mx-2 px-2">
                      <div className="title ">No. of Titles</div>
                      <div className="number">{displayCount}</div>

                    </div>
                  </div>
                  <div >
                    <div className="d-flex justify-content-start align-items-center mb-2">
                      <div className="d-flex justify-content-start align-items-center">
                        <img src={greendot} height={6} width={6} style={{marginTop:'6%'}}/>
                        <div className="px-1">
                          <span className="display_title">Last Week  </span><span className="user_count">{titleCountWeekly}</span>
                        </div>
                      </div>
                      <div className="border_div_sm mx-1"></div>
                      <div className="d-flex justify-content-start align-items-center">
                        <img src={graydot} height={6} width={6} style={{marginTop:'6%'}}/>
                        <div className="px-1">
                          <span className="display_title">Last Month  </span><span className="user_count">{titleCountMonthly}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <button 
                        className={ publisherCountStatus === true? "btn btn-outline-dark custom_buttons  rounded me-1 activeTitleType" 
                                        : "btn btn-outline-dark custom_buttons rounded me-1"} 
                        onClick={()=> selectDropdownType("Publisher")}>Publisher</button>
                      <button 
                       className={ languageCountStatus === true? "btn btn-outline-dark custom_buttons  rounded me-1 activeTitleType" 
                       : "btn btn-outline-dark custom_buttons rounded me-1"} 
                        onClick={()=> selectDropdownType("Language")}>Language</button>
                      <button 
                        className={ genreCountStatus === true? "btn btn-outline-dark custom_buttons  rounded me-1 activeTitleType" 
                        : "btn btn-outline-dark custom_buttons  rounded me-1"} 
                        onClick={()=> selectDropdownType("Genre")}>Genre</button>
                    </div>

                    <div>
                      {toggleDropDownView &&
                        <select
                          className="form-select"
                          style={{ width: '100%', border: '0.5px solid #9EA1A3', maxWidth: '220px', textOverflow: 'ellipsis' }}
                          onChange={(e) => changeTitleCountDisplay(e)}
                          value={pubDropDownVal}
                        >
                          <option value={0}>All</option>
                          {
                            selectedDropdownTypeList && selectedDropdownTypeList.map((data, index) => {
                              return <option value={data.data} key={index}>{data.data}</option>
                            })
                          }
                        </select>
                      }
                    </div>

                  </div>

                </div>
                {/* <div className="row d-flex justify-content-between align-items-start" style={{ width: '390px' }}>
                  <div className="data col-md-4">
                    <div className="title mb-2">No. of Titles</div>
                    <div className="number">{displayCount}</div>
                  </div>
                  <div className="filters d-flex justify-content-between align-items-baseline col-md-8"
                    style={{ width: '260px', paddingLeft: '0px', paddingRight: '0px', marginTop: '-6px' }}
                  >
                    <div style={{width:'100%'}}>
                      <label style={{fontSize:'12px'}}>Publisher</label>
                      <select 
                         className="form-select sales_custom_select" 
                         style={{width:'90%'}} 
                         onChange={(e) => changePublisherTitle(e)}
                         value={pubDropDownVal}
                         >
                        <option value={0}>All</option>
                    <div style={{ width: '100%' }}>
                      <label style={{ fontSize: '12px' }}>Publisher</label>
                      <select name="pubWise" id="pubWise" className="form-select sales_custom_select" style={{ width: '90%' }} onChange={(e) => changePublisherTitle(e)}>
                        <option disabled selected>All</option>
                        {
                          pubTitle && pubTitle.map((data, index) => {
                            return <option value={data.title} key={index}>{data.publisher}</option>
                          })
                        }
                      </select>
                    </div>
                    <div style={{width:'100%'}}>
                    <label style={{fontSize:'12px'}}>Language</label>
                    <select 
                     className="form-select sales_custom_select" 
                     style={{width:'90%'}} 
                     onChange={(e) => changeLanguageTitle(e)}
                     value={langDropDownVal}
                     >
                    <option value={0}>All</option>
                      {
                        langTitle && langTitle.map((data, index) => {
                          return <option value={data.title} key={index}>{data.language}</option>
                        })
                      }
                    </select>
                    </div>
                    <div style={{width:'100%'}}>
                    <label style={{fontSize:'12px'}}>Genre</label>
                    <select 
                     className="form-select sales_custom_select" 
                     style={{width:'90%'}} 
                     onChange={(e) => changeCatTitleCount(e)}
                     value={genDropDownVal}
                     >
                    <option value={0} >All</option>
                      {
                        categoryTitle && categoryTitle.map((data, index) => {
                          return <option value={data.title} key={index}>{data.category}</option>
                        })
                      }
                    </select>
                    <div style={{ width: '100%' }}>
                      <label style={{ fontSize: '12px' }}>Language</label>
                      <select name="langWise" id="langWise" className="form-select sales_custom_select" style={{ width: '90%' }} onChange={(e) => changeLanguageTitle(e)}>
                        <option disabled selected>All</option>
                        {
                          langTitle && langTitle.map((data, index) => {
                            return <option value={data.title} key={index}>{data.language}</option>
                          })
                        }
                      </select>
                    </div>
                    <div style={{ width: '100%' }}>
                      <label style={{ fontSize: '12px' }}>Genre</label>
                      <select name="catWise" id="catWise" className="form-select sales_custom_select" style={{ width: '90%' }} onChange={(e) => changeCatTitleCount(e)}>
                        <option disabled selected>All</option>
                        {
                          categoryTitle && categoryTitle.map((data, index) => {
                            return <option value={data.title} key={index}>{data.category}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="middle_row_charts my-3">
            <div className="card">
              <div className="card_header d-flex align-items-center justify-content-between">
                <h3>Sales</h3>
                {/* <select name="salesLineChart" id="salesLineChart" className="form-select custom_select" onChange={(e) => changeSalesSelection(e)}>
                  <option value="0" selected>By Week</option>
                  <option value="1">By Year</option>
                </select> */}
                <div className="filter_btns">
                  <button
                    className={weeklySalesCountStatus === true ? "btn btn-outline-primary custom_buttons  rounded me-1 activeTitleTypeWeekly"
                      : "btn btn-outline-primary custom_buttons  rounded me-1"}
                    onClick={() => changeSalesSelection(0)}>Week</button>
                  {/* <Button variant="outline-primary" onClick={()=> changeSalesSelection(0)}>Week</Button> */}
                  {/* <Button variant="outline-danger" onClick={()=> changeSalesSelection(1)}>Year</Button> */}

                  <button
                    className={yearlySalesCountStatus === true ? "btn btn-outline-danger custom_buttons  rounded me-1 activeTitleTypeYearly"
                      : "btn btn-outline-danger custom_buttons  rounded me-1"}
                    onClick={() => changeSalesSelection(1)}>Year</button>
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
                    tooltip: {
                      label: {
                        formatter: function (d) {
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
                      nameGap: 30,
                      axisLabel: {
                        interval: 0,
                        rotate: 45, //If the label names are too long you can manage this by rotating the label.
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
                <h3 className="my-2">{xAxisCategoryTtile} wise Sales</h3>
                <select name="salesChart" id="salesChart" className="form-select custom_select" onChange={(e) => changeCategorySalesSelection(e)}>
                  {/* <option value="0">Please Select</option> */}
                  <option value="0" selected>Genre</option>
                  <option value="1">Publisher</option>
                  <option value="2">Language</option>
                </select>
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
                      left: '7%',
                      right: '4%',
                      bottom: '8%',
                      containLabel: true
                    },
                    xAxis: {
                      type: 'category',
                      data: displayCategorySalesChart.map((data, index) => {
                        return data.xAxis
                      }),
                      axisTick: {
                        alignWithLabel: true
                      },
                      name: xAxisCategoryTtile,
                      nameLocation: 'center',
                      nameGap: 30,
                      axisLabel: {
                        interval: 0,
                        rotate: 45, //If the label names are too long you can manage this by rotating the label.
                        width: 100,
                        overflow: 'truncate',
                      }
                      
                    },
                    yAxis: {
                      type: 'value',
                      name: 'INR',
                      nameLocation: 'middle',
                      nameGap: 45,
                      axisLabel: {
                        formatter: '₹{value}'
                      },

                    },
                    series: [
                      {
                        data: displayCategorySalesChart.map((data, index) => {
                          return {
                            value: data.yAxis,
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
                style={{ width: "100%", height: 350}}
              />
            </div>
          </div>
          <div className="third_row_charts m-3 mx-4">
            <div className="card">
            <div className="card_header d-flex align-items-center justify-content-between">
                <h3>Monthly Sales </h3>
                <div className="filter_select">
                  <select 
                    className="form-select custom_select" 
                    onChange={(e) => changeMonthlySalesFilter(e)}
                    value={selectedMonthDropDownValue}
                    >
                    {
                      Month.map((data, index)=> (
                        <option value={data.id} key={index}>{data.name}</option>
                      ))
                    }
                  </select>
                  <select 
                  className="form-select custom_select" 
                  onChange={(e) => changeYearlySalesFilter(e)}
                  value={selectedYearDropDownValue}
                  >
                    {
                      years.map((data, index)=> (
                        <option value={data} key={index}>{data}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <ReactEcharts
                lazyUpdate
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
                    legend: {
                      //data: [currMonthlySale.name, prevMonthlySale.name]
                    },
                    tooltip: {
                      label: {
                        formatter: function (d) {
                          console.log(d);
                          return d.label;
                        }
                      }
                    },
                    xAxis: {
                      type: 'category',
                      // data: ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7']
                      data: salesVal.map((data, index) => {
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
                      currMonthlySale,
                      //prevMonthlySale,
                    ]
                  }
                }
                // option={
                //   {
                //     // color: ["#0E37E1"],
                //     tooltip: {
                //       trigger: "axis",
                //       axisPointer: {
                //         type: "shadow"
                //       }
                //     },
                //     grid: {
                //       left: '7%',
                //       right: '4%',
                //       bottom: '8%',
                //       containLabel: true
                //     },
                //     legend: {
                //       textStyle: { color: "#858d98" },
                //       data:legendVal

                //   },
                //   dataset: {
                //     dimensions: dimensionsVal,
                //     source:salesVal
                //   },
                //     tooltip: {
                //       label: {
                //         formatter: function (d) {
                //           console.log(d);
                //           return d.label;
                //         }
                //       }
                //     },
                    
                //     yAxis: {
                //       type: "value",
                //       //boundaryGap: [0, .01],
                //       axisLine: {
                //           lineStyle: { color: "#858d98" }
                //       },
                //       splitLine: {
                //           lineStyle: { color: "rgba(133, 141, 152, 0.1)" }
                //       },
                //       axisLabel: {
                //           formatter: '₹ {value}'
                //       }
                //   },
                //   xAxis: {
                //     type: "category",
                //     axisLine: {
                //         lineStyle: { color: "#858d98" }
                //     },
                //     splitLine: {
                //         lineStyle: { color: "rgba(133, 141, 152, 0.1)" }
                //     }
                // },
                // textStyle: {
                //     fontFamily: "Poppins, sans-serif"
                // },
                // color: ['#f7b84b', '#299cdb'],
                //     series: [{type: "line"},{type: "line"}]
                //   }
                // }
                style={{ width: "100%", height: 400, padding: '4px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardScreenNew;
