const Datetime = (value) =>{

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    var tempDate=new Date(value)
    var dd=tempDate.getDate();
    var yy=tempDate.getFullYear();
    let month = months[tempDate.getMonth()];
    var crtTime=month+' '+dd+','+' '+yy;
    var dt=crtTime
    return dt
}

export default Datetime;      