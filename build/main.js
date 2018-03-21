/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);


let input = document.getElementById('input'),
    number = document.querySelectorAll('.calculator__keys'),
    operator = document.getElementsByClassName('operators'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    lastValue = document.getElementById('lastValue'),
    resultDisplayed = false;

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', (e) => {
        let currentString = input.value;
        let lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            input.value += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            resultDisplayed = false;
            input.value += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.value = "";
            input.value += e.target.innerHTML;
        }
    });
}
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', searchOperators)
}

document.getElementById('input').addEventListener('input', searchOperators);

function searchOperators(e) {
    let lastChar,
    currentString;
    if (e.data === '-' || e.data === '+' || e.data === '*' || e.data === '/') {
        currentString = input.value.slice(0, -1);
        lastChar = currentString[currentString.length - 1];
    } else {
        currentString = input.value;
        lastChar = currentString[currentString.length - 1];
    }
    if (lastChar === '+' ||
        lastChar === '-' ||
        lastChar === '*' ||
        lastChar === '/' ||
        lastChar === '.' ||
        lastChar === '=') {
        let newString = currentString.slice(0, -1) + e.target.innerHTML;
        input.value = newString;
    } else if (currentString.length === 0) {
        alert('Enter a number first');
    } else {
        input.value += e.target.innerHTML;
    }
}

let minus = document.getElementById('minus');
minus.addEventListener('click', () => {
    let dataInput = input.value;
    let numbers = dataInput.split(/[+\-*/]/g);
    let value = Number(numbers[numbers.length - 1]);
    if (value !== 0) {
        let changedValue = value * (-1);
        let operation = '';
        let count = 0;
        for (let i = dataInput.length - 1; i >= 0; i--) {
            if (dataInput[i] !== '+' && dataInput[i] !== '-' && dataInput[i] !== '*' && dataInput[i] !== '/') {
                count--;
                operation = dataInput.slice(0, count);
                if (operation === '') {
                    input.value = operation + changedValue.toString();
                }
            } else {
                operation = dataInput.slice(0, count);
                input.value = operation + changedValue.toString();
                break;
            }
        }
    }
});

result.addEventListener('click', () => {
    let inputString = input.value;
    let numbers = inputString.split(/[+\-*/]/g);
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] === '') {
            numbers[i + 1] = parseFloat(numbers[i + 1]) * -1;
            numbers.splice(i, 1);
        }
    }
    let operators = [];
    for (let i = 0; i < inputString.length - 1; i++) {
        if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i + 1] === '+' || inputString[i + 1] === '-' || inputString[i + 1] === '*' || inputString[i + 1] === '/')) {
            operators.push(inputString[i])
        } else if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i - 1] === '+' || inputString[i - 1] === '-' || inputString[i - 1] === '*' || inputString[i - 1] === '/')) {
            i++
        } else if (inputString[i] === '-' && i === 0) {
            i++;
        }
        else if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i + 1] !== '+' && inputString[i + 1] !== '-' && inputString[i + 1] !== '*' && inputString[i + 1] !== '/')) {
            operators.push(inputString[i])
        }
    }

    let divide = operators.indexOf('/');
    while (divide !== -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf('/');
    }

    let multiply = operators.indexOf('*');
    while (multiply !== -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf('*');
    }

    let add = operators.indexOf('+');
    while (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf('+');
    }

    let subtract = operators.indexOf('-');
    while (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf('-');
    }
    if (isNaN(numbers[0]) === true) {
        input.value = 'Error'
    } else {
        input.value = numbers[0];
    }
    resultDisplayed = true;

    let listAction = localStorage.listAction ? JSON.parse(localStorage.listAction) : [];
    let listAnswer = localStorage.listAnswer ? JSON.parse(localStorage.listAnswer) : [];
    let action = inputString;
    let expression = [action];
    let digitResult = [numbers[0]];
    if (inputString !== '' && typeof digitResult[0] !== 'string') {
        listAction.push(expression);
        listAnswer.push(digitResult);
    }
    localStorage.listAction = JSON.stringify(listAction);
    localStorage.listAnswer = JSON.stringify(listAnswer);
});

clear.addEventListener('click', () => {
    input.value = "";
});

lastValue.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
});

let story = document.getElementById('storyButton');
story.addEventListener('click', () => {
    let dataExpression = JSON.parse(localStorage.getItem('listAction'));
    let dataAnswer = JSON.parse(localStorage.getItem('listAnswer'));
    if (dataExpression) {
        for (let i = 0; i < dataExpression.length; i++) {
            let storyText = document.createElement('p');
            storyText.className = 'storyText';
            let storyDiv = document.getElementsByClassName('storyDiv');
            storyDiv[0].appendChild(storyText);
            storyText.innerText = dataExpression[i] + '=' + dataAnswer[i]
        }
    } else {
        alert('Sorry, but the story is empty')
    }
});

let valid = document.getElementById('input'),
    regexp = /^\-?[-+*/0-9]*$/;

