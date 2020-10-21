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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice.js */ \"./src/notice.js\");\n/* harmony import */ var _notice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_notice_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _table_table_highlight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table/table-highlight.js */ \"./src/table/table-highlight.js\");\n/* harmony import */ var _table_table_highlight_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_table_table_highlight_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n(function ($) {\n  /**\n   * Проверка на тач-пад\n   */\n  $(`body`).on(`touchstart`, () => {\n    $(`html`).addClass(`touch-device`);\n  });\n\n  /**\n   * Masked Input for Tel\n   */\n  $(`#edit-submitted-customer-tel`).mask(`(999) 999 99 99`);\n\n  /**\n   *  Активизация main-menu__item\n   */\n  const $navLinks = $(`.main-menu__link`);\n  $navLinks.each(function (indx, element) {\n    if ($(element).hasClass(`active`)) {\n      $(element).removeAttr(`href`);\n      $(element).parent().addClass(`active`);\n    }\n  });\n\n  /**\n   * Плавная прокрутка по якорной ссылке\n   */\n  $(`body`).on(`click`, `.local-menu [href*=\"#\"]`, (e) => {\n    const fixedOffset = 50;\n    $(`html,body`).stop().animate({\n      scrollTop: $(e.target.hash).offset().top - fixedOffset,\n    }, 500);\n    e.preventDefault();\n  });\n\n})(jQuery);\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/notice.js":
/*!***********************!*\
  !*** ./src/notice.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Объявление при открытии сайта\n */\nlet isStorageSupport = true;\nlet storedNoticeDate = ``;\ntry {\n  storedNoticeDate = localStorage.getItem(`bp_notice_date`);\n} catch (err) {\n  isStorageSupport = false;\n}\n\nconst divNotice = document.querySelector(`.notice`);\nconst noticeDate = divNotice.querySelector(`.notice__section`).dataset.date;\n\nconst onDocumentKeydown = (evt) => {\n  evt.preventDefault();\n  if ((evt.key === `Escape`) || (evt.key === `Enter`)) {\n    hidePopUp(divNotice);\n  }\n};\n\nconst showPopUp = (popup) => {\n  popup.hidden = true;\n  document.addEventListener(`keydown`, onDocumentKeydown);\n};\n\nconst hidePopUp = (popup) => {\n  popup.hidden = true;\n  document.removeEventListener(`keydown`, onDocumentKeydown);\n};\n\nif (isStorageSupport) {\n  if (storedNoticeDate === noticeDate) {\n    hidePopUp(divNotice);\n  } else {\n    showPopUp(divNotice);\n    localStorage.setItem(`bp_notice_date`, noticeDate);\n  }\n}\n\ndivNotice.addEventListener(`click`, (evt) => {\n  evt.preventDefault();\n  hidePopUp(divNotice);\n});\n\n\n//# sourceURL=webpack:///./src/notice.js?");

/***/ }),

/***/ "./src/table/table-highlight.js":
/*!**************************************!*\
  !*** ./src/table/table-highlight.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Подсветка столбца таблицы при наведении\n*/\n(($) => {\n  $(`tbody td, thead th:not([colspan])`).hover(function () {\n    const $cell = $(this);\n\n    if ($cell.closest(`table`).hasClass(`table--poor`)) {\n      return;\n    }\n\n    const rowHeadCells = $cell.closest(`table`).children(`tbody`).children().first().children(`th`).size();\n\n    const getShifts = (tag) => {\n      const $rows = $cell.closest(`table`).children(tag).children();\n      const mapOfRowShifts = new Array($rows.size()).fill(0);\n      $rows.each((rowIndx, row) => {\n        $(row).children().each((cellIndx, cell) => {\n          const rowspan = +$(cell).attr(`rowspan`);\n          const colspan = +$(cell).attr(`colspan`);\n          for (let i = rowIndx + 1; i < rowIndx + rowspan; i++) { // для rowspan строк ниже текущей\n            mapOfRowShifts[i]++; // добавляем одно смещение\n            if (colspan > 1) {\n              mapOfRowShifts[i] += colspan - 1; // добавляем (colspan-1) смещение\n            }\n          }\n        });\n      });\n      return mapOfRowShifts;\n    };\n\n    const mapShifts = (shift) => {\n      let index = $cell.index() - shift;\n      if ($cell.closest(`thead`).size() > 0) {\n        index += theadShifts[$cell.parent().index()];\n      } else {\n        index += tbodyShifts[$cell.parent().index()];\n      }\n      return index;\n    };\n\n    const theadShifts = getShifts(`thead`);\n    const tbodyShifts = getShifts(`tbody`);\n\n    const tbodyCellIndexes = tbodyShifts.map(mapShifts);\n    const theadCellIndexes = theadShifts.map(mapShifts);\n\n    tbodyCellIndexes.forEach(function (col, row) {\n      if (col > (rowHeadCells - 1 - tbodyShifts[row])) {\n        $($($cell.closest(`table`).children(`tbody`).children()[row]).children()[col]).toggleClass(`highlighted`);\n      }\n    });\n\n    theadCellIndexes.forEach(function (col, row) {\n      if (col > (rowHeadCells - 1 - theadShifts[row])) {\n        $($($cell.closest(`table`).children(`thead`).children()[row]).children(`th:not([colspan])`)[col]).toggleClass(`highlighted`);\n      }\n    });\n\n  });\n})(jQuery);\n\n\n//# sourceURL=webpack:///./src/table/table-highlight.js?");

/***/ })

/******/ });