"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberOfDays = (rent_start_date, rent_end_date) => {
    const startDays = new Date(rent_end_date);
    const endDays = new Date(rent_start_date);
    const time_difference = Math.abs(endDays.getTime() - startDays.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const number_of_days = Math.ceil(time_difference / oneDay);
    return number_of_days;
};
exports.default = numberOfDays;
