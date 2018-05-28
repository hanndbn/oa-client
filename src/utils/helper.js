//TODO: write tests to util functions

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { assignIn as _assignIn } from 'lodash';
import moment from 'moment';
import { CONST_SERVICE_URL_DOWNLOAD_FILE } from '../app/serviceConstants.js';
import {CONSTANTS} from "../app/constant";
import {Messages} from '../app/messages.js';
import request from 'request';

/* ----------------------------------
    Server
 -----------------------------------*/

// Send request to server by AJAX
export function sendRequestToServer(serviceURL, httpMethod, requestParam, successCallback, failCallback, dispatch){
    // let paramString;
    // if (requestParam) {
    //
    //     paramString = JSON.stringify(requestParam);
    // }

    request.post({
        url: serviceURL,
        json: true,
        headers: {'content-type': 'application/json'},
        //rejectUnauthorized: false,
        //strictSSL: false,
        //secureProtocol: 'TLSv1_method',
        body: requestParam
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (successCallback && typeof(successCallback) == 'function') {
                successCallback(body);
                console.log(body);
            } else {
                console.log("successCallback is not define or is not a function");
            }
        }
        else{
            if (failCallback && typeof(failCallback) == 'function') {
                failCallback(error);
            } else {
                console.log("failCallback is not define or is not a function", textStatus);
            }
        }
    });
}

