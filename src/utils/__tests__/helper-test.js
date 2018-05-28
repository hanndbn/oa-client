jest.unmock('../Helper.js');
jest.unmock('moment');

import moment from 'moment';
import * as helper from '../Helper.js';

describe('convertDateToStringServer', ()=>{
    it("Convert date object to string for server 'YYYYMMDD hhmmss'",()=>{
        var inputDateObj = moment('20161219 000000', 'YYYYMMDD hhmmss');
        var outputString = "20161219 000000";
        expect(helper.convertDateToStringServer(inputDateObj)).toBe(outputString);
    })
});

describe('convertDateToStringClient', ()=>{
    it("Convert date object to string for client 'DD/MM/YYYY'",()=>{
        var inputDateObj = moment('20161219 000000', 'YYYYMMDD hhmmss');
        var outputString = "19/12/2016";
        expect(helper.convertDateToStringClient(inputDateObj)).toBe(outputString);
    })
});

describe('convertStringServerToMomentObject', ()=>{
    it("Convert string server ('YYYYMMDD hhmmss') to date object",()=>{
        var inputString = '20161219 000000';
        var outputDateObj = moment('20161219 000000', 'YYYYMMDD hhmmss');
        expect(helper.convertStringServerToMomentObject(inputString).isSame(outputDateObj)).toBe(true);
    })
});

describe('convertStringClientToMomentObject', ()=>{
    it("Convert string client 'DD/MM/YYYY' to date object",()=>{
        var inputString = "19/12/2016";
        var outputDateObj = moment('20161219 000000', 'YYYYMMDD hhmmss');
        expect(helper.convertStringClientToMomentObject(inputString).isSame(outputDateObj)).toBe(true);
    })
});

describe('convertStringServerToDateObjectJS', ()=>{
    it("Convert string server ('YYYYMMDD hhmmss') to date object javascript",()=>{
        var inputString = '20161219 000000';
        var outputDateObj = new Date(2016, 11, 19);
        expect(helper.convertStringServerToDateObjectJS(inputString).getTime()).toBe(outputDateObj.getTime());
    })
});

describe('convertStringServerToDateJson', ()=>{
    it("Convert string server ('YYYYMMDD hhmmss') to date json",()=>{
        var inputString = '20161219 000000';
        var outputJson = {date: "19", month: "12", year: "2016"};
        expect(helper.convertStringServerToDateJson(inputString)).toEqual(outputJson);
    })
});

describe('convertStringClientToDateJson', ()=>{
    it("Convert string client 'DD/MM/YY' to date json",()=>{
        var inputString = '19/12/2016';
        var outputJson = {date: "19", month: "12", year: "2016"};
        expect(helper.convertStringClientToDateJson(inputString)).toEqual(outputJson);
    })
});

describe('getJsonFromDate', ()=>{
    it("Convert string client 'DD/MM/YY' to date json",()=>{
        var inputDateObj = moment('20161219 000000', 'YYYYMMDD hhmmss');
        var outputJson = {date: "19", month: "12", year: "2016"};
        expect(helper.getJsonFromDate(inputDateObj)).toEqual(outputJson);
    })
});

describe('getMonthYearStringFromStringServer', ()=>{
    it("Get month/year string 'Month/YYYY' from string server ('YYYYMMDD hhmmss')",()=>{
        var inputString = '20161219 000000';
        var outputString = "Dec/2016";
        expect(helper.getMonthYearStringFromStringServer(inputString)).toBe(outputString);
    })
});

describe('getDateMonthStringFromStringServer', ()=>{
    it("Get date/month string 'dd/mm' from string server ('YYYYMMDD hhmmss')",()=>{
        var inputString = '20161219 000000';
        var outputString = "19/Dec";
        expect(helper.getDateMonthStringFromStringServer(inputString)).toBe(outputString);
    })
});

describe('convertGenderToCode', ()=>{
    it("Convert gender string to gender code",()=>{
        var testAll = (helper.convertGenderToCode("All") == 0);
        var testMale = (helper.convertGenderToCode("Male") == 1);
        var testFemale = (helper.convertGenderToCode("Female") == 2);
        expect(testAll && testMale && testFemale).toBe(true);
    })
});

describe('convertGenderToString', ()=>{
    it("Convert gender code to gender string",()=>{
        var testAll = (helper.convertGenderToString(0) == "All");
        var testMale = (helper.convertGenderToString(1) == "Male");
        var testFemale = (helper.convertGenderToString(2) == "Female");
        expect(testAll && testMale && testFemale).toBe(true);
    })
});