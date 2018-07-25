/**
 * Module to handle formula with joins 
 * @author ritesh.patel 
 */
import _ from 'lodash';

// joins are strictly for strings 
// assumption: no math operators allowed
const invalidChars = ['*', '+', '-', '/'];

/**
 * @function 
 * parseColumnsAndStrings 
 * validates formula
 * @param {*} arr 
 * @param {*} cols 
 */
function validateFormula (arr, cols) {
    let i = 0,
        len = arr.length;

    for (i = 0; i < len; i++) {
        let word = arr[i].trim();

        if (word.indexOf('"') !== -1) {
            // do nothing
        } else {
            if (word.length === 1 && invalidChars.includes(word)) {
                alert('Invalid concatenation operator in formula');
                return false;
            }

            if (!cols.includes(word)) {
                alert('Invalid column name, please check the table below');
                return false;
            }
        }
    }

    return true;
}

/**
 * @function 
 * checks if formula has string joins 
 * @param {string} formula - formula
 */
export function hasJoins (formula) {
    let arr = [],
        i = 0,
        len;

    if (formula.length) {
        arr = formula.split(' ');
        len = arr.length;
        
        for (i = 0; i < len; i++) {
            let word = arr[i];

            if (word.length === 1) {
                if (word === '&') {
                    return true;
                }
            }
        }

        return false;
    }
}


/**
 * @function
 * processes joins 
 * @param {*} formula - string 
 * @param {Array} columns - columns 
 * @param {Object} data - data
 */
export function processJoins (formula, columns, data) {
    let result = [],
        i = 0, len = 0,
        arr = [],
        validFormula = false;
    
    if (formula) {
        arr = formula.split('&');
        len = arr.length;

        validFormula = validateFormula(arr, columns);

        if (validFormula) {
            for (i = 0; i < len; i++) {
                let word = arr[i].trim();

                if (columns.includes(word)) {
                    let colarr = _.map(data, word);

                    if (result.length === 0) {
                        result = colarr;
                    } else {
                        result = _.map(colarr, (item, idx) => {
                            if (result.length === 1) {
                                return result[0] + ' ' + item;
                            } else {
                                return result[idx] + ' ' + item;
                            }
                        })
                    }
                } else {
                    word = word.replace(/"/g, '');

                    if (result.length === 0) {
                        result.push(word);
                    } else {
                        result = _.map(result, (item) => {
                            return item + ' ' + word;
                        })
                    }
                }
            }
        }
    }

    return result;
}