// Download file from server
export function downloadFileFromServer( fileName){
    window.location.assign(CONST_SERVICE_URL_DOWNLOAD_FILE + "?url=" + fileName + "&token=" + localStorage.getItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-token'));
}

/* ----------------------------------
    End server
 -----------------------------------*/

/* ----------------------------------
    Convert
-----------------------------------*/

// Convert date object to string for server 'YYYYMMDD hhmmss'
export function convertDateToStringServer(dateObj) {
    let dateJson = getJsonFromDate(dateObj);
    let dateString = dateJson.year + dateJson.month + dateJson.date + " 000000";
    return dateString;
}

// Convert date object to string for client 'DD/MM/YYYY'
export function convertDateToStringClient(dateObj) {
    let dateJson = getJsonFromDate(dateObj);
    let dateString = dateJson.date + "/" + dateJson.month + "/" + dateJson.year;
    return dateString;
}

// Convert string server ('YYYYMMDD hhmmss') to date object
export function convertStringServerToMomentObject(dateString) {
    return moment(dateString, 'YYYYMMDD hhmmss');
}

// Convert string client 'DD/MM/YYYY' to date object
export function convertStringClientToMomentObject(dateString) {
    return moment(dateString, 'DD/MM/YYYY');
}

// Convert string server ('YYYYMMDD hhmmss') to date object javascript
export function convertStringServerToDateObjectJS(dateString) {
    let dateJson = convertStringServerToDateJson(dateString);
    return new Date(dateJson.year, dateJson.month - 1, dateJson.date);
}

// Convert string server ('YYYYMMDD hhmmss') to date json
export function convertStringServerToDateJson(dateString) {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let date = dateString.substring(6, 8);
    return {
        date: date,
        month: month,
        year: year
    };
}

// Convert string client 'DD/MM/YY' to date json
export function convertStringClientToDateJson(dateString) {
    let date = dateString.substring(0, 2);
    let month = dateString.substring(3, 5);
    let year = dateString.substring(6, 10);
    return {
        date: date,
        month: month,
        year: year
    };
}

// Get date json (date, month, year) from date object
export function getJsonFromDate(dateObj) {
    let year = dateObj.year().toString();
    let month = dateObj.month().toString();
    month = parseInt(month) + 1;
    month = month.toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    let date = dateObj.date().toString();
    if (date.length === 1) {
        date = "0" + date;
    }
    return {
        date: date,
        month: month,
        year: year
    };
}

// Get month/year string 'Month/YYYY' from string server ('YYYYMMDD hhmmss')
export function getMonthYearStringFromStringServer(dateString) {
    let dateObj = convertStringServerToMomentObject(dateString);
    let monthString = dateObj.format("MMM");
    let year = dateObj.year();
    return monthString + "/" + year;
}

// Get date/month string 'dd/mm' from string server ('YYYYMMDD hhmmss')
export function getDateMonthStringFromStringServer(dateString) {
    let dateObj = convertStringServerToMomentObject(dateString);
    let monthString = dateObj.format("MMM");
    let date = dateObj.date();
    return date + "/" + monthString;
}

// Convert gender string to gender code
export function convertGenderToCode(gender) {    
    var genderCode = 0;
    switch(gender) {
        case "All": {
            genderCode = 0;
        }
        break;
        case "Male": {
            genderCode = 1;
        }
        break;
        case "Female": {
            genderCode = 2;
        }
        break;
    }
    return genderCode;
}

// Convert gender code to gender string
export function convertGenderToString(genderCode) {
    let gender = "All";
    switch(genderCode) {
        case 0: {
            gender = "All";
        }
            break;
        case 1: {
            gender = "Male";
        }
            break;
        case 2: {
            gender = "Female";
        }
            break;
    }
    return gender;
}

/* ----------------------------------
 End convert
 -----------------------------------*/

//TODO: implement a better search in the server for production system. 
//TODO: improve on search matching regex
//TODO: highlight the terms being matched
/**
 * Naive search (only for demo!). Returns matching items based in search input. 
 * @param  {Object[]} items  - List of items to be searched from 
 * @param  {String}   input  - Search terms
 * @param  {String}   searchKey - the key in items object to match the search term with
 * @return {Object[]} return the filtered items            
 */
export function naiveSearch(items, input, searchKey) {
  if (input.trim() === '' || searchKey === undefined) {
    return []
  }
  var reg = new RegExp(input.trim().split('').join('\\w*').replace(/\W/, ''), 'i');

  return items.filter(function (item) {
    if (reg.test(item[searchKey])) {
      return item
    }
  })
}

// Get scroll bar width
export function getScrollBarWidth() {
    var outer = document.createElement('div'); 
    outer.style.position = "absolute"; 
    outer.style.width = "50px";
    outer.style.height = "50px";
    outer.style.top = "-50px";
    outer.style.left = "-50px";
    outer.style.overflow = "scroll";

    var inner = document.createElement('div');
    inner.style.width = "100%";
    inner.style.height = "100px"; 
    outer.appendChild (inner); 

    document.body.appendChild (outer); 
    var width = outer.offsetWidth - outer.clientWidth;

    document.body.removeChild (outer); 
    return width;
}

export function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

export function toggleMenuItem(elementIdArray, status) {
    elementIdArray.map((elementId, index)=>{
        if(status) {
            $("#" + elementId).removeClass('menu-item-disable');
        } else {
            $("#" + elementId).unbind('click');
            $("#" + elementId).removeClass('menu-item-disable');
            $("#" + elementId).addClass('menu-item-disable');
            $('#' + elementId).find("a").removeClass('active');
        }
    });
}

export function setMenuItemSelected(elementId, status) {
    $("#sub-item-stage-1").find("a").removeClass('active');
    $("#sub-item-stage-2").find("a").removeClass('active');
    $("#sub-item-stage-3").find("a").removeClass('active');
    if(status) {
        $('#'+elementId).find("a").addClass('active');
    }
}

export function getDOBFromString(dateString) {
	// DD/MM/YYYY
	let array = dateString.split("/");
	if(array.length != 3) {
		return null;
	}
	if(array[0].length != 2 || array[1].length != 2 || array[2].length != 4) {
		return null;
	}
	if(isNaN(array[0]) || isNaN(array[1]) || isNaN(array[2])) {
		return null;
	}
	if(parseInt(array[0]) > 31) {
		return null;
	}
	if(parseInt(array[1]) > 12) {
		return null;
	}
	return array[2].toString() + array[1].toString() + array[0].toString();
}

export function formatDateTimeFromServer(datetimeString) {
	if(!datetimeString || datetimeString.length < 19) {
		return datetimeString;
	}
	let dateString = datetimeString.substring(0, 10);
	let timeString = datetimeString.substring(10, 19);
	let dateObject = moment(dateString, 'YYYY-MM-DD');
	let newDateString = dateObject.format('MM/DD/YYYY');
	return newDateString + timeString;
}

export function restrictSpecialCharacter(event) {
    let regex = new RegExp("^[a-zA-Z0-9 /n/r]+$");
    let charCode = !event.charCode ? event.which : event.charCode;
    let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key) && charCode != 13) {
        event.preventDefault();
        return false;
    }
}

export function restrictSpecialCharacterForIntNumber(event) {
    let regex = new RegExp("^[0-9]+$");
    let charCode = !event.charCode ? event.which : event.charCode;
    let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key) && charCode != 13) {
        event.preventDefault();
        return false;
    }
}

export function restrictSpecialCharacterForFloatNumber(event) {
    let regex = new RegExp("^[0-9.]+$");
    let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}

export function getAccessRightFromModuleRight(moduleRight, moduleId) {
    let accessRight = {};
    if(moduleRight && moduleRight.module && moduleRight.module.length > 0) {
        moduleRight.module.map((module, idx)=>{
            if(module.idFix == moduleId) {
                accessRight = module;
            }
        });
    }
    return accessRight;
}

// Cookie
export function setCookie(cname, cvalue, time) {
	// console.log("time out:", time);
	let d = new Date();
	d.setTime(d.getTime() + (time*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires;
}

export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
export function removeItem( name ) {
	document.cookie = name + '=; expires=0;';
}
