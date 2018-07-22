import _ from 'lodash';

let validOperands = ['*', '+', '-', '/', '&'];
let result = [];
let arr1 = [], arr2 = [];

function hasWhiteSpace (formula) {
    return /\s/g.test(formula);
}

/**
 * @function 
 * checks if formula has string joins 
 * @param {string} formula - formula
 */
// eslint-disable-next-line
function hasJoins (formula) {
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
 * check first and last characters of a formula, must not be an operand
 * @param {string} formula - formula
 */
function checkFirstAndLastCharacters (formula) {
    let firstChar = formula.charAt(0);
    let lastChar = formula.charAt(formula.length - 1);

    if (validOperands.includes(firstChar) || validOperands.includes(lastChar)) {
        return false;
    }

    return true;
}

/**
 * @function 
 * check for valid operands 
 * @param {string} formula - formula
 */
function checkForValidOperands (formula) {
    let arr = [],
        i = 0, len;
    
    if (formula.length) {
        arr = formula.split(' ');
        len = arr.length;
    }
    
    for (i = 0; i < len; i++) {
        let word = arr[i];

        if (word.length === 1) {
            if (!validOperands.includes(word) && isNaN(word)) {
                return false;
            }
        }
    }

    return true;
}

/**
 * @function 
 * check for valid columns 
 * @param {string} formula - formula 
 * @param {array} columns - columns
 */
function checkColumns (formula, columns) {
    let i = 0, arr = [], len;

    if (formula.length) {
        arr = formula.split(' ');
        len = arr.length;
    }

    for (i = 0; i < len; i++) {
        let word = arr[i];
        if (isNaN(parseInt(word)) && word.length > 1) {
            if (!columns.includes(word)) {
                return false;
            }
        }
    }

    return true;
}

/**
 * @function 
 * multiplication 
 * @param {*} arr1 
 * @param {*} val 
 */
function multiply (left, right) {
    if (Array.isArray(left) && Array.isArray(right)) {
        return left.map(function (num, idx) {
            return num * right[idx];
        })
    } else if (Array.isArray(left) && !Array.isArray(right)) {
        return left.map(function (num) {
            return num * parseInt(right);
        })
    } else if (!Array.isArray(left) && Array.isArray(right)) {
        return right.map(function (num) {
            return num * parseInt(left);
        })
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
        return left * right;
    }
}

/**
 * @function 
 * addition
 * @param {*} arr1 
 * @param {*} val 
 */
function add (left, right) {
    if (Array.isArray(left) && Array.isArray(right)) {
        return left.map(function (num, idx) {
            return num + right[idx];
        })
    } else if (Array.isArray(left) && !Array.isArray(right)) {
        return left.map(function (num) {
            return num + parseInt(right);
        })
    } else if (!Array.isArray(left) && Array.isArray(right)) {
        return right.map(function (num) {
            return num + parseInt(left);
        })
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
        return left + right;
    }
}

/**
 * @function
 * subtraction
 * @param {*} arr1 
 * @param {*} val 
 */
function subtract (left, right) {
    if (Array.isArray(left) && Array.isArray(right)) {
        return left.map(function (num, idx) {
            return num - right[idx];
        })
    } else if (Array.isArray(left) && !Array.isArray(right)) {
        return left.map(function (num) {
            return num - parseInt(right);
        })
    } else if (!Array.isArray(left) && Array.isArray(right)) {
        return right.map(function (num) {
            return num - parseInt(left);
        })
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
        return left - right;
    }
}

/**
 * @function 
 * division
 * @param {*} arr1 
 * @param {*} val 
 */
function divide (left, right) {
    if (Array.isArray(left) && Array.isArray(right)) {
        return left.map(function (num, idx) {
            return num / right[idx];
        })
    } else if (Array.isArray(left) && !Array.isArray(right)) {
        return left.map(function (num) {
            return num / parseInt(right);
        })
    } else if (!Array.isArray(left) && Array.isArray(right)) {
        return right.map(function (num) {
            return num / parseInt(left);
        })
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
        return left / right;
    }
}

/**
 * @function 
 * performs desired operation
 * @param {*} col1 
 * @param {*} operand 
 * @param {*} val 
 */
function performOperation (left, operand, right) {
    if (operand === '*') {
        return multiply(left, right);
    } else if (operand === '+') {
        return add(left, right);
    } else if (operand === '-') {
        return subtract(left, right);
    } else if (operand === '/') {
        return divide(left, right);
    }
}

/**
 * @function 
 * process rest of the expressions
 * @param {*} arr 
 * @param {*} columns 
 * @param {*} data 
 */
function calculateRest (arr, columns, data) {
    let operand = arr[0],
        colOrNum;
    
    if (columns.includes(arr[1])) {
        colOrNum = _.map(data, arr[1]);
    } else {
        colOrNum = arr[1];
    }

    return performOperation(result, operand, colOrNum);
}

/**
 * @function 
 * slice and drops formula until it's done
 * @param {*} arr 
 * @param {*} columns 
 * @param {*} data 
 */
function sliceAndDrop (arr, columns, data) {
    let first = _.slice(arr, 0, 2),
        next = _.drop(arr, 2);
    
    arr2 = next;
    
    result = calculateRest(first, columns, data);
}

/**
 * @function 
 * entry point for processing a formula
 * @param {*} arr 
 * @param {*} data 
 */
function calculateFirstExpression (arr, data) {
    let left = arr[0],
        operand = arr[1],
        right = arr[2];
    
    let val1 = [], val2 = [];

    if (isNaN(left)) {
        if (left.length > 1) {
            val1 = _.map(data, left);
        }
    } else {
        val1 = left;
    }

    if (isNaN(right)) {
        if (right.length > 1) {
            val2 = _.map(data, right);
        }
    } else {
        val2 = right;
    }

    return performOperation(val1, operand, val2);
}

/**
 * @function 
 * check if formula is valid
 * @param {string} formula 
 * @param {array} columns
 */
export function isFormulaValid (formula, columns) {
    return hasWhiteSpace(formula) &&
            checkFirstAndLastCharacters(formula) &&
            checkForValidOperands(formula) &&
            checkColumns(formula, columns);
}

/**
 * @function 
 * calculates results based on the formula
 * @param {*} formula 
 * @param {*} columns 
 * @param {*} data 
 */
export function calculateResults (formula, columns, data) {
    let arr = [];
    
    if (formula.length) {
        arr = formula.split(' ');

        arr1 = arr.splice(0, 3); // L to R principle
        arr2 = arr.splice(0, arr.length); // holds rest of the formula 

        result = calculateFirstExpression(arr1, data);

        if (arr2.length % 2 === 0) {
            while (arr2.length > 0) {
                sliceAndDrop(arr2, columns, data);
            }
        }

        return result;
    }
}   