valid.onkeypress = function (e) {
    let check = valid.value + String.fromCharCode(e.charCode);
    if (!regexp.test(check)) {
        return false;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./style.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "/*Block*/\n.tabs {\n  width: 800px;\n  position: relative;\n  min-height: 500px;\n  clear: both;\n  margin: 25px 0;\n}\n.tab {\n  float: left;\n}\n.tab label {\n  background: #eee;\n  padding: 10px;\n  border: 1px solid #ccc;\n  margin-left: -1px;\n  position: relative;\n  left: 1px;\n  border-top-right-radius: 5px;\n  border-bottom: none;\n}\n.tab [type=radio] {\n  display: none;\n}\n.content {\n  height: 340px;\n  width: 280px;\n  position: absolute;\n  top: 28px;\n  left: 0;\n  background: #fff;\n  right: 0;\n  bottom: 0;\n}\n[type=radio]:checked ~ label {\n  background: #fff;\n  border-bottom: 1px solid #fff;\n  z-index: 2;\n}\n[type=radio]:checked ~ label ~ .content {\n  z-index: 1;\n}\n/*Calculators*/\n.currency {\n  width: 280px;\n  height: 340px;\n  border: 1px solid #000;\n  border-top-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  border-top: none;\n  text-align: center;\n  background-color: #fff;\n  box-shadow: 0 0 30px #000;\n}\n.currency__row {\n  margin: 10px 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n.currency__region {\n  display: flex;\n  align-items: baseline;\n}\n.text {\n  width: 60px;\n  margin: 10px 0;\n  text-align: center;\n}\n.transfer {\n  margin: 5px 12px;\n  width: 53px;\n  border: solid 1px #000;\n  border-radius: 5px;\n}\n.field {\n  width: 100px;\n  height: 25px;\n  margin: 10px 5px;\n  border: solid 1px #000;\n  border-radius: 5px;\n  padding: 0 10px;\n}\n.calculator__keys {\n  width: 45px;\n  height: 35px;\n  cursor: pointer;\n  border: 1px solid #000;\n  border-radius: 5px;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #aaa;\n}\n.calculator__clear {\n  width: 45px;\n  height: 35px;\n  cursor: pointer;\n  border: 1px solid #000;\n  border-radius: 5px;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #3079ed;\n}\n.operators {\n  border: solid 1px #000;\n  border-radius: 5px;\n  width: 45px;\n  height: 35px;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.minus {\n  border: solid 1px #000;\n  border-radius: 5px;\n  width: 45px;\n  height: 35px;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.currency__keys {\n  width: 45px;\n  height: 35px;\n  cursor: pointer;\n  border: 1px solid #000;\n  border-radius: 5px;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #aaa;\n  margin: 0 15px;\n}\n.calculator__key--button {\n  width: 110px;\n  height: 35px;\n  cursor: pointer;\n  border: 1px solid #000;\n  border-radius: 5px;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #aaa;\n}\n.currency__key--convert {\n  width: 148px;\n  margin: 0 15px;\n}\n.calculator {\n  padding: 20px;\n  border-radius: 5px;\n  height: 300px;\n  box-shadow: 0 0 30px #000;\n}\n.input {\n  border: 1px solid #000;\n  border-radius: 5px;\n  height: 50px;\n  width: 222px;\n  padding-right: 15px;\n  padding-top: 10px;\n  text-align: right;\n  margin-right: 6px;\n  font-size: 30px;\n  transition: all 0.2s ease-in-out;\n  overflow: hidden;\n}\n.input:hover {\n  border: 1px solid #bbb;\n  box-shadow: inset 0 1px 4px 0 rgba(0,0,0,0.2);\n}\n.operators:hover {\n  background-color: #ffd700;\n}\n.minus:hover {\n  background-color: #ff4500;\n}\n.currency__keys:hover {\n  background-color: #000;\n  font-weight: 700;\n  color: #fff;\n}\n.calculator__keys:hover {\n  background-color: #000;\n  font-weight: 700;\n  color: #fff;\n}\n.calculator__clear:hover {\n  background-color: #00f;\n  color: #fff;\n}\n/*Story block*/\n.storyDiv {\n  text-align: center;\n  width: 250px;\n  height: 350px;\n  max-height: 370px;\n  border: dotted 2px #000;\n  border-radius: 5px;\n  float: right;\n  margin: 5px;\n  overflow: auto;\n}\n.storyBut {\n  border-radius: 28px;\n  color: #fff;\n  font-size: 13px;\n  background: #3498db;\n  padding: 10px 20px 10px 20px;\n  margin: 5px;\n  text-decoration: none;\n  outline: none;\n}\n.storyBut:hover {\n  background: #3cb0fd;\n  text-decoration: none;\n}\n.storyText {\n  border-bottom: dotted 1px #000;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const findingCourse = () => {
    return fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
};

let dataCourse;
findingCourse()
    .then(response => {
        response.json().then((data) => {
            dataCourse = data
        });
    });


let buttons = document.getElementsByClassName('currency__keys');
let fromInput = document.getElementById('fromCurrency');
let toInput = document.getElementById('toCurrency');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        if (event.target.innerHTML !== 'convert' && event.target.innerHTML !== 'D') {
            fromInput.value += event.target.innerHTML
        }
    }, false);
}

document.getElementsByClassName('currency__key--convert')[0].addEventListener('click', () => {
    let select = document.getElementsByTagName('select');
    if (select[2].value === 'Buy') {
        if (select[0].value === 'UAN') {
            toInput.value = fromInput.value / dataCourse[0].buy;
            select[1].value = 'USD'

        } else if (select[0].value === 'USD') {
            toInput.value = fromInput.value * dataCourse[0].buy;
            select[1].value = 'UAN'
        }
    } else if (select[2].value === 'Sale') {
        if (select[0].value === 'UAN') {
            toInput.value = fromInput.value / dataCourse[0].sale;
            select[1].value = 'USD'

        } else if (select[0].value === 'USD') {
            toInput.value = fromInput.value * dataCourse[0].sale;
            select[1].value = 'UAN'
        }
    }
});

let currencyClear = document.getElementsByClassName('currency__clear');
for (let i = 0; i < currencyClear.length; i++) {
    currencyClear[i].addEventListener('click', () => {
        if (currencyClear[i].value === 'C') {
            document.getElementById('fromCurrency').value = '';
        } else if (currencyClear[i].value === 'D') {
                document.getElementById('fromCurrency').value = document.getElementById('fromCurrency').value.slice(0, -1);
        }
    })
}

/***/ })
/******/ ]);