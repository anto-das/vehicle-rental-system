const numberOfDays = (rent_start_date:string,rent_end_date:string)=>{
    const startDays:any =new Date(rent_end_date);
    const endDays:any =new Date(rent_start_date)
    const time_difference = Math.abs(endDays.getTime()-startDays.getTime());
    const oneDay = 24*60*60*1000;
    const number_of_days = Math.ceil(time_difference/oneDay);
    return number_of_days;
}

export default numberOfDays;