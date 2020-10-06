(function(modules) {
	var installedModules = {};
	function __webpack_require__(moduleId) {
	  if (installedModules[moduleId]) {
		return installedModules[moduleId].exports;
	  }
	  var module = installedModules[moduleId] = {
		i: moduleId,
		l: false,
		exports: {}
	  };
	  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	  module.l = true;
	  return module.exports;
	}
	__webpack_require__.m = modules;
	__webpack_require__.c = installedModules;
	__webpack_require__.d = function(exports, name, getter) {
	  if (!__webpack_require__.o(exports, name)) {
		Object.defineProperty(exports, name, {
		  enumerable: true,
		  get: getter
		});
	  }
	};
	__webpack_require__.r = function(exports) {
	  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, {
		  value: "Module"
		});
	  }
	  Object.defineProperty(exports, "__esModule", {
		value: true
	  });
	};
	__webpack_require__.t = function(value, mode) {
	  if (mode & 1) value = __webpack_require__(value);
	  if (mode & 8) return value;
	  if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
	  var ns = Object.create(null);
	  __webpack_require__.r(ns);
	  Object.defineProperty(ns, "default", {
		enumerable: true,
		value: value
	  });
	  if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key) {
		return value[key];
	  }.bind(null, key));
	  return ns;
	};
	__webpack_require__.n = function(module) {
	  var getter = module && module.__esModule ? function getDefault() {
		return module["default"];
	  } : function getModuleExports() {
		return module;
	  };
	  __webpack_require__.d(getter, "a", getter);
	  return getter;
	};
	__webpack_require__.o = function(object, property) {
	  return Object.prototype.hasOwnProperty.call(object, property);
	};
	__webpack_require__.p = "";
	return __webpack_require__(__webpack_require__.s = 6);
  })([ function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getLocale = exports.register = void 0;
	var EN = "second_minute_hour_day_week_month_year".split("_");
	var ZH = "秒_分钟_小时_天_周_个月_年".split("_");
	var zh_CN = function zh_CN(number, index) {
	  if (index === 0) return [ "刚刚", "片刻后" ];
	  var unit = ZH[parseInt(index / 2)];
	  return [ "".concat(number, " ").concat(unit, "前"), "".concat(number, " ").concat(unit, "后") ];
	};
	var en_US = function en_US(number, index) {
	  if (index === 0) return [ "just now", "right now" ];
	  var unit = EN[parseInt(index / 2)];
	  if (number > 1) unit += "s";
	  return [ "".concat(number, " ").concat(unit, " ago"), "in ".concat(number, " ").concat(unit) ];
	};
	var Locales = {
	  en_US: en_US,
	  zh_CN: zh_CN
	};
	var register = function register(locale, func) {
	  Locales[locale] = func;
	};
	exports.register = register;
	var getLocale = function getLocale(locale) {
	  return Locales[locale] || en_US;
	};
	exports.getLocale = getLocale;
  }, function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nextInterval = exports.diffSec = exports.formatDiff = exports.toDate = exports.toInt = void 0;
	var SEC_ARRAY = [ 60, 60, 24, 7, 365 / 7 / 12, 12 ];
	var toInt = function toInt(f) {
	  return parseInt(f);
	};
	exports.toInt = toInt;
	var toDate = function toDate(input) {
	  if (input instanceof Date) return input;
	  if (!isNaN(input) || /^\d+$/.test(input)) return new Date(toInt(input));
	  input = (input || "").trim().replace(/\.\d+/, "").replace(/-/, "/").replace(/-/, "/").replace(/(\d)T(\d)/, "$1 $2").replace(/Z/, " UTC").replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
	  return new Date(input);
	};
	exports.toDate = toDate;
	var formatDiff = function formatDiff(diff, localeFunc) {
	  var i = 0, agoin = diff < 0 ? 1 : 0, total_sec = diff = Math.abs(diff);
	  for (;diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
		diff /= SEC_ARRAY[i];
	  }
	  diff = toInt(diff);
	  i *= 2;
	  if (diff > (i === 0 ? 9 : 1)) i += 1;
	  return localeFunc(diff, i, total_sec)[agoin].replace("%s", diff);
	};
	exports.formatDiff = formatDiff;
	var diffSec = function diffSec(date, nowDate) {
	  nowDate = nowDate ? toDate(nowDate) : new Date();
	  return (nowDate - toDate(date)) / 1e3;
	};
	exports.diffSec = diffSec;
	var nextInterval = function nextInterval(diff) {
	  var rst = 1, i = 0, d = Math.abs(diff);
	  for (;diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
		diff /= SEC_ARRAY[i];
		rst *= SEC_ARRAY[i];
	  }
	  d = d % rst;
	  d = d ? rst - d : rst;
	  return Math.ceil(d);
	};
	exports.nextInterval = nextInterval;
  }, function(module, exports, __webpack_require__) {
	var __WEBPACK_AMD_DEFINE_RESULT__;
	(function() {
	  function getDefaultOpts(simple) {
		"use strict";
		var defaultOptions = {
		  omitExtraWLInCodeBlocks: {
			defaultValue: false,
			describe: "Omit the default extra whiteline added to code blocks",
			type: "boolean"
		  },
		  noHeaderId: {
			defaultValue: false,
			describe: "Turn on/off generated header id",
			type: "boolean"
		  },
		  prefixHeaderId: {
			defaultValue: false,
			describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
			type: "string"
		  },
		  rawPrefixHeaderId: {
			defaultValue: false,
			describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
			type: "boolean"
		  },
		  ghCompatibleHeaderId: {
			defaultValue: false,
			describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
			type: "boolean"
		  },
		  rawHeaderId: {
			defaultValue: false,
			describe: "Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",
			type: "boolean"
		  },
		  headerLevelStart: {
			defaultValue: false,
			describe: "The header blocks level start",
			type: "integer"
		  },
		  parseImgDimensions: {
			defaultValue: false,
			describe: "Turn on/off image dimension parsing",
			type: "boolean"
		  },
		  simplifiedAutoLink: {
			defaultValue: false,
			describe: "Turn on/off GFM autolink style",
			type: "boolean"
		  },
		  excludeTrailingPunctuationFromURLs: {
			defaultValue: false,
			describe: "Excludes trailing punctuation from links generated with autoLinking",
			type: "boolean"
		  },
		  literalMidWordUnderscores: {
			defaultValue: false,
			describe: "Parse midword underscores as literal underscores",
			type: "boolean"
		  },
		  literalMidWordAsterisks: {
			defaultValue: false,
			describe: "Parse midword asterisks as literal asterisks",
			type: "boolean"
		  },
		  strikethrough: {
			defaultValue: false,
			describe: "Turn on/off strikethrough support",
			type: "boolean"
		  },
		  tables: {
			defaultValue: false,
			describe: "Turn on/off tables support",
			type: "boolean"
		  },
		  tablesHeaderId: {
			defaultValue: false,
			describe: "Add an id to table headers",
			type: "boolean"
		  },
		  ghCodeBlocks: {
			defaultValue: true,
			describe: "Turn on/off GFM fenced code blocks support",
			type: "boolean"
		  },
		  tasklists: {
			defaultValue: false,
			describe: "Turn on/off GFM tasklist support",
			type: "boolean"
		  },
		  smoothLivePreview: {
			defaultValue: false,
			describe: "Prevents weird effects in live previews due to incomplete input",
			type: "boolean"
		  },
		  smartIndentationFix: {
			defaultValue: false,
			description: "Tries to smartly fix indentation in es6 strings",
			type: "boolean"
		  },
		  disableForced4SpacesIndentedSublists: {
			defaultValue: false,
			description: "Disables the requirement of indenting nested sublists by 4 spaces",
			type: "boolean"
		  },
		  simpleLineBreaks: {
			defaultValue: false,
			description: "Parses simple line breaks as <br> (GFM Style)",
			type: "boolean"
		  },
		  requireSpaceBeforeHeadingText: {
			defaultValue: false,
			description: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
			type: "boolean"
		  },
		  ghMentions: {
			defaultValue: false,
			description: "Enables github @mentions",
			type: "boolean"
		  },
		  ghMentionsLink: {
			defaultValue: "https://github.com/{u}",
			description: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
			type: "string"
		  },
		  encodeEmails: {
			defaultValue: true,
			description: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
			type: "boolean"
		  },
		  openLinksInNewWindow: {
			defaultValue: false,
			description: "Open all links in new windows",
			type: "boolean"
		  },
		  backslashEscapesHTMLTags: {
			defaultValue: false,
			description: "Support for HTML Tag escaping. ex: <div>foo</div>",
			type: "boolean"
		  },
		  emoji: {
			defaultValue: false,
			description: "Enable emoji support. Ex: `this is a :smile: emoji`",
			type: "boolean"
		  },
		  underline: {
			defaultValue: false,
			description: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
			type: "boolean"
		  },
		  completeHTMLDocument: {
			defaultValue: false,
			description: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
			type: "boolean"
		  },
		  metadata: {
			defaultValue: false,
			description: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
			type: "boolean"
		  },
		  splitAdjacentBlockquotes: {
			defaultValue: false,
			description: "Split adjacent blockquote blocks",
			type: "boolean"
		  }
		};
		if (simple === false) {
		  return JSON.parse(JSON.stringify(defaultOptions));
		}
		var ret = {};
		for (var opt in defaultOptions) {
		  if (defaultOptions.hasOwnProperty(opt)) {
			ret[opt] = defaultOptions[opt].defaultValue;
		  }
		}
		return ret;
	  }
	  function allOptionsOn() {
		"use strict";
		var options = getDefaultOpts(true), ret = {};
		for (var opt in options) {
		  if (options.hasOwnProperty(opt)) {
			ret[opt] = true;
		  }
		}
		return ret;
	  }
	  var showdown = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
		github: {
		  omitExtraWLInCodeBlocks: true,
		  simplifiedAutoLink: true,
		  excludeTrailingPunctuationFromURLs: true,
		  literalMidWordUnderscores: true,
		  strikethrough: true,
		  tables: true,
		  tablesHeaderId: true,
		  ghCodeBlocks: true,
		  tasklists: true,
		  disableForced4SpacesIndentedSublists: true,
		  simpleLineBreaks: true,
		  requireSpaceBeforeHeadingText: true,
		  ghCompatibleHeaderId: true,
		  ghMentions: true,
		  backslashEscapesHTMLTags: true,
		  emoji: true,
		  splitAdjacentBlockquotes: true
		},
		original: {
		  noHeaderId: true,
		  ghCodeBlocks: false
		},
		ghost: {
		  omitExtraWLInCodeBlocks: true,
		  parseImgDimensions: true,
		  simplifiedAutoLink: true,
		  excludeTrailingPunctuationFromURLs: true,
		  literalMidWordUnderscores: true,
		  strikethrough: true,
		  tables: true,
		  tablesHeaderId: true,
		  ghCodeBlocks: true,
		  tasklists: true,
		  smoothLivePreview: true,
		  simpleLineBreaks: true,
		  requireSpaceBeforeHeadingText: true,
		  ghMentions: false,
		  encodeEmails: true
		},
		vanilla: getDefaultOpts(true),
		allOn: allOptionsOn()
	  };
	  showdown.helper = {};
	  showdown.extensions = {};
	  showdown.setOption = function(key, value) {
		"use strict";
		globalOptions[key] = value;
		return this;
	  };
	  showdown.getOption = function(key) {
		"use strict";
		return globalOptions[key];
	  };
	  showdown.getOptions = function() {
		"use strict";
		return globalOptions;
	  };
	  showdown.resetOptions = function() {
		"use strict";
		globalOptions = getDefaultOpts(true);
	  };
	  showdown.setFlavor = function(name) {
		"use strict";
		if (!flavor.hasOwnProperty(name)) {
		  throw Error(name + " flavor was not found");
		}
		showdown.resetOptions();
		var preset = flavor[name];
		setFlavor = name;
		for (var option in preset) {
		  if (preset.hasOwnProperty(option)) {
			globalOptions[option] = preset[option];
		  }
		}
	  };
	  showdown.getFlavor = function() {
		"use strict";
		return setFlavor;
	  };
	  showdown.getFlavorOptions = function(name) {
		"use strict";
		if (flavor.hasOwnProperty(name)) {
		  return flavor[name];
		}
	  };
	  showdown.getDefaultOptions = function(simple) {
		"use strict";
		return getDefaultOpts(simple);
	  };
	  showdown.subParser = function(name, func) {
		"use strict";
		if (showdown.helper.isString(name)) {
		  if (typeof func !== "undefined") {
			parsers[name] = func;
		  } else {
			if (parsers.hasOwnProperty(name)) {
			  return parsers[name];
			} else {
			  throw Error("SubParser named " + name + " not registered!");
			}
		  }
		}
	  };
	  showdown.extension = function(name, ext) {
		"use strict";
		if (!showdown.helper.isString(name)) {
		  throw Error("Extension 'name' must be a string");
		}
		name = showdown.helper.stdExtName(name);
		if (showdown.helper.isUndefined(ext)) {
		  if (!extensions.hasOwnProperty(name)) {
			throw Error("Extension named " + name + " is not registered!");
		  }
		  return extensions[name];
		} else {
		  if (typeof ext === "function") {
			ext = ext();
		  }
		  if (!showdown.helper.isArray(ext)) {
			ext = [ ext ];
		  }
		  var validExtension = validate(ext, name);
		  if (validExtension.valid) {
			extensions[name] = ext;
		  } else {
			throw Error(validExtension.error);
		  }
		}
	  };
	  showdown.getAllExtensions = function() {
		"use strict";
		return extensions;
	  };
	  showdown.removeExtension = function(name) {
		"use strict";
		delete extensions[name];
	  };
	  showdown.resetExtensions = function() {
		"use strict";
		extensions = {};
	  };
	  function validate(extension, name) {
		"use strict";
		var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
		  valid: true,
		  error: ""
		};
		if (!showdown.helper.isArray(extension)) {
		  extension = [ extension ];
		}
		for (var i = 0; i < extension.length; ++i) {
		  var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
		  if (typeof ext !== "object") {
			ret.valid = false;
			ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
			return ret;
		  }
		  if (!showdown.helper.isString(ext.type)) {
			ret.valid = false;
			ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
			return ret;
		  }
		  var type = ext.type = ext.type.toLowerCase();
		  if (type === "language") {
			type = ext.type = "lang";
		  }
		  if (type === "html") {
			type = ext.type = "output";
		  }
		  if (type !== "lang" && type !== "output" && type !== "listener") {
			ret.valid = false;
			ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
			return ret;
		  }
		  if (type === "listener") {
			if (showdown.helper.isUndefined(ext.listeners)) {
			  ret.valid = false;
			  ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
			  return ret;
			}
		  } else {
			if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
			  ret.valid = false;
			  ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
			  return ret;
			}
		  }
		  if (ext.listeners) {
			if (typeof ext.listeners !== "object") {
			  ret.valid = false;
			  ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
			  return ret;
			}
			for (var ln in ext.listeners) {
			  if (ext.listeners.hasOwnProperty(ln)) {
				if (typeof ext.listeners[ln] !== "function") {
				  ret.valid = false;
				  ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
				  return ret;
				}
			  }
			}
		  }
		  if (ext.filter) {
			if (typeof ext.filter !== "function") {
			  ret.valid = false;
			  ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
			  return ret;
			}
		  } else if (ext.regex) {
			if (showdown.helper.isString(ext.regex)) {
			  ext.regex = new RegExp(ext.regex, "g");
			}
			if (!(ext.regex instanceof RegExp)) {
			  ret.valid = false;
			  ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
			  return ret;
			}
			if (showdown.helper.isUndefined(ext.replace)) {
			  ret.valid = false;
			  ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
			  return ret;
			}
		  }
		}
		return ret;
	  }
	  showdown.validateExtension = function(ext) {
		"use strict";
		var validateExtension = validate(ext, null);
		if (!validateExtension.valid) {
		  console.warn(validateExtension.error);
		  return false;
		}
		return true;
	  };
	  if (!showdown.hasOwnProperty("helper")) {
		showdown.helper = {};
	  }
	  showdown.helper.isString = function(a) {
		"use strict";
		return typeof a === "string" || a instanceof String;
	  };
	  showdown.helper.isFunction = function(a) {
		"use strict";
		var getType = {};
		return a && getType.toString.call(a) === "[object Function]";
	  };
	  showdown.helper.isArray = function(a) {
		"use strict";
		return Array.isArray(a);
	  };
	  showdown.helper.isUndefined = function(value) {
		"use strict";
		return typeof value === "undefined";
	  };
	  showdown.helper.forEach = function(obj, callback) {
		"use strict";
		if (showdown.helper.isUndefined(obj)) {
		  throw new Error("obj param is required");
		}
		if (showdown.helper.isUndefined(callback)) {
		  throw new Error("callback param is required");
		}
		if (!showdown.helper.isFunction(callback)) {
		  throw new Error("callback param must be a function/closure");
		}
		if (typeof obj.forEach === "function") {
		  obj.forEach(callback);
		} else if (showdown.helper.isArray(obj)) {
		  for (var i = 0; i < obj.length; i++) {
			callback(obj[i], i, obj);
		  }
		} else if (typeof obj === "object") {
		  for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
			  callback(obj[prop], prop, obj);
			}
		  }
		} else {
		  throw new Error("obj does not seem to be an array or an iterable object");
		}
	  };
	  showdown.helper.stdExtName = function(s) {
		"use strict";
		return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
	  };
	  function escapeCharactersCallback(wholeMatch, m1) {
		"use strict";
		var charCodeToEscape = m1.charCodeAt(0);
		return "¨E" + charCodeToEscape + "E";
	  }
	  showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
	  showdown.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
		"use strict";
		var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
		if (afterBackslash) {
		  regexString = "\\\\" + regexString;
		}
		var regex = new RegExp(regexString, "g");
		text = text.replace(regex, escapeCharactersCallback);
		return text;
	  };
	  showdown.helper.unescapeHTMLEntities = function(txt) {
		"use strict";
		return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
	  };
	  var rgxFindMatchPos = function(str, left, right, flags) {
		"use strict";
		var f = flags || "", g = f.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f.replace(/g/g, "")), l = new RegExp(left, f.replace(/g/g, "")), pos = [], t, s, m, start, end;
		do {
		  t = 0;
		  while (m = x.exec(str)) {
			if (l.test(m[0])) {
			  if (!t++) {
				s = x.lastIndex;
				start = s - m[0].length;
			  }
			} else if (t) {
			  if (!--t) {
				end = m.index + m[0].length;
				var obj = {
				  left: {
					start: start,
					end: s
				  },
				  match: {
					start: s,
					end: m.index
				  },
				  right: {
					start: m.index,
					end: end
				  },
				  wholeMatch: {
					start: start,
					end: end
				  }
				};
				pos.push(obj);
				if (!g) {
				  return pos;
				}
			  }
			}
		  }
		} while (t && (x.lastIndex = s));
		return pos;
	  };
	  showdown.helper.matchRecursiveRegExp = function(str, left, right, flags) {
		"use strict";
		var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
		for (var i = 0; i < matchPos.length; ++i) {
		  results.push([ str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end) ]);
		}
		return results;
	  };
	  showdown.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
		"use strict";
		if (!showdown.helper.isFunction(replacement)) {
		  var repStr = replacement;
		  replacement = function() {
			return repStr;
		  };
		}
		var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
		if (lng > 0) {
		  var bits = [];
		  if (matchPos[0].wholeMatch.start !== 0) {
			bits.push(str.slice(0, matchPos[0].wholeMatch.start));
		  }
		  for (var i = 0; i < lng; ++i) {
			bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
			if (i < lng - 1) {
			  bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
			}
		  }
		  if (matchPos[lng - 1].wholeMatch.end < str.length) {
			bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
		  }
		  finalStr = bits.join("");
		}
		return finalStr;
	  };
	  showdown.helper.regexIndexOf = function(str, regex, fromIndex) {
		"use strict";
		if (!showdown.helper.isString(str)) {
		  throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
		}
		if (regex instanceof RegExp === false) {
		  throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
		}
		var indexOf = str.substring(fromIndex || 0).search(regex);
		return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
	  };
	  showdown.helper.splitAtIndex = function(str, index) {
		"use strict";
		if (!showdown.helper.isString(str)) {
		  throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
		}
		return [ str.substring(0, index), str.substring(index) ];
	  };
	  showdown.helper.encodeEmailAddress = function(mail) {
		"use strict";
		var encode = [ function(ch) {
		  return "&#" + ch.charCodeAt(0) + ";";
		}, function(ch) {
		  return "&#x" + ch.charCodeAt(0).toString(16) + ";";
		}, function(ch) {
		  return ch;
		} ];
		mail = mail.replace(/./g, function(ch) {
		  if (ch === "@") {
			ch = encode[Math.floor(Math.random() * 2)](ch);
		  } else {
			var r = Math.random();
			ch = r > .9 ? encode[2](ch) : r > .45 ? encode[1](ch) : encode[0](ch);
		  }
		  return ch;
		});
		return mail;
	  };
	  showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
		"use strict";
		targetLength = targetLength >> 0;
		padString = String(padString || " ");
		if (str.length > targetLength) {
		  return String(str);
		} else {
		  targetLength = targetLength - str.length;
		  if (targetLength > padString.length) {
			padString += padString.repeat(targetLength / padString.length);
		  }
		  return String(str) + padString.slice(0, targetLength);
		}
	  };
	  if (typeof console === "undefined") {
		console = {
		  warn: function(msg) {
			"use strict";
			alert(msg);
		  },
		  log: function(msg) {
			"use strict";
			alert(msg);
		  },
		  error: function(msg) {
			"use strict";
			throw msg;
		  }
		};
	  }
	  showdown.helper.regexes = {
		asteriskDashAndColon: /([*_:~])/g
	  };
	  showdown.helper.emojis = {
		"+1": "👍",
		"-1": "👎",
		100: "💯",
		1234: "🔢",
		"1st_place_medal": "🥇",
		"2nd_place_medal": "🥈",
		"3rd_place_medal": "🥉",
		"8ball": "🎱",
		a: "🅰️",
		ab: "🆎",
		abc: "🔤",
		abcd: "🔡",
		accept: "🉑",
		aerial_tramway: "🚡",
		airplane: "✈️",
		alarm_clock: "⏰",
		alembic: "⚗️",
		alien: "👽",
		ambulance: "🚑",
		amphora: "🏺",
		anchor: "⚓️",
		angel: "👼",
		anger: "💢",
		angry: "😠",
		anguished: "😧",
		ant: "🐜",
		apple: "🍎",
		aquarius: "♒️",
		aries: "♈️",
		arrow_backward: "◀️",
		arrow_double_down: "⏬",
		arrow_double_up: "⏫",
		arrow_down: "⬇️",
		arrow_down_small: "🔽",
		arrow_forward: "▶️",
		arrow_heading_down: "⤵️",
		arrow_heading_up: "⤴️",
		arrow_left: "⬅️",
		arrow_lower_left: "↙️",
		arrow_lower_right: "↘️",
		arrow_right: "➡️",
		arrow_right_hook: "↪️",
		arrow_up: "⬆️",
		arrow_up_down: "↕️",
		arrow_up_small: "🔼",
		arrow_upper_left: "↖️",
		arrow_upper_right: "↗️",
		arrows_clockwise: "🔃",
		arrows_counterclockwise: "🔄",
		art: "🎨",
		articulated_lorry: "🚛",
		artificial_satellite: "🛰",
		astonished: "😲",
		athletic_shoe: "👟",
		atm: "🏧",
		atom_symbol: "⚛️",
		avocado: "🥑",
		b: "🅱️",
		baby: "👶",
		baby_bottle: "🍼",
		baby_chick: "🐤",
		baby_symbol: "🚼",
		back: "🔙",
		bacon: "🥓",
		badminton: "🏸",
		baggage_claim: "🛄",
		baguette_bread: "🥖",
		balance_scale: "⚖️",
		balloon: "🎈",
		ballot_box: "🗳",
		ballot_box_with_check: "☑️",
		bamboo: "🎍",
		banana: "🍌",
		bangbang: "‼️",
		bank: "🏦",
		bar_chart: "📊",
		barber: "💈",
		baseball: "⚾️",
		basketball: "🏀",
		basketball_man: "⛹️",
		basketball_woman: "⛹️&zwj;♀️",
		bat: "🦇",
		bath: "🛀",
		bathtub: "🛁",
		battery: "🔋",
		beach_umbrella: "🏖",
		bear: "🐻",
		bed: "🛏",
		bee: "🐝",
		beer: "🍺",
		beers: "🍻",
		beetle: "🐞",
		beginner: "🔰",
		bell: "🔔",
		bellhop_bell: "🛎",
		bento: "🍱",
		biking_man: "🚴",
		bike: "🚲",
		biking_woman: "🚴&zwj;♀️",
		bikini: "👙",
		biohazard: "☣️",
		bird: "🐦",
		birthday: "🎂",
		black_circle: "⚫️",
		black_flag: "🏴",
		black_heart: "🖤",
		black_joker: "🃏",
		black_large_square: "⬛️",
		black_medium_small_square: "◾️",
		black_medium_square: "◼️",
		black_nib: "✒️",
		black_small_square: "▪️",
		black_square_button: "🔲",
		blonde_man: "👱",
		blonde_woman: "👱&zwj;♀️",
		blossom: "🌼",
		blowfish: "🐡",
		blue_book: "📘",
		blue_car: "🚙",
		blue_heart: "💙",
		blush: "😊",
		boar: "🐗",
		boat: "⛵️",
		bomb: "💣",
		book: "📖",
		bookmark: "🔖",
		bookmark_tabs: "📑",
		books: "📚",
		boom: "💥",
		boot: "👢",
		bouquet: "💐",
		bowing_man: "🙇",
		bow_and_arrow: "🏹",
		bowing_woman: "🙇&zwj;♀️",
		bowling: "🎳",
		boxing_glove: "🥊",
		boy: "👦",
		bread: "🍞",
		bride_with_veil: "👰",
		bridge_at_night: "🌉",
		briefcase: "💼",
		broken_heart: "💔",
		bug: "🐛",
		building_construction: "🏗",
		bulb: "💡",
		bullettrain_front: "🚅",
		bullettrain_side: "🚄",
		burrito: "🌯",
		bus: "🚌",
		business_suit_levitating: "🕴",
		busstop: "🚏",
		bust_in_silhouette: "👤",
		busts_in_silhouette: "👥",
		butterfly: "🦋",
		cactus: "🌵",
		cake: "🍰",
		calendar: "📆",
		call_me_hand: "🤙",
		calling: "📲",
		camel: "🐫",
		camera: "📷",
		camera_flash: "📸",
		camping: "🏕",
		cancer: "♋️",
		candle: "🕯",
		candy: "🍬",
		canoe: "🛶",
		capital_abcd: "🔠",
		capricorn: "♑️",
		car: "🚗",
		card_file_box: "🗃",
		card_index: "📇",
		card_index_dividers: "🗂",
		carousel_horse: "🎠",
		carrot: "🥕",
		cat: "🐱",
		cat2: "🐈",
		cd: "💿",
		chains: "⛓",
		champagne: "🍾",
		chart: "💹",
		chart_with_downwards_trend: "📉",
		chart_with_upwards_trend: "📈",
		checkered_flag: "🏁",
		cheese: "🧀",
		cherries: "🍒",
		cherry_blossom: "🌸",
		chestnut: "🌰",
		chicken: "🐔",
		children_crossing: "🚸",
		chipmunk: "🐿",
		chocolate_bar: "🍫",
		christmas_tree: "🎄",
		church: "⛪️",
		cinema: "🎦",
		circus_tent: "🎪",
		city_sunrise: "🌇",
		city_sunset: "🌆",
		cityscape: "🏙",
		cl: "🆑",
		clamp: "🗜",
		clap: "👏",
		clapper: "🎬",
		classical_building: "🏛",
		clinking_glasses: "🥂",
		clipboard: "📋",
		clock1: "🕐",
		clock10: "🕙",
		clock1030: "🕥",
		clock11: "🕚",
		clock1130: "🕦",
		clock12: "🕛",
		clock1230: "🕧",
		clock130: "🕜",
		clock2: "🕑",
		clock230: "🕝",
		clock3: "🕒",
		clock330: "🕞",
		clock4: "🕓",
		clock430: "🕟",
		clock5: "🕔",
		clock530: "🕠",
		clock6: "🕕",
		clock630: "🕡",
		clock7: "🕖",
		clock730: "🕢",
		clock8: "🕗",
		clock830: "🕣",
		clock9: "🕘",
		clock930: "🕤",
		closed_book: "📕",
		closed_lock_with_key: "🔐",
		closed_umbrella: "🌂",
		cloud: "☁️",
		cloud_with_lightning: "🌩",
		cloud_with_lightning_and_rain: "⛈",
		cloud_with_rain: "🌧",
		cloud_with_snow: "🌨",
		clown_face: "🤡",
		clubs: "♣️",
		cocktail: "🍸",
		coffee: "☕️",
		coffin: "⚰️",
		cold_sweat: "😰",
		comet: "☄️",
		computer: "💻",
		computer_mouse: "🖱",
		confetti_ball: "🎊",
		confounded: "😖",
		confused: "😕",
		congratulations: "㊗️",
		construction: "🚧",
		construction_worker_man: "👷",
		construction_worker_woman: "👷&zwj;♀️",
		control_knobs: "🎛",
		convenience_store: "🏪",
		cookie: "🍪",
		cool: "🆒",
		policeman: "👮",
		copyright: "©️",
		corn: "🌽",
		couch_and_lamp: "🛋",
		couple: "👫",
		couple_with_heart_woman_man: "💑",
		couple_with_heart_man_man: "👨&zwj;❤️&zwj;👨",
		couple_with_heart_woman_woman: "👩&zwj;❤️&zwj;👩",
		couplekiss_man_man: "👨&zwj;❤️&zwj;💋&zwj;👨",
		couplekiss_man_woman: "💏",
		couplekiss_woman_woman: "👩&zwj;❤️&zwj;💋&zwj;👩",
		cow: "🐮",
		cow2: "🐄",
		cowboy_hat_face: "🤠",
		crab: "🦀",
		crayon: "🖍",
		credit_card: "💳",
		crescent_moon: "🌙",
		cricket: "🏏",
		crocodile: "🐊",
		croissant: "🥐",
		crossed_fingers: "🤞",
		crossed_flags: "🎌",
		crossed_swords: "⚔️",
		crown: "👑",
		cry: "😢",
		crying_cat_face: "😿",
		crystal_ball: "🔮",
		cucumber: "🥒",
		cupid: "💘",
		curly_loop: "➰",
		currency_exchange: "💱",
		curry: "🍛",
		custard: "🍮",
		customs: "🛃",
		cyclone: "🌀",
		dagger: "🗡",
		dancer: "💃",
		dancing_women: "👯",
		dancing_men: "👯&zwj;♂️",
		dango: "🍡",
		dark_sunglasses: "🕶",
		dart: "🎯",
		dash: "💨",
		date: "📅",
		deciduous_tree: "🌳",
		deer: "🦌",
		department_store: "🏬",
		derelict_house: "🏚",
		desert: "🏜",
		desert_island: "🏝",
		desktop_computer: "🖥",
		male_detective: "🕵️",
		diamond_shape_with_a_dot_inside: "💠",
		diamonds: "♦️",
		disappointed: "😞",
		disappointed_relieved: "😥",
		dizzy: "💫",
		dizzy_face: "😵",
		do_not_litter: "🚯",
		dog: "🐶",
		dog2: "🐕",
		dollar: "💵",
		dolls: "🎎",
		dolphin: "🐬",
		door: "🚪",
		doughnut: "🍩",
		dove: "🕊",
		dragon: "🐉",
		dragon_face: "🐲",
		dress: "👗",
		dromedary_camel: "🐪",
		drooling_face: "🤤",
		droplet: "💧",
		drum: "🥁",
		duck: "🦆",
		dvd: "📀",
		"e-mail": "📧",
		eagle: "🦅",
		ear: "👂",
		ear_of_rice: "🌾",
		earth_africa: "🌍",
		earth_americas: "🌎",
		earth_asia: "🌏",
		egg: "🥚",
		eggplant: "🍆",
		eight_pointed_black_star: "✴️",
		eight_spoked_asterisk: "✳️",
		electric_plug: "🔌",
		elephant: "🐘",
		email: "✉️",
		end: "🔚",
		envelope_with_arrow: "📩",
		euro: "💶",
		european_castle: "🏰",
		european_post_office: "🏤",
		evergreen_tree: "🌲",
		exclamation: "❗️",
		expressionless: "😑",
		eye: "👁",
		eye_speech_bubble: "👁&zwj;🗨",
		eyeglasses: "👓",
		eyes: "👀",
		face_with_head_bandage: "🤕",
		face_with_thermometer: "🤒",
		fist_oncoming: "👊",
		factory: "🏭",
		fallen_leaf: "🍂",
		family_man_woman_boy: "👪",
		family_man_boy: "👨&zwj;👦",
		family_man_boy_boy: "👨&zwj;👦&zwj;👦",
		family_man_girl: "👨&zwj;👧",
		family_man_girl_boy: "👨&zwj;👧&zwj;👦",
		family_man_girl_girl: "👨&zwj;👧&zwj;👧",
		family_man_man_boy: "👨&zwj;👨&zwj;👦",
		family_man_man_boy_boy: "👨&zwj;👨&zwj;👦&zwj;👦",
		family_man_man_girl: "👨&zwj;👨&zwj;👧",
		family_man_man_girl_boy: "👨&zwj;👨&zwj;👧&zwj;👦",
		family_man_man_girl_girl: "👨&zwj;👨&zwj;👧&zwj;👧",
		family_man_woman_boy_boy: "👨&zwj;👩&zwj;👦&zwj;👦",
		family_man_woman_girl: "👨&zwj;👩&zwj;👧",
		family_man_woman_girl_boy: "👨&zwj;👩&zwj;👧&zwj;👦",
		family_man_woman_girl_girl: "👨&zwj;👩&zwj;👧&zwj;👧",
		family_woman_boy: "👩&zwj;👦",
		family_woman_boy_boy: "👩&zwj;👦&zwj;👦",
		family_woman_girl: "👩&zwj;👧",
		family_woman_girl_boy: "👩&zwj;👧&zwj;👦",
		family_woman_girl_girl: "👩&zwj;👧&zwj;👧",
		family_woman_woman_boy: "👩&zwj;👩&zwj;👦",
		family_woman_woman_boy_boy: "👩&zwj;👩&zwj;👦&zwj;👦",
		family_woman_woman_girl: "👩&zwj;👩&zwj;👧",
		family_woman_woman_girl_boy: "👩&zwj;👩&zwj;👧&zwj;👦",
		family_woman_woman_girl_girl: "👩&zwj;👩&zwj;👧&zwj;👧",
		fast_forward: "⏩",
		fax: "📠",
		fearful: "😨",
		feet: "🐾",
		female_detective: "🕵️&zwj;♀️",
		ferris_wheel: "🎡",
		ferry: "⛴",
		field_hockey: "🏑",
		file_cabinet: "🗄",
		file_folder: "📁",
		film_projector: "📽",
		film_strip: "🎞",
		fire: "🔥",
		fire_engine: "🚒",
		fireworks: "🎆",
		first_quarter_moon: "🌓",
		first_quarter_moon_with_face: "🌛",
		fish: "🐟",
		fish_cake: "🍥",
		fishing_pole_and_fish: "🎣",
		fist_raised: "✊",
		fist_left: "🤛",
		fist_right: "🤜",
		flags: "🎏",
		flashlight: "🔦",
		fleur_de_lis: "⚜️",
		flight_arrival: "🛬",
		flight_departure: "🛫",
		floppy_disk: "💾",
		flower_playing_cards: "🎴",
		flushed: "😳",
		fog: "🌫",
		foggy: "🌁",
		football: "🏈",
		footprints: "👣",
		fork_and_knife: "🍴",
		fountain: "⛲️",
		fountain_pen: "🖋",
		four_leaf_clover: "🍀",
		fox_face: "🦊",
		framed_picture: "🖼",
		free: "🆓",
		fried_egg: "🍳",
		fried_shrimp: "🍤",
		fries: "🍟",
		frog: "🐸",
		frowning: "😦",
		frowning_face: "☹️",
		frowning_man: "🙍&zwj;♂️",
		frowning_woman: "🙍",
		middle_finger: "🖕",
		fuelpump: "⛽️",
		full_moon: "🌕",
		full_moon_with_face: "🌝",
		funeral_urn: "⚱️",
		game_die: "🎲",
		gear: "⚙️",
		gem: "💎",
		gemini: "♊️",
		ghost: "👻",
		gift: "🎁",
		gift_heart: "💝",
		girl: "👧",
		globe_with_meridians: "🌐",
		goal_net: "🥅",
		goat: "🐐",
		golf: "⛳️",
		golfing_man: "🏌️",
		golfing_woman: "🏌️&zwj;♀️",
		gorilla: "🦍",
		grapes: "🍇",
		green_apple: "🍏",
		green_book: "📗",
		green_heart: "💚",
		green_salad: "🥗",
		grey_exclamation: "❕",
		grey_question: "❔",
		grimacing: "😬",
		grin: "😁",
		grinning: "😀",
		guardsman: "💂",
		guardswoman: "💂&zwj;♀️",
		guitar: "🎸",
		gun: "🔫",
		haircut_woman: "💇",
		haircut_man: "💇&zwj;♂️",
		hamburger: "🍔",
		hammer: "🔨",
		hammer_and_pick: "⚒",
		hammer_and_wrench: "🛠",
		hamster: "🐹",
		hand: "✋",
		handbag: "👜",
		handshake: "🤝",
		hankey: "💩",
		hatched_chick: "🐥",
		hatching_chick: "🐣",
		headphones: "🎧",
		hear_no_evil: "🙉",
		heart: "❤️",
		heart_decoration: "💟",
		heart_eyes: "😍",
		heart_eyes_cat: "😻",
		heartbeat: "💓",
		heartpulse: "💗",
		hearts: "♥️",
		heavy_check_mark: "✔️",
		heavy_division_sign: "➗",
		heavy_dollar_sign: "💲",
		heavy_heart_exclamation: "❣️",
		heavy_minus_sign: "➖",
		heavy_multiplication_x: "✖️",
		heavy_plus_sign: "➕",
		helicopter: "🚁",
		herb: "🌿",
		hibiscus: "🌺",
		high_brightness: "🔆",
		high_heel: "👠",
		hocho: "🔪",
		hole: "🕳",
		honey_pot: "🍯",
		horse: "🐴",
		horse_racing: "🏇",
		hospital: "🏥",
		hot_pepper: "🌶",
		hotdog: "🌭",
		hotel: "🏨",
		hotsprings: "♨️",
		hourglass: "⌛️",
		hourglass_flowing_sand: "⏳",
		house: "🏠",
		house_with_garden: "🏡",
		houses: "🏘",
		hugs: "🤗",
		hushed: "😯",
		ice_cream: "🍨",
		ice_hockey: "🏒",
		ice_skate: "⛸",
		icecream: "🍦",
		id: "🆔",
		ideograph_advantage: "🉐",
		imp: "👿",
		inbox_tray: "📥",
		incoming_envelope: "📨",
		tipping_hand_woman: "💁",
		information_source: "ℹ️",
		innocent: "😇",
		interrobang: "⁉️",
		iphone: "📱",
		izakaya_lantern: "🏮",
		jack_o_lantern: "🎃",
		japan: "🗾",
		japanese_castle: "🏯",
		japanese_goblin: "👺",
		japanese_ogre: "👹",
		jeans: "👖",
		joy: "😂",
		joy_cat: "😹",
		joystick: "🕹",
		kaaba: "🕋",
		key: "🔑",
		keyboard: "⌨️",
		keycap_ten: "🔟",
		kick_scooter: "🛴",
		kimono: "👘",
		kiss: "💋",
		kissing: "😗",
		kissing_cat: "😽",
		kissing_closed_eyes: "😚",
		kissing_heart: "😘",
		kissing_smiling_eyes: "😙",
		kiwi_fruit: "🥝",
		koala: "🐨",
		koko: "🈁",
		label: "🏷",
		large_blue_circle: "🔵",
		large_blue_diamond: "🔷",
		large_orange_diamond: "🔶",
		last_quarter_moon: "🌗",
		last_quarter_moon_with_face: "🌜",
		latin_cross: "✝️",
		laughing: "😆",
		leaves: "🍃",
		ledger: "📒",
		left_luggage: "🛅",
		left_right_arrow: "↔️",
		leftwards_arrow_with_hook: "↩️",
		lemon: "🍋",
		leo: "♌️",
		leopard: "🐆",
		level_slider: "🎚",
		libra: "♎️",
		light_rail: "🚈",
		link: "🔗",
		lion: "🦁",
		lips: "👄",
		lipstick: "💄",
		lizard: "🦎",
		lock: "🔒",
		lock_with_ink_pen: "🔏",
		lollipop: "🍭",
		loop: "➿",
		loud_sound: "🔊",
		loudspeaker: "📢",
		love_hotel: "🏩",
		love_letter: "💌",
		low_brightness: "🔅",
		lying_face: "🤥",
		m: "Ⓜ️",
		mag: "🔍",
		mag_right: "🔎",
		mahjong: "🀄️",
		mailbox: "📫",
		mailbox_closed: "📪",
		mailbox_with_mail: "📬",
		mailbox_with_no_mail: "📭",
		man: "👨",
		man_artist: "👨&zwj;🎨",
		man_astronaut: "👨&zwj;🚀",
		man_cartwheeling: "🤸&zwj;♂️",
		man_cook: "👨&zwj;🍳",
		man_dancing: "🕺",
		man_facepalming: "🤦&zwj;♂️",
		man_factory_worker: "👨&zwj;🏭",
		man_farmer: "👨&zwj;🌾",
		man_firefighter: "👨&zwj;🚒",
		man_health_worker: "👨&zwj;⚕️",
		man_in_tuxedo: "🤵",
		man_judge: "👨&zwj;⚖️",
		man_juggling: "🤹&zwj;♂️",
		man_mechanic: "👨&zwj;🔧",
		man_office_worker: "👨&zwj;💼",
		man_pilot: "👨&zwj;✈️",
		man_playing_handball: "🤾&zwj;♂️",
		man_playing_water_polo: "🤽&zwj;♂️",
		man_scientist: "👨&zwj;🔬",
		man_shrugging: "🤷&zwj;♂️",
		man_singer: "👨&zwj;🎤",
		man_student: "👨&zwj;🎓",
		man_teacher: "👨&zwj;🏫",
		man_technologist: "👨&zwj;💻",
		man_with_gua_pi_mao: "👲",
		man_with_turban: "👳",
		tangerine: "🍊",
		mans_shoe: "👞",
		mantelpiece_clock: "🕰",
		maple_leaf: "🍁",
		martial_arts_uniform: "🥋",
		mask: "😷",
		massage_woman: "💆",
		massage_man: "💆&zwj;♂️",
		meat_on_bone: "🍖",
		medal_military: "🎖",
		medal_sports: "🏅",
		mega: "📣",
		melon: "🍈",
		memo: "📝",
		men_wrestling: "🤼&zwj;♂️",
		menorah: "🕎",
		mens: "🚹",
		metal: "🤘",
		metro: "🚇",
		microphone: "🎤",
		microscope: "🔬",
		milk_glass: "🥛",
		milky_way: "🌌",
		minibus: "🚐",
		minidisc: "💽",
		mobile_phone_off: "📴",
		money_mouth_face: "🤑",
		money_with_wings: "💸",
		moneybag: "💰",
		monkey: "🐒",
		monkey_face: "🐵",
		monorail: "🚝",
		moon: "🌔",
		mortar_board: "🎓",
		mosque: "🕌",
		motor_boat: "🛥",
		motor_scooter: "🛵",
		motorcycle: "🏍",
		motorway: "🛣",
		mount_fuji: "🗻",
		mountain: "⛰",
		mountain_biking_man: "🚵",
		mountain_biking_woman: "🚵&zwj;♀️",
		mountain_cableway: "🚠",
		mountain_railway: "🚞",
		mountain_snow: "🏔",
		mouse: "🐭",
		mouse2: "🐁",
		movie_camera: "🎥",
		moyai: "🗿",
		mrs_claus: "🤶",
		muscle: "💪",
		mushroom: "🍄",
		musical_keyboard: "🎹",
		musical_note: "🎵",
		musical_score: "🎼",
		mute: "🔇",
		nail_care: "💅",
		name_badge: "📛",
		national_park: "🏞",
		nauseated_face: "🤢",
		necktie: "👔",
		negative_squared_cross_mark: "❎",
		nerd_face: "🤓",
		neutral_face: "😐",
		new: "🆕",
		new_moon: "🌑",
		new_moon_with_face: "🌚",
		newspaper: "📰",
		newspaper_roll: "🗞",
		next_track_button: "⏭",
		ng: "🆖",
		no_good_man: "🙅&zwj;♂️",
		no_good_woman: "🙅",
		night_with_stars: "🌃",
		no_bell: "🔕",
		no_bicycles: "🚳",
		no_entry: "⛔️",
		no_entry_sign: "🚫",
		no_mobile_phones: "📵",
		no_mouth: "😶",
		no_pedestrians: "🚷",
		no_smoking: "🚭",
		"non-potable_water": "🚱",
		nose: "👃",
		notebook: "📓",
		notebook_with_decorative_cover: "📔",
		notes: "🎶",
		nut_and_bolt: "🔩",
		o: "⭕️",
		o2: "🅾️",
		ocean: "🌊",
		octopus: "🐙",
		oden: "🍢",
		office: "🏢",
		oil_drum: "🛢",
		ok: "🆗",
		ok_hand: "👌",
		ok_man: "🙆&zwj;♂️",
		ok_woman: "🙆",
		old_key: "🗝",
		older_man: "👴",
		older_woman: "👵",
		om: "🕉",
		on: "🔛",
		oncoming_automobile: "🚘",
		oncoming_bus: "🚍",
		oncoming_police_car: "🚔",
		oncoming_taxi: "🚖",
		open_file_folder: "📂",
		open_hands: "👐",
		open_mouth: "😮",
		open_umbrella: "☂️",
		ophiuchus: "⛎",
		orange_book: "📙",
		orthodox_cross: "☦️",
		outbox_tray: "📤",
		owl: "🦉",
		ox: "🐂",
		package: "📦",
		page_facing_up: "📄",
		page_with_curl: "📃",
		pager: "📟",
		paintbrush: "🖌",
		palm_tree: "🌴",
		pancakes: "🥞",
		panda_face: "🐼",
		paperclip: "📎",
		paperclips: "🖇",
		parasol_on_ground: "⛱",
		parking: "🅿️",
		part_alternation_mark: "〽️",
		partly_sunny: "⛅️",
		passenger_ship: "🛳",
		passport_control: "🛂",
		pause_button: "⏸",
		peace_symbol: "☮️",
		peach: "🍑",
		peanuts: "🥜",
		pear: "🍐",
		pen: "🖊",
		pencil2: "✏️",
		penguin: "🐧",
		pensive: "😔",
		performing_arts: "🎭",
		persevere: "😣",
		person_fencing: "🤺",
		pouting_woman: "🙎",
		phone: "☎️",
		pick: "⛏",
		pig: "🐷",
		pig2: "🐖",
		pig_nose: "🐽",
		pill: "💊",
		pineapple: "🍍",
		ping_pong: "🏓",
		pisces: "♓️",
		pizza: "🍕",
		place_of_worship: "🛐",
		plate_with_cutlery: "🍽",
		play_or_pause_button: "⏯",
		point_down: "👇",
		point_left: "👈",
		point_right: "👉",
		point_up: "☝️",
		point_up_2: "👆",
		police_car: "🚓",
		policewoman: "👮&zwj;♀️",
		poodle: "🐩",
		popcorn: "🍿",
		post_office: "🏣",
		postal_horn: "📯",
		postbox: "📮",
		potable_water: "🚰",
		potato: "🥔",
		pouch: "👝",
		poultry_leg: "🍗",
		pound: "💷",
		rage: "😡",
		pouting_cat: "😾",
		pouting_man: "🙎&zwj;♂️",
		pray: "🙏",
		prayer_beads: "📿",
		pregnant_woman: "🤰",
		previous_track_button: "⏮",
		prince: "🤴",
		princess: "👸",
		printer: "🖨",
		purple_heart: "💜",
		purse: "👛",
		pushpin: "📌",
		put_litter_in_its_place: "🚮",
		question: "❓",
		rabbit: "🐰",
		rabbit2: "🐇",
		racehorse: "🐎",
		racing_car: "🏎",
		radio: "📻",
		radio_button: "🔘",
		radioactive: "☢️",
		railway_car: "🚃",
		railway_track: "🛤",
		rainbow: "🌈",
		rainbow_flag: "🏳️&zwj;🌈",
		raised_back_of_hand: "🤚",
		raised_hand_with_fingers_splayed: "🖐",
		raised_hands: "🙌",
		raising_hand_woman: "🙋",
		raising_hand_man: "🙋&zwj;♂️",
		ram: "🐏",
		ramen: "🍜",
		rat: "🐀",
		record_button: "⏺",
		recycle: "♻️",
		red_circle: "🔴",
		registered: "®️",
		relaxed: "☺️",
		relieved: "😌",
		reminder_ribbon: "🎗",
		repeat: "🔁",
		repeat_one: "🔂",
		rescue_worker_helmet: "⛑",
		restroom: "🚻",
		revolving_hearts: "💞",
		rewind: "⏪",
		rhinoceros: "🦏",
		ribbon: "🎀",
		rice: "🍚",
		rice_ball: "🍙",
		rice_cracker: "🍘",
		rice_scene: "🎑",
		right_anger_bubble: "🗯",
		ring: "💍",
		robot: "🤖",
		rocket: "🚀",
		rofl: "🤣",
		roll_eyes: "🙄",
		roller_coaster: "🎢",
		rooster: "🐓",
		rose: "🌹",
		rosette: "🏵",
		rotating_light: "🚨",
		round_pushpin: "📍",
		rowing_man: "🚣",
		rowing_woman: "🚣&zwj;♀️",
		rugby_football: "🏉",
		running_man: "🏃",
		running_shirt_with_sash: "🎽",
		running_woman: "🏃&zwj;♀️",
		sa: "🈂️",
		sagittarius: "♐️",
		sake: "🍶",
		sandal: "👡",
		santa: "🎅",
		satellite: "📡",
		saxophone: "🎷",
		school: "🏫",
		school_satchel: "🎒",
		scissors: "✂️",
		scorpion: "🦂",
		scorpius: "♏️",
		scream: "😱",
		scream_cat: "🙀",
		scroll: "📜",
		seat: "💺",
		secret: "㊙️",
		see_no_evil: "🙈",
		seedling: "🌱",
		selfie: "🤳",
		shallow_pan_of_food: "🥘",
		shamrock: "☘️",
		shark: "🦈",
		shaved_ice: "🍧",
		sheep: "🐑",
		shell: "🐚",
		shield: "🛡",
		shinto_shrine: "⛩",
		ship: "🚢",
		shirt: "👕",
		shopping: "🛍",
		shopping_cart: "🛒",
		shower: "🚿",
		shrimp: "🦐",
		signal_strength: "📶",
		six_pointed_star: "🔯",
		ski: "🎿",
		skier: "⛷",
		skull: "💀",
		skull_and_crossbones: "☠️",
		sleeping: "😴",
		sleeping_bed: "🛌",
		sleepy: "😪",
		slightly_frowning_face: "🙁",
		slightly_smiling_face: "🙂",
		slot_machine: "🎰",
		small_airplane: "🛩",
		small_blue_diamond: "🔹",
		small_orange_diamond: "🔸",
		small_red_triangle: "🔺",
		small_red_triangle_down: "🔻",
		smile: "😄",
		smile_cat: "😸",
		smiley: "😃",
		smiley_cat: "😺",
		smiling_imp: "😈",
		smirk: "😏",
		smirk_cat: "😼",
		smoking: "🚬",
		snail: "🐌",
		snake: "🐍",
		sneezing_face: "🤧",
		snowboarder: "🏂",
		snowflake: "❄️",
		snowman: "⛄️",
		snowman_with_snow: "☃️",
		sob: "😭",
		soccer: "⚽️",
		soon: "🔜",
		sos: "🆘",
		sound: "🔉",
		space_invader: "👾",
		spades: "♠️",
		spaghetti: "🍝",
		sparkle: "❇️",
		sparkler: "🎇",
		sparkles: "✨",
		sparkling_heart: "💖",
		speak_no_evil: "🙊",
		speaker: "🔈",
		speaking_head: "🗣",
		speech_balloon: "💬",
		speedboat: "🚤",
		spider: "🕷",
		spider_web: "🕸",
		spiral_calendar: "🗓",
		spiral_notepad: "🗒",
		spoon: "🥄",
		squid: "🦑",
		stadium: "🏟",
		star: "⭐️",
		star2: "🌟",
		star_and_crescent: "☪️",
		star_of_david: "✡️",
		stars: "🌠",
		station: "🚉",
		statue_of_liberty: "🗽",
		steam_locomotive: "🚂",
		stew: "🍲",
		stop_button: "⏹",
		stop_sign: "🛑",
		stopwatch: "⏱",
		straight_ruler: "📏",
		strawberry: "🍓",
		stuck_out_tongue: "😛",
		stuck_out_tongue_closed_eyes: "😝",
		stuck_out_tongue_winking_eye: "😜",
		studio_microphone: "🎙",
		stuffed_flatbread: "🥙",
		sun_behind_large_cloud: "🌥",
		sun_behind_rain_cloud: "🌦",
		sun_behind_small_cloud: "🌤",
		sun_with_face: "🌞",
		sunflower: "🌻",
		sunglasses: "😎",
		sunny: "☀️",
		sunrise: "🌅",
		sunrise_over_mountains: "🌄",
		surfing_man: "🏄",
		surfing_woman: "🏄&zwj;♀️",
		sushi: "🍣",
		suspension_railway: "🚟",
		sweat: "😓",
		sweat_drops: "💦",
		sweat_smile: "😅",
		sweet_potato: "🍠",
		swimming_man: "🏊",
		swimming_woman: "🏊&zwj;♀️",
		symbols: "🔣",
		synagogue: "🕍",
		syringe: "💉",
		taco: "🌮",
		tada: "🎉",
		tanabata_tree: "🎋",
		taurus: "♉️",
		taxi: "🚕",
		tea: "🍵",
		telephone_receiver: "📞",
		telescope: "🔭",
		tennis: "🎾",
		tent: "⛺️",
		thermometer: "🌡",
		thinking: "🤔",
		thought_balloon: "💭",
		ticket: "🎫",
		tickets: "🎟",
		tiger: "🐯",
		tiger2: "🐅",
		timer_clock: "⏲",
		tipping_hand_man: "💁&zwj;♂️",
		tired_face: "😫",
		tm: "™️",
		toilet: "🚽",
		tokyo_tower: "🗼",
		tomato: "🍅",
		tongue: "👅",
		top: "🔝",
		tophat: "🎩",
		tornado: "🌪",
		trackball: "🖲",
		tractor: "🚜",
		traffic_light: "🚥",
		train: "🚋",
		train2: "🚆",
		tram: "🚊",
		triangular_flag_on_post: "🚩",
		triangular_ruler: "📐",
		trident: "🔱",
		triumph: "😤",
		trolleybus: "🚎",
		trophy: "🏆",
		tropical_drink: "🍹",
		tropical_fish: "🐠",
		truck: "🚚",
		trumpet: "🎺",
		tulip: "🌷",
		tumbler_glass: "🥃",
		turkey: "🦃",
		turtle: "🐢",
		tv: "📺",
		twisted_rightwards_arrows: "🔀",
		two_hearts: "💕",
		two_men_holding_hands: "👬",
		two_women_holding_hands: "👭",
		u5272: "🈹",
		u5408: "🈴",
		u55b6: "🈺",
		u6307: "🈯️",
		u6708: "🈷️",
		u6709: "🈶",
		u6e80: "🈵",
		u7121: "🈚️",
		u7533: "🈸",
		u7981: "🈲",
		u7a7a: "🈳",
		umbrella: "☔️",
		unamused: "😒",
		underage: "🔞",
		unicorn: "🦄",
		unlock: "🔓",
		up: "🆙",
		upside_down_face: "🙃",
		v: "✌️",
		vertical_traffic_light: "🚦",
		vhs: "📼",
		vibration_mode: "📳",
		video_camera: "📹",
		video_game: "🎮",
		violin: "🎻",
		virgo: "♍️",
		volcano: "🌋",
		volleyball: "🏐",
		vs: "🆚",
		vulcan_salute: "🖖",
		walking_man: "🚶",
		walking_woman: "🚶&zwj;♀️",
		waning_crescent_moon: "🌘",
		waning_gibbous_moon: "🌖",
		warning: "⚠️",
		wastebasket: "🗑",
		watch: "⌚️",
		water_buffalo: "🐃",
		watermelon: "🍉",
		wave: "👋",
		wavy_dash: "〰️",
		waxing_crescent_moon: "🌒",
		wc: "🚾",
		weary: "😩",
		wedding: "💒",
		weight_lifting_man: "🏋️",
		weight_lifting_woman: "🏋️&zwj;♀️",
		whale: "🐳",
		whale2: "🐋",
		wheel_of_dharma: "☸️",
		wheelchair: "♿️",
		white_check_mark: "✅",
		white_circle: "⚪️",
		white_flag: "🏳️",
		white_flower: "💮",
		white_large_square: "⬜️",
		white_medium_small_square: "◽️",
		white_medium_square: "◻️",
		white_small_square: "▫️",
		white_square_button: "🔳",
		wilted_flower: "🥀",
		wind_chime: "🎐",
		wind_face: "🌬",
		wine_glass: "🍷",
		wink: "😉",
		wolf: "🐺",
		woman: "👩",
		woman_artist: "👩&zwj;🎨",
		woman_astronaut: "👩&zwj;🚀",
		woman_cartwheeling: "🤸&zwj;♀️",
		woman_cook: "👩&zwj;🍳",
		woman_facepalming: "🤦&zwj;♀️",
		woman_factory_worker: "👩&zwj;🏭",
		woman_farmer: "👩&zwj;🌾",
		woman_firefighter: "👩&zwj;🚒",
		woman_health_worker: "👩&zwj;⚕️",
		woman_judge: "👩&zwj;⚖️",
		woman_juggling: "🤹&zwj;♀️",
		woman_mechanic: "👩&zwj;🔧",
		woman_office_worker: "👩&zwj;💼",
		woman_pilot: "👩&zwj;✈️",
		woman_playing_handball: "🤾&zwj;♀️",
		woman_playing_water_polo: "🤽&zwj;♀️",
		woman_scientist: "👩&zwj;🔬",
		woman_shrugging: "🤷&zwj;♀️",
		woman_singer: "👩&zwj;🎤",
		woman_student: "👩&zwj;🎓",
		woman_teacher: "👩&zwj;🏫",
		woman_technologist: "👩&zwj;💻",
		woman_with_turban: "👳&zwj;♀️",
		womans_clothes: "👚",
		womans_hat: "👒",
		women_wrestling: "🤼&zwj;♀️",
		womens: "🚺",
		world_map: "🗺",
		worried: "😟",
		wrench: "🔧",
		writing_hand: "✍️",
		x: "❌",
		yellow_heart: "💛",
		yen: "💴",
		yin_yang: "☯️",
		yum: "😋",
		zap: "⚡️",
		zipper_mouth_face: "🤐",
		zzz: "💤",
		octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
		showdown: "<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>"
	  };
	  showdown.Converter = function(converterOptions) {
		"use strict";
		var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
		  parsed: {},
		  raw: "",
		  format: ""
		};
		_constructor();
		function _constructor() {
		  converterOptions = converterOptions || {};
		  for (var gOpt in globalOptions) {
			if (globalOptions.hasOwnProperty(gOpt)) {
			  options[gOpt] = globalOptions[gOpt];
			}
		  }
		  if (typeof converterOptions === "object") {
			for (var opt in converterOptions) {
			  if (converterOptions.hasOwnProperty(opt)) {
				options[opt] = converterOptions[opt];
			  }
			}
		  } else {
			throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
		  }
		  if (options.extensions) {
			showdown.helper.forEach(options.extensions, _parseExtension);
		  }
		}
		function _parseExtension(ext, name) {
		  name = name || null;
		  if (showdown.helper.isString(ext)) {
			ext = showdown.helper.stdExtName(ext);
			name = ext;
			if (showdown.extensions[ext]) {
			  console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method." + "Please inform the developer that the extension should be updated!");
			  legacyExtensionLoading(showdown.extensions[ext], ext);
			  return;
			} else if (!showdown.helper.isUndefined(extensions[ext])) {
			  ext = extensions[ext];
			} else {
			  throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
			}
		  }
		  if (typeof ext === "function") {
			ext = ext();
		  }
		  if (!showdown.helper.isArray(ext)) {
			ext = [ ext ];
		  }
		  var validExt = validate(ext, name);
		  if (!validExt.valid) {
			throw Error(validExt.error);
		  }
		  for (var i = 0; i < ext.length; ++i) {
			switch (ext[i].type) {
			 case "lang":
			  langExtensions.push(ext[i]);
			  break;
  
			 case "output":
			  outputModifiers.push(ext[i]);
			  break;
			}
			if (ext[i].hasOwnProperty("listeners")) {
			  for (var ln in ext[i].listeners) {
				if (ext[i].listeners.hasOwnProperty(ln)) {
				  listen(ln, ext[i].listeners[ln]);
				}
			  }
			}
		  }
		}
		function legacyExtensionLoading(ext, name) {
		  if (typeof ext === "function") {
			ext = ext(new showdown.Converter());
		  }
		  if (!showdown.helper.isArray(ext)) {
			ext = [ ext ];
		  }
		  var valid = validate(ext, name);
		  if (!valid.valid) {
			throw Error(valid.error);
		  }
		  for (var i = 0; i < ext.length; ++i) {
			switch (ext[i].type) {
			 case "lang":
			  langExtensions.push(ext[i]);
			  break;
  
			 case "output":
			  outputModifiers.push(ext[i]);
			  break;
  
			 default:
			  throw Error("Extension loader error: Type unrecognized!!!");
			}
		  }
		}
		function listen(name, callback) {
		  if (!showdown.helper.isString(name)) {
			throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
		  }
		  if (typeof callback !== "function") {
			throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
		  }
		  if (!listeners.hasOwnProperty(name)) {
			listeners[name] = [];
		  }
		  listeners[name].push(callback);
		}
		function rTrimInputText(text) {
		  var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
		  return text.replace(rgx, "");
		}
		this._dispatch = function dispatch(evtName, text, options, globals) {
		  if (listeners.hasOwnProperty(evtName)) {
			for (var ei = 0; ei < listeners[evtName].length; ++ei) {
			  var nText = listeners[evtName][ei](evtName, text, this, options, globals);
			  if (nText && typeof nText !== "undefined") {
				text = nText;
			  }
			}
		  }
		  return text;
		};
		this.listen = function(name, callback) {
		  listen(name, callback);
		  return this;
		};
		this.makeHtml = function(text) {
		  if (!text) {
			return text;
		  }
		  var globals = {
			gHtmlBlocks: [],
			gHtmlMdBlocks: [],
			gHtmlSpans: [],
			gUrls: {},
			gTitles: {},
			gDimensions: {},
			gListLevel: 0,
			hashLinkCounts: {},
			langExtensions: langExtensions,
			outputModifiers: outputModifiers,
			converter: this,
			ghCodeBlocks: [],
			metadata: {
			  parsed: {},
			  raw: "",
			  format: ""
			}
		  };
		  text = text.replace(/¨/g, "¨T");
		  text = text.replace(/\$/g, "¨D");
		  text = text.replace(/\r\n/g, "\n");
		  text = text.replace(/\r/g, "\n");
		  text = text.replace(/\u00A0/g, "&nbsp;");
		  if (options.smartIndentationFix) {
			text = rTrimInputText(text);
		  }
		  text = "\n\n" + text + "\n\n";
		  text = showdown.subParser("detab")(text, options, globals);
		  text = text.replace(/^[ \t]+$/gm, "");
		  showdown.helper.forEach(langExtensions, function(ext) {
			text = showdown.subParser("runExtension")(ext, text, options, globals);
		  });
		  text = showdown.subParser("metadata")(text, options, globals);
		  text = showdown.subParser("hashPreCodeTags")(text, options, globals);
		  text = showdown.subParser("githubCodeBlocks")(text, options, globals);
		  text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
		  text = showdown.subParser("hashCodeTags")(text, options, globals);
		  text = showdown.subParser("stripLinkDefinitions")(text, options, globals);
		  text = showdown.subParser("blockGamut")(text, options, globals);
		  text = showdown.subParser("unhashHTMLSpans")(text, options, globals);
		  text = showdown.subParser("unescapeSpecialChars")(text, options, globals);
		  text = text.replace(/¨D/g, "$$");
		  text = text.replace(/¨T/g, "¨");
		  text = showdown.subParser("completeHTMLDocument")(text, options, globals);
		  showdown.helper.forEach(outputModifiers, function(ext) {
			text = showdown.subParser("runExtension")(ext, text, options, globals);
		  });
		  metadata = globals.metadata;
		  return text;
		};
		this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
		  src = src.replace(/\r\n/g, "\n");
		  src = src.replace(/\r/g, "\n");
		  src = src.replace(/>[ \t]+</, ">¨NBSP;<");
		  if (!HTMLParser) {
			if (window && window.document) {
			  HTMLParser = window.document;
			} else {
			  throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
			}
		  }
		  var doc = HTMLParser.createElement("div");
		  doc.innerHTML = src;
		  var globals = {
			preList: substitutePreCodeTags(doc)
		  };
		  clean(doc);
		  var nodes = doc.childNodes, mdDoc = "";
		  for (var i = 0; i < nodes.length; i++) {
			mdDoc += showdown.subParser("makeMarkdown.node")(nodes[i], globals);
		  }
		  function clean(node) {
			for (var n = 0; n < node.childNodes.length; ++n) {
			  var child = node.childNodes[n];
			  if (child.nodeType === 3) {
				if (!/\S/.test(child.nodeValue)) {
				  node.removeChild(child);
				  --n;
				} else {
				  child.nodeValue = child.nodeValue.split("\n").join(" ");
				  child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
				}
			  } else if (child.nodeType === 1) {
				clean(child);
			  }
			}
		  }
		  function substitutePreCodeTags(doc) {
			var pres = doc.querySelectorAll("pre"), presPH = [];
			for (var i = 0; i < pres.length; ++i) {
			  if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === "code") {
				var content = pres[i].firstChild.innerHTML.trim(), language = pres[i].firstChild.getAttribute("data-language") || "";
				if (language === "") {
				  var classes = pres[i].firstChild.className.split(" ");
				  for (var c = 0; c < classes.length; ++c) {
					var matches = classes[c].match(/^language-(.+)$/);
					if (matches !== null) {
					  language = matches[1];
					  break;
					}
				  }
				}
				content = showdown.helper.unescapeHTMLEntities(content);
				presPH.push(content);
				pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
			  } else {
				presPH.push(pres[i].innerHTML);
				pres[i].innerHTML = "";
				pres[i].setAttribute("prenum", i.toString());
			  }
			}
			return presPH;
		  }
		  return mdDoc;
		};
		this.setOption = function(key, value) {
		  options[key] = value;
		};
		this.getOption = function(key) {
		  return options[key];
		};
		this.getOptions = function() {
		  return options;
		};
		this.addExtension = function(extension, name) {
		  name = name || null;
		  _parseExtension(extension, name);
		};
		this.useExtension = function(extensionName) {
		  _parseExtension(extensionName);
		};
		this.setFlavor = function(name) {
		  if (!flavor.hasOwnProperty(name)) {
			throw Error(name + " flavor was not found");
		  }
		  var preset = flavor[name];
		  setConvFlavor = name;
		  for (var option in preset) {
			if (preset.hasOwnProperty(option)) {
			  options[option] = preset[option];
			}
		  }
		};
		this.getFlavor = function() {
		  return setConvFlavor;
		};
		this.removeExtension = function(extension) {
		  if (!showdown.helper.isArray(extension)) {
			extension = [ extension ];
		  }
		  for (var a = 0; a < extension.length; ++a) {
			var ext = extension[a];
			for (var i = 0; i < langExtensions.length; ++i) {
			  if (langExtensions[i] === ext) {
				langExtensions[i].splice(i, 1);
			  }
			}
			for (var ii = 0; ii < outputModifiers.length; ++i) {
			  if (outputModifiers[ii] === ext) {
				outputModifiers[ii].splice(i, 1);
			  }
			}
		  }
		};
		this.getAllExtensions = function() {
		  return {
			language: langExtensions,
			output: outputModifiers
		  };
		};
		this.getMetadata = function(raw) {
		  if (raw) {
			return metadata.raw;
		  } else {
			return metadata.parsed;
		  }
		};
		this.getMetadataFormat = function() {
		  return metadata.format;
		};
		this._setMetadataPair = function(key, value) {
		  metadata.parsed[key] = value;
		};
		this._setMetadataFormat = function(format) {
		  metadata.format = format;
		};
		this._setMetadataRaw = function(raw) {
		  metadata.raw = raw;
		};
	  };
	  showdown.subParser("anchors", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("anchors.before", text, options, globals);
		var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
		  if (showdown.helper.isUndefined(title)) {
			title = "";
		  }
		  linkId = linkId.toLowerCase();
		  if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
			url = "";
		  } else if (!url) {
			if (!linkId) {
			  linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
			}
			url = "#" + linkId;
			if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
			  url = globals.gUrls[linkId];
			  if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
				title = globals.gTitles[linkId];
			  }
			} else {
			  return wholeMatch;
			}
		  }
		  url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
		  var result = '<a href="' + url + '"';
		  if (title !== "" && title !== null) {
			title = title.replace(/"/g, "&quot;");
			title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
			result += ' title="' + title + '"';
		  }
		  if (options.openLinksInNewWindow && !/^#/.test(url)) {
			result += ' target="¨E95Eblank"';
		  }
		  result += ">" + linkText + "</a>";
		  return result;
		};
		text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
		text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
		text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
		text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
		if (options.ghMentions) {
		  text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gim, function(wm, st, escape, mentions, username) {
			if (escape === "\\") {
			  return st + mentions;
			}
			if (!showdown.helper.isString(options.ghMentionsLink)) {
			  throw new Error("ghMentionsLink option must be a string");
			}
			var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
			if (options.openLinksInNewWindow) {
			  target = ' target="¨E95Eblank"';
			}
			return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
		  });
		}
		text = globals.converter._dispatch("anchors.after", text, options, globals);
		return text;
	  });
	  var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-\/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
		"use strict";
		return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
		  link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
		  var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
		  if (/^www\./i.test(link)) {
			link = link.replace(/^www\./i, "http://www.");
		  }
		  if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
			append = trailingPunctuation;
		  }
		  if (options.openLinksInNewWindow) {
			target = ' target="¨E95Eblank"';
		  }
		  return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
		};
	  }, replaceMail = function(options, globals) {
		"use strict";
		return function(wholeMatch, b, mail) {
		  var href = "mailto:";
		  b = b || "";
		  mail = showdown.subParser("unescapeSpecialChars")(mail, options, globals);
		  if (options.encodeEmails) {
			href = showdown.helper.encodeEmailAddress(href + mail);
			mail = showdown.helper.encodeEmailAddress(mail);
		  } else {
			href = href + mail;
		  }
		  return b + '<a href="' + href + '">' + mail + "</a>";
		};
	  };
	  showdown.subParser("autoLinks", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("autoLinks.before", text, options, globals);
		text = text.replace(delimUrlRegex, replaceLink(options));
		text = text.replace(delimMailRegex, replaceMail(options, globals));
		text = globals.converter._dispatch("autoLinks.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("simplifiedAutoLinks", function(text, options, globals) {
		"use strict";
		if (!options.simplifiedAutoLink) {
		  return text;
		}
		text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
		if (options.excludeTrailingPunctuationFromURLs) {
		  text = text.replace(simpleURLRegex2, replaceLink(options));
		} else {
		  text = text.replace(simpleURLRegex, replaceLink(options));
		}
		text = text.replace(simpleMailRegex, replaceMail(options, globals));
		text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("blockGamut", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("blockGamut.before", text, options, globals);
		text = showdown.subParser("blockQuotes")(text, options, globals);
		text = showdown.subParser("headers")(text, options, globals);
		text = showdown.subParser("horizontalRule")(text, options, globals);
		text = showdown.subParser("lists")(text, options, globals);
		text = showdown.subParser("codeBlocks")(text, options, globals);
		text = showdown.subParser("tables")(text, options, globals);
		text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
		text = showdown.subParser("paragraphs")(text, options, globals);
		text = globals.converter._dispatch("blockGamut.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("blockQuotes", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
		text = text + "\n\n";
		var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
		if (options.splitAdjacentBlockquotes) {
		  rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
		}
		text = text.replace(rgx, function(bq) {
		  bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
		  bq = bq.replace(/¨0/g, "");
		  bq = bq.replace(/^[ \t]+$/gm, "");
		  bq = showdown.subParser("githubCodeBlocks")(bq, options, globals);
		  bq = showdown.subParser("blockGamut")(bq, options, globals);
		  bq = bq.replace(/(^|\n)/g, "$1  ");
		  bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
			var pre = m1;
			pre = pre.replace(/^  /gm, "¨0");
			pre = pre.replace(/¨0/g, "");
			return pre;
		  });
		  return showdown.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
		});
		text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("codeBlocks", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
		text += "¨0";
		var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
		text = text.replace(pattern, function(wholeMatch, m1, m2) {
		  var codeblock = m1, nextChar = m2, end = "\n";
		  codeblock = showdown.subParser("outdent")(codeblock, options, globals);
		  codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
		  codeblock = showdown.subParser("detab")(codeblock, options, globals);
		  codeblock = codeblock.replace(/^\n+/g, "");
		  codeblock = codeblock.replace(/\n+$/g, "");
		  if (options.omitExtraWLInCodeBlocks) {
			end = "";
		  }
		  codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
		  return showdown.subParser("hashBlock")(codeblock, options, globals) + nextChar;
		});
		text = text.replace(/¨0/, "");
		text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("codeSpans", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("codeSpans.before", text, options, globals);
		if (typeof text === "undefined") {
		  text = "";
		}
		text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
		  var c = m3;
		  c = c.replace(/^([ \t]*)/g, "");
		  c = c.replace(/[ \t]*$/g, "");
		  c = showdown.subParser("encodeCode")(c, options, globals);
		  c = m1 + "<code>" + c + "</code>";
		  c = showdown.subParser("hashHTMLSpans")(c, options, globals);
		  return c;
		});
		text = globals.converter._dispatch("codeSpans.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("completeHTMLDocument", function(text, options, globals) {
		"use strict";
		if (!options.completeHTMLDocument) {
		  return text;
		}
		text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
		var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
		if (typeof globals.metadata.parsed.doctype !== "undefined") {
		  doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
		  doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
		  if (doctype === "html" || doctype === "html5") {
			charset = '<meta charset="utf-8">';
		  }
		}
		for (var meta in globals.metadata.parsed) {
		  if (globals.metadata.parsed.hasOwnProperty(meta)) {
			switch (meta.toLowerCase()) {
			 case "doctype":
			  break;
  
			 case "title":
			  title = "<title>" + globals.metadata.parsed.title + "</title>\n";
			  break;
  
			 case "charset":
			  if (doctype === "html" || doctype === "html5") {
				charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
			  } else {
				charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
			  }
			  break;
  
			 case "language":
			 case "lang":
			  lang = ' lang="' + globals.metadata.parsed[meta] + '"';
			  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
			  break;
  
			 default:
			  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
			}
		  }
		}
		text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
		text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("detab", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("detab.before", text, options, globals);
		text = text.replace(/\t(?=\t)/g, "    ");
		text = text.replace(/\t/g, "¨A¨B");
		text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
		  var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
		  for (var i = 0; i < numSpaces; i++) {
			leadingText += " ";
		  }
		  return leadingText;
		});
		text = text.replace(/¨A/g, "    ");
		text = text.replace(/¨B/g, "");
		text = globals.converter._dispatch("detab.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("ellipsis", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("ellipsis.before", text, options, globals);
		text = text.replace(/\.\.\./g, "…");
		text = globals.converter._dispatch("ellipsis.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("emoji", function(text, options, globals) {
		"use strict";
		if (!options.emoji) {
		  return text;
		}
		text = globals.converter._dispatch("emoji.before", text, options, globals);
		var emojiRgx = /:([\S]+?):/g;
		text = text.replace(emojiRgx, function(wm, emojiCode) {
		  if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
			return showdown.helper.emojis[emojiCode];
		  }
		  return wm;
		});
		text = globals.converter._dispatch("emoji.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("encodeAmpsAndAngles", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
		text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
		text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
		text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("encodeBackslashEscapes", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
		text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
		text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);
		text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("encodeCode", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("encodeCode.before", text, options, globals);
		text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);
		text = globals.converter._dispatch("encodeCode.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
		var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
		text = text.replace(tags, function(wholeMatch) {
		  return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
		});
		text = text.replace(comments, function(wholeMatch) {
		  return wholeMatch.replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
		});
		text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("githubCodeBlocks", function(text, options, globals) {
		"use strict";
		if (!options.ghCodeBlocks) {
		  return text;
		}
		text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
		text += "¨0";
		text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
		  var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
		  codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
		  codeblock = showdown.subParser("detab")(codeblock, options, globals);
		  codeblock = codeblock.replace(/^\n+/g, "");
		  codeblock = codeblock.replace(/\n+$/g, "");
		  codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
		  codeblock = showdown.subParser("hashBlock")(codeblock, options, globals);
		  return "\n\n¨G" + (globals.ghCodeBlocks.push({
			text: wholeMatch,
			codeblock: codeblock
		  }) - 1) + "G\n\n";
		});
		text = text.replace(/¨0/, "");
		return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
	  });
	  showdown.subParser("hashBlock", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("hashBlock.before", text, options, globals);
		text = text.replace(/(^\n+|\n+$)/g, "");
		text = "\n\n¨K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
		text = globals.converter._dispatch("hashBlock.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("hashCodeTags", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
		var repFunc = function(wholeMatch, match, left, right) {
		  var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
		  return "¨C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
		};
		text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
		text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("hashElement", function(text, options, globals) {
		"use strict";
		return function(wholeMatch, m1) {
		  var blockText = m1;
		  blockText = blockText.replace(/\n\n/g, "\n");
		  blockText = blockText.replace(/^\n/, "");
		  blockText = blockText.replace(/\n+$/g, "");
		  blockText = "\n\n¨K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
		  return blockText;
		};
	  });
	  showdown.subParser("hashHTMLBlocks", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
		var blockTags = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], repFunc = function(wholeMatch, match, left, right) {
		  var txt = wholeMatch;
		  if (left.search(/\bmarkdown\b/) !== -1) {
			txt = left + globals.converter.makeHtml(match) + right;
		  }
		  return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
		};
		if (options.backslashEscapesHTMLTags) {
		  text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
			return "&lt;" + inside + "&gt;";
		  });
		}
		for (var i = 0; i < blockTags.length; ++i) {
		  var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
		  while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {
			var subTexts = showdown.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
			if (newSubText1 === subTexts[1]) {
			  break;
			}
			text = subTexts[0].concat(newSubText1);
		  }
		}
		text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser("hashElement")(text, options, globals));
		text = showdown.helper.replaceRecursiveRegExp(text, function(txt) {
		  return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
		}, "^ {0,3}\x3c!--", "--\x3e", "gm");
		text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser("hashElement")(text, options, globals));
		text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("hashHTMLSpans", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
		function hashHTMLSpan(html) {
		  return "¨C" + (globals.gHtmlSpans.push(html) - 1) + "C";
		}
		text = text.replace(/<[^>]+?\/>/gi, function(wm) {
		  return hashHTMLSpan(wm);
		});
		text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
		  return hashHTMLSpan(wm);
		});
		text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
		  return hashHTMLSpan(wm);
		});
		text = text.replace(/<[^>]+?>/gi, function(wm) {
		  return hashHTMLSpan(wm);
		});
		text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("unhashHTMLSpans", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
		for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
		  var repText = globals.gHtmlSpans[i], limit = 0;
		  while (/¨C(\d+)C/.test(repText)) {
			var num = RegExp.$1;
			repText = repText.replace("¨C" + num + "C", globals.gHtmlSpans[num]);
			if (limit === 10) {
			  console.error("maximum nesting of 10 spans reached!!!");
			  break;
			}
			++limit;
		  }
		  text = text.replace("¨C" + i + "C", repText);
		}
		text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("hashPreCodeTags", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
		var repFunc = function(wholeMatch, match, left, right) {
		  var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
		  return "\n\n¨G" + (globals.ghCodeBlocks.push({
			text: wholeMatch,
			codeblock: codeblock
		  }) - 1) + "G\n\n";
		};
		text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
		text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("headers", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("headers.before", text, options, globals);
		var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
		text = text.replace(setextRegexH1, function(wholeMatch, m1) {
		  var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
		  return showdown.subParser("hashBlock")(hashBlock, options, globals);
		});
		text = text.replace(setextRegexH2, function(matchFound, m1) {
		  var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
		  return showdown.subParser("hashBlock")(hashBlock, options, globals);
		});
		var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
		text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
		  var hText = m2;
		  if (options.customizedHeaderId) {
			hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
		  }
		  var span = showdown.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
		  return showdown.subParser("hashBlock")(header, options, globals);
		});
		function headerId(m) {
		  var title, prefix;
		  if (options.customizedHeaderId) {
			var match = m.match(/\{([^{]+?)}\s*$/);
			if (match && match[1]) {
			  m = match[1];
			}
		  }
		  title = m;
		  if (showdown.helper.isString(options.prefixHeaderId)) {
			prefix = options.prefixHeaderId;
		  } else if (options.prefixHeaderId === true) {
			prefix = "section-";
		  } else {
			prefix = "";
		  }
		  if (!options.rawPrefixHeaderId) {
			title = prefix + title;
		  }
		  if (options.ghCompatibleHeaderId) {
			title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
		  } else if (options.rawHeaderId) {
			title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
		  } else {
			title = title.replace(/[^\w]/g, "").toLowerCase();
		  }
		  if (options.rawPrefixHeaderId) {
			title = prefix + title;
		  }
		  if (globals.hashLinkCounts[title]) {
			title = title + "-" + globals.hashLinkCounts[title]++;
		  } else {
			globals.hashLinkCounts[title] = 1;
		  }
		  return title;
		}
		text = globals.converter._dispatch("headers.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("horizontalRule", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
		var key = showdown.subParser("hashBlock")("<hr />", options, globals);
		text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
		text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
		text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
		text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("images", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("images.before", text, options, globals);
		var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+\/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
		function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
		  url = url.replace(/\s/g, "");
		  return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
		}
		function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
		  var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
		  linkId = linkId.toLowerCase();
		  if (!title) {
			title = "";
		  }
		  if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
			url = "";
		  } else if (url === "" || url === null) {
			if (linkId === "" || linkId === null) {
			  linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
			}
			url = "#" + linkId;
			if (!showdown.helper.isUndefined(gUrls[linkId])) {
			  url = gUrls[linkId];
			  if (!showdown.helper.isUndefined(gTitles[linkId])) {
				title = gTitles[linkId];
			  }
			  if (!showdown.helper.isUndefined(gDims[linkId])) {
				width = gDims[linkId].width;
				height = gDims[linkId].height;
			  }
			} else {
			  return wholeMatch;
			}
		  }
		  altText = altText.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
		  url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
		  var result = '<img src="' + url + '" alt="' + altText + '"';
		  if (title && showdown.helper.isString(title)) {
			title = title.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
			result += ' title="' + title + '"';
		  }
		  if (width && height) {
			width = width === "*" ? "auto" : width;
			height = height === "*" ? "auto" : height;
			result += ' width="' + width + '"';
			result += ' height="' + height + '"';
		  }
		  result += " />";
		  return result;
		}
		text = text.replace(referenceRegExp, writeImageTag);
		text = text.replace(base64RegExp, writeImageTagBase64);
		text = text.replace(crazyRegExp, writeImageTag);
		text = text.replace(inlineRegExp, writeImageTag);
		text = text.replace(refShortcutRegExp, writeImageTag);
		text = globals.converter._dispatch("images.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("italicsAndBold", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
		function parseInside(txt, left, right) {
		  return left + txt + right;
		}
		if (options.literalMidWordUnderscores) {
		  text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
			return parseInside(txt, "<strong><em>", "</em></strong>");
		  });
		  text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
			return parseInside(txt, "<strong>", "</strong>");
		  });
		  text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
			return parseInside(txt, "<em>", "</em>");
		  });
		} else {
		  text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
		  });
		  text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
		  });
		  text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
		  });
		}
		if (options.literalMidWordAsterisks) {
		  text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
			return parseInside(txt, lead + "<strong><em>", "</em></strong>");
		  });
		  text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
			return parseInside(txt, lead + "<strong>", "</strong>");
		  });
		  text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
			return parseInside(txt, lead + "<em>", "</em>");
		  });
		} else {
		  text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
		  });
		  text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
		  });
		  text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
		  });
		}
		text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("lists", function(text, options, globals) {
		"use strict";
		function processListItems(listStr, trimTrailing) {
		  globals.gListLevel++;
		  listStr = listStr.replace(/\n{2,}$/, "\n");
		  listStr += "¨0";
		  var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
		  if (options.disableForced4SpacesIndentedSublists) {
			rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
		  }
		  listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
			checked = checked && checked.trim() !== "";
			var item = showdown.subParser("outdent")(m4, options, globals), bulletStyle = "";
			if (taskbtn && options.tasklists) {
			  bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
			  item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
				var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
				if (checked) {
				  otp += " checked";
				}
				otp += ">";
				return otp;
			  });
			}
			item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
			  return "¨A" + wm2;
			});
			if (m1 || item.search(/\n{2,}/) > -1) {
			  item = showdown.subParser("githubCodeBlocks")(item, options, globals);
			  item = showdown.subParser("blockGamut")(item, options, globals);
			} else {
			  item = showdown.subParser("lists")(item, options, globals);
			  item = item.replace(/\n$/, "");
			  item = showdown.subParser("hashHTMLBlocks")(item, options, globals);
			  item = item.replace(/\n\n+/g, "\n\n");
			  if (isParagraphed) {
				item = showdown.subParser("paragraphs")(item, options, globals);
			  } else {
				item = showdown.subParser("spanGamut")(item, options, globals);
			  }
			}
			item = item.replace("¨A", "");
			item = "<li" + bulletStyle + ">" + item + "</li>\n";
			return item;
		  });
		  listStr = listStr.replace(/¨0/g, "");
		  globals.gListLevel--;
		  if (trimTrailing) {
			listStr = listStr.replace(/\s+$/, "");
		  }
		  return listStr;
		}
		function styleStartNumber(list, listType) {
		  if (listType === "ol") {
			var res = list.match(/^ *(\d+)\./);
			if (res && res[1] !== "1") {
			  return ' start="' + res[1] + '"';
			}
		  }
		  return "";
		}
		function parseConsecutiveLists(list, listType, trimTrailing) {
		  var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
		  if (list.search(counterRxg) !== -1) {
			(function parseCL(txt) {
			  var pos = txt.search(counterRxg), style = styleStartNumber(list, listType);
			  if (pos !== -1) {
				result += "\n\n<" + listType + style + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
				listType = listType === "ul" ? "ol" : "ul";
				counterRxg = listType === "ul" ? olRgx : ulRgx;
				parseCL(txt.slice(pos));
			  } else {
				result += "\n\n<" + listType + style + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
			  }
			})(list);
		  } else {
			var style = styleStartNumber(list, listType);
			result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
		  }
		  return result;
		}
		text = globals.converter._dispatch("lists.before", text, options, globals);
		text += "¨0";
		if (globals.gListLevel) {
		  text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, list, m2) {
			var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
			return parseConsecutiveLists(list, listType, true);
		  });
		} else {
		  text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, m1, list, m3) {
			var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
			return parseConsecutiveLists(list, listType, false);
		  });
		}
		text = text.replace(/¨0/, "");
		text = globals.converter._dispatch("lists.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("metadata", function(text, options, globals) {
		"use strict";
		if (!options.metadata) {
		  return text;
		}
		text = globals.converter._dispatch("metadata.before", text, options, globals);
		function parseMetadataContents(content) {
		  globals.metadata.raw = content;
		  content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
		  content = content.replace(/\n {4}/g, " ");
		  content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
			globals.metadata.parsed[key] = value;
			return "";
		  });
		}
		text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
		  parseMetadataContents(content);
		  return "¨M";
		});
		text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
		  if (format) {
			globals.metadata.format = format;
		  }
		  parseMetadataContents(content);
		  return "¨M";
		});
		text = text.replace(/¨M/g, "");
		text = globals.converter._dispatch("metadata.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("outdent", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("outdent.before", text, options, globals);
		text = text.replace(/^(\t|[ ]{1,4})/gm, "¨0");
		text = text.replace(/¨0/g, "");
		text = globals.converter._dispatch("outdent.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("paragraphs", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("paragraphs.before", text, options, globals);
		text = text.replace(/^\n+/g, "");
		text = text.replace(/\n+$/g, "");
		var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
		for (var i = 0; i < end; i++) {
		  var str = grafs[i];
		  if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
			grafsOut.push(str);
		  } else if (str.search(/\S/) >= 0) {
			str = showdown.subParser("spanGamut")(str, options, globals);
			str = str.replace(/^([ \t]*)/g, "<p>");
			str += "</p>";
			grafsOut.push(str);
		  }
		}
		end = grafsOut.length;
		for (i = 0; i < end; i++) {
		  var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
		  while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
			var delim = RegExp.$1, num = RegExp.$2;
			if (delim === "K") {
			  blockText = globals.gHtmlBlocks[num];
			} else {
			  if (codeFlag) {
				blockText = showdown.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
			  } else {
				blockText = globals.ghCodeBlocks[num].codeblock;
			  }
			}
			blockText = blockText.replace(/\$/g, "$$$$");
			grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
			if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
			  codeFlag = true;
			}
		  }
		  grafsOut[i] = grafsOutIt;
		}
		text = grafsOut.join("\n");
		text = text.replace(/^\n+/g, "");
		text = text.replace(/\n+$/g, "");
		return globals.converter._dispatch("paragraphs.after", text, options, globals);
	  });
	  showdown.subParser("runExtension", function(ext, text, options, globals) {
		"use strict";
		if (ext.filter) {
		  text = ext.filter(text, globals.converter, options);
		} else if (ext.regex) {
		  var re = ext.regex;
		  if (!(re instanceof RegExp)) {
			re = new RegExp(re, "g");
		  }
		  text = text.replace(re, ext.replace);
		}
		return text;
	  });
	  showdown.subParser("spanGamut", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("spanGamut.before", text, options, globals);
		text = showdown.subParser("codeSpans")(text, options, globals);
		text = showdown.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
		text = showdown.subParser("encodeBackslashEscapes")(text, options, globals);
		text = showdown.subParser("images")(text, options, globals);
		text = showdown.subParser("anchors")(text, options, globals);
		text = showdown.subParser("autoLinks")(text, options, globals);
		text = showdown.subParser("simplifiedAutoLinks")(text, options, globals);
		text = showdown.subParser("emoji")(text, options, globals);
		text = showdown.subParser("underline")(text, options, globals);
		text = showdown.subParser("italicsAndBold")(text, options, globals);
		text = showdown.subParser("strikethrough")(text, options, globals);
		text = showdown.subParser("ellipsis")(text, options, globals);
		text = showdown.subParser("hashHTMLSpans")(text, options, globals);
		text = showdown.subParser("encodeAmpsAndAngles")(text, options, globals);
		if (options.simpleLineBreaks) {
		  if (!/\n\n¨K/.test(text)) {
			text = text.replace(/\n+/g, "<br />\n");
		  }
		} else {
		  text = text.replace(/  +\n/g, "<br />\n");
		}
		text = globals.converter._dispatch("spanGamut.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("strikethrough", function(text, options, globals) {
		"use strict";
		function parseInside(txt) {
		  if (options.simplifiedAutoLink) {
			txt = showdown.subParser("simplifiedAutoLinks")(txt, options, globals);
		  }
		  return "<del>" + txt + "</del>";
		}
		if (options.strikethrough) {
		  text = globals.converter._dispatch("strikethrough.before", text, options, globals);
		  text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
			return parseInside(txt);
		  });
		  text = globals.converter._dispatch("strikethrough.after", text, options, globals);
		}
		return text;
	  });
	  showdown.subParser("stripLinkDefinitions", function(text, options, globals) {
		"use strict";
		var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+\/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
		text += "¨0";
		var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
		  linkId = linkId.toLowerCase();
		  if (url.match(/^data:.+?\/.+?;base64,/)) {
			globals.gUrls[linkId] = url.replace(/\s/g, "");
		  } else {
			globals.gUrls[linkId] = showdown.subParser("encodeAmpsAndAngles")(url, options, globals);
		  }
		  if (blankLines) {
			return blankLines + title;
		  } else {
			if (title) {
			  globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
			}
			if (options.parseImgDimensions && width && height) {
			  globals.gDimensions[linkId] = {
				width: width,
				height: height
			  };
			}
		  }
		  return "";
		};
		text = text.replace(base64Regex, replaceFunc);
		text = text.replace(regex, replaceFunc);
		text = text.replace(/¨0/, "");
		return text;
	  });
	  showdown.subParser("tables", function(text, options, globals) {
		"use strict";
		if (!options.tables) {
		  return text;
		}
		var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
		function parseStyles(sLine) {
		  if (/^:[ \t]*--*$/.test(sLine)) {
			return ' style="text-align:left;"';
		  } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
			return ' style="text-align:right;"';
		  } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
			return ' style="text-align:center;"';
		  } else {
			return "";
		  }
		}
		function parseHeaders(header, style) {
		  var id = "";
		  header = header.trim();
		  if (options.tablesHeaderId || options.tableHeaderId) {
			id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
		  }
		  header = showdown.subParser("spanGamut")(header, options, globals);
		  return "<th" + id + style + ">" + header + "</th>\n";
		}
		function parseCells(cell, style) {
		  var subText = showdown.subParser("spanGamut")(cell, options, globals);
		  return "<td" + style + ">" + subText + "</td>\n";
		}
		function buildTable(headers, cells) {
		  var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
		  for (var i = 0; i < tblLgn; ++i) {
			tb += headers[i];
		  }
		  tb += "</tr>\n</thead>\n<tbody>\n";
		  for (i = 0; i < cells.length; ++i) {
			tb += "<tr>\n";
			for (var ii = 0; ii < tblLgn; ++ii) {
			  tb += cells[i][ii];
			}
			tb += "</tr>\n";
		  }
		  tb += "</tbody>\n</table>\n";
		  return tb;
		}
		function parseTable(rawTable) {
		  var i, tableLines = rawTable.split("\n");
		  for (i = 0; i < tableLines.length; ++i) {
			if (/^ {0,3}\|/.test(tableLines[i])) {
			  tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
			}
			if (/\|[ \t]*$/.test(tableLines[i])) {
			  tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
			}
			tableLines[i] = showdown.subParser("codeSpans")(tableLines[i], options, globals);
		  }
		  var rawHeaders = tableLines[0].split("|").map(function(s) {
			return s.trim();
		  }), rawStyles = tableLines[1].split("|").map(function(s) {
			return s.trim();
		  }), rawCells = [], headers = [], styles = [], cells = [];
		  tableLines.shift();
		  tableLines.shift();
		  for (i = 0; i < tableLines.length; ++i) {
			if (tableLines[i].trim() === "") {
			  continue;
			}
			rawCells.push(tableLines[i].split("|").map(function(s) {
			  return s.trim();
			}));
		  }
		  if (rawHeaders.length < rawStyles.length) {
			return rawTable;
		  }
		  for (i = 0; i < rawStyles.length; ++i) {
			styles.push(parseStyles(rawStyles[i]));
		  }
		  for (i = 0; i < rawHeaders.length; ++i) {
			if (showdown.helper.isUndefined(styles[i])) {
			  styles[i] = "";
			}
			headers.push(parseHeaders(rawHeaders[i], styles[i]));
		  }
		  for (i = 0; i < rawCells.length; ++i) {
			var row = [];
			for (var ii = 0; ii < headers.length; ++ii) {
			  if (showdown.helper.isUndefined(rawCells[i][ii])) {}
			  row.push(parseCells(rawCells[i][ii], styles[ii]));
			}
			cells.push(row);
		  }
		  return buildTable(headers, cells);
		}
		text = globals.converter._dispatch("tables.before", text, options, globals);
		text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);
		text = text.replace(tableRgx, parseTable);
		text = text.replace(singeColTblRgx, parseTable);
		text = globals.converter._dispatch("tables.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("underline", function(text, options, globals) {
		"use strict";
		if (!options.underline) {
		  return text;
		}
		text = globals.converter._dispatch("underline.before", text, options, globals);
		if (options.literalMidWordUnderscores) {
		  text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
			return "<u>" + txt + "</u>";
		  });
		  text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
			return "<u>" + txt + "</u>";
		  });
		} else {
		  text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
			return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
		  });
		  text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
			return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
		  });
		}
		text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);
		text = globals.converter._dispatch("underline.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("unescapeSpecialChars", function(text, options, globals) {
		"use strict";
		text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
		text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
		  var charCodeToReplace = parseInt(m1);
		  return String.fromCharCode(charCodeToReplace);
		});
		text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
		return text;
	  });
	  showdown.subParser("makeMarkdown.blockquote", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes()) {
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			var innerTxt = showdown.subParser("makeMarkdown.node")(children[i], globals);
			if (innerTxt === "") {
			  continue;
			}
			txt += innerTxt;
		  }
		}
		txt = txt.trim();
		txt = "> " + txt.split("\n").join("\n> ");
		return txt;
	  });
	  showdown.subParser("makeMarkdown.codeBlock", function(node, globals) {
		"use strict";
		var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
		return "```" + lang + "\n" + globals.preList[num] + "\n```";
	  });
	  showdown.subParser("makeMarkdown.codeSpan", function(node) {
		"use strict";
		return "`" + node.innerHTML + "`";
	  });
	  showdown.subParser("makeMarkdown.emphasis", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes()) {
		  txt += "*";
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		  txt += "*";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
		"use strict";
		var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
		if (node.hasChildNodes()) {
		  txt = headerMark + " ";
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.hr", function() {
		"use strict";
		return "---";
	  });
	  showdown.subParser("makeMarkdown.image", function(node) {
		"use strict";
		var txt = "";
		if (node.hasAttribute("src")) {
		  txt += "![" + node.getAttribute("alt") + "](";
		  txt += "<" + node.getAttribute("src") + ">";
		  if (node.hasAttribute("width") && node.hasAttribute("height")) {
			txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
		  }
		  if (node.hasAttribute("title")) {
			txt += ' "' + node.getAttribute("title") + '"';
		  }
		  txt += ")";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.links", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes() && node.hasAttribute("href")) {
		  var children = node.childNodes, childrenLength = children.length;
		  txt = "[";
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		  txt += "](";
		  txt += "<" + node.getAttribute("href") + ">";
		  if (node.hasAttribute("title")) {
			txt += ' "' + node.getAttribute("title") + '"';
		  }
		  txt += ")";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.list", function(node, globals, type) {
		"use strict";
		var txt = "";
		if (!node.hasChildNodes()) {
		  return "";
		}
		var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
		for (var i = 0; i < listItemsLenght; ++i) {
		  if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
			continue;
		  }
		  var bullet = "";
		  if (type === "ol") {
			bullet = listNum.toString() + ". ";
		  } else {
			bullet = "- ";
		  }
		  txt += bullet + showdown.subParser("makeMarkdown.listItem")(listItems[i], globals);
		  ++listNum;
		}
		txt += "\n\x3c!-- --\x3e\n";
		return txt.trim();
	  });
	  showdown.subParser("makeMarkdown.listItem", function(node, globals) {
		"use strict";
		var listItemTxt = "";
		var children = node.childNodes, childrenLenght = children.length;
		for (var i = 0; i < childrenLenght; ++i) {
		  listItemTxt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		}
		if (!/\n$/.test(listItemTxt)) {
		  listItemTxt += "\n";
		} else {
		  listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
		}
		return listItemTxt;
	  });
	  showdown.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
		"use strict";
		spansOnly = spansOnly || false;
		var txt = "";
		if (node.nodeType === 3) {
		  return showdown.subParser("makeMarkdown.txt")(node, globals);
		}
		if (node.nodeType === 8) {
		  return "\x3c!--" + node.data + "--\x3e\n\n";
		}
		if (node.nodeType !== 1) {
		  return "";
		}
		var tagName = node.tagName.toLowerCase();
		switch (tagName) {
		 case "h1":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
		  }
		  break;
  
		 case "h2":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
		  }
		  break;
  
		 case "h3":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
		  }
		  break;
  
		 case "h4":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
		  }
		  break;
  
		 case "h5":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
		  }
		  break;
  
		 case "h6":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
		  }
		  break;
  
		 case "p":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "blockquote":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "hr":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "ol":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
		  }
		  break;
  
		 case "ul":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
		  }
		  break;
  
		 case "precode":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "pre":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "table":
		  if (!spansOnly) {
			txt = showdown.subParser("makeMarkdown.table")(node, globals) + "\n\n";
		  }
		  break;
  
		 case "code":
		  txt = showdown.subParser("makeMarkdown.codeSpan")(node, globals);
		  break;
  
		 case "em":
		 case "i":
		  txt = showdown.subParser("makeMarkdown.emphasis")(node, globals);
		  break;
  
		 case "strong":
		 case "b":
		  txt = showdown.subParser("makeMarkdown.strong")(node, globals);
		  break;
  
		 case "del":
		  txt = showdown.subParser("makeMarkdown.strikethrough")(node, globals);
		  break;
  
		 case "a":
		  txt = showdown.subParser("makeMarkdown.links")(node, globals);
		  break;
  
		 case "img":
		  txt = showdown.subParser("makeMarkdown.image")(node, globals);
		  break;
  
		 default:
		  txt = node.outerHTML + "\n\n";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.paragraph", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes()) {
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		}
		txt = txt.trim();
		return txt;
	  });
	  showdown.subParser("makeMarkdown.pre", function(node, globals) {
		"use strict";
		var num = node.getAttribute("prenum");
		return "<pre>" + globals.preList[num] + "</pre>";
	  });
	  showdown.subParser("makeMarkdown.strikethrough", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes()) {
		  txt += "~~";
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		  txt += "~~";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.strong", function(node, globals) {
		"use strict";
		var txt = "";
		if (node.hasChildNodes()) {
		  txt += "**";
		  var children = node.childNodes, childrenLength = children.length;
		  for (var i = 0; i < childrenLength; ++i) {
			txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
		  }
		  txt += "**";
		}
		return txt;
	  });
	  showdown.subParser("makeMarkdown.table", function(node, globals) {
		"use strict";
		var txt = "", tableArray = [ [], [] ], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
		for (i = 0; i < headings.length; ++i) {
		  var headContent = showdown.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
		  if (headings[i].hasAttribute("style")) {
			var style = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
			switch (style) {
			 case "text-align:left;":
			  allign = ":---";
			  break;
  
			 case "text-align:right;":
			  allign = "---:";
			  break;
  
			 case "text-align:center;":
			  allign = ":---:";
			  break;
			}
		  }
		  tableArray[0][i] = headContent.trim();
		  tableArray[1][i] = allign;
		}
		for (i = 0; i < rows.length; ++i) {
		  var r = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
		  for (ii = 0; ii < headings.length; ++ii) {
			var cellContent = " ";
			if (typeof cols[ii] !== "undefined") {
			  cellContent = showdown.subParser("makeMarkdown.tableCell")(cols[ii], globals);
			}
			tableArray[r].push(cellContent);
		  }
		}
		var cellSpacesCount = 3;
		for (i = 0; i < tableArray.length; ++i) {
		  for (ii = 0; ii < tableArray[i].length; ++ii) {
			var strLen = tableArray[i][ii].length;
			if (strLen > cellSpacesCount) {
			  cellSpacesCount = strLen;
			}
		  }
		}
		for (i = 0; i < tableArray.length; ++i) {
		  for (ii = 0; ii < tableArray[i].length; ++ii) {
			if (i === 1) {
			  if (tableArray[i][ii].slice(-1) === ":") {
				tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
			  } else {
				tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
			  }
			} else {
			  tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
			}
		  }
		  txt += "| " + tableArray[i].join(" | ") + " |\n";
		}
		return txt.trim();
	  });
	  showdown.subParser("makeMarkdown.tableCell", function(node, globals) {
		"use strict";
		var txt = "";
		if (!node.hasChildNodes()) {
		  return "";
		}
		var children = node.childNodes, childrenLength = children.length;
		for (var i = 0; i < childrenLength; ++i) {
		  txt += showdown.subParser("makeMarkdown.node")(children[i], globals, true);
		}
		return txt.trim();
	  });
	  showdown.subParser("makeMarkdown.txt", function(node) {
		"use strict";
		var txt = node.nodeValue;
		txt = txt.replace(/ +/g, " ");
		txt = txt.replace(/¨NBSP;/g, " ");
		txt = showdown.helper.unescapeHTMLEntities(txt);
		txt = txt.replace(/([*_~|`])/g, "\\$1");
		txt = txt.replace(/^(\s*)>/g, "\\$1>");
		txt = txt.replace(/^#/gm, "\\#");
		txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
		txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
		txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
		txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
		txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
		return txt;
	  });
	  var root = this;
	  if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		  "use strict";
		  return showdown;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {}
	}).call(this);
  }, function(module, exports, __webpack_require__) {
	var __WEBPACK_AMD_DEFINE_RESULT__;
	(function(global) {
	  "use strict";
	  var dateFormat = function() {
		var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
		var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
		var timezoneClip = /[^-+\dA-Z]/g;
		return function(date, mask, utc, gmt) {
		  if (arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		  }
		  date = date || new Date();
		  if (!(date instanceof Date)) {
			date = new Date(date);
		  }
		  if (isNaN(date)) {
			throw TypeError("Invalid date");
		  }
		  mask = String(dateFormat.masks[mask] || mask || dateFormat.masks["default"]);
		  var maskSlice = mask.slice(0, 4);
		  if (maskSlice === "UTC:" || maskSlice === "GMT:") {
			mask = mask.slice(4);
			utc = true;
			if (maskSlice === "GMT:") {
			  gmt = true;
			}
		  }
		  var _ = utc ? "getUTC" : "get";
		  var d = date[_ + "Date"]();
		  var D = date[_ + "Day"]();
		  var m = date[_ + "Month"]();
		  var y = date[_ + "FullYear"]();
		  var H = date[_ + "Hours"]();
		  var M = date[_ + "Minutes"]();
		  var s = date[_ + "Seconds"]();
		  var L = date[_ + "Milliseconds"]();
		  var o = utc ? 0 : date.getTimezoneOffset();
		  var W = getWeek(date);
		  var N = getDayOfWeek(date);
		  var flags = {
			d: d,
			dd: pad(d),
			ddd: dateFormat.i18n.dayNames[D],
			dddd: dateFormat.i18n.dayNames[D + 7],
			m: m + 1,
			mm: pad(m + 1),
			mmm: dateFormat.i18n.monthNames[m],
			mmmm: dateFormat.i18n.monthNames[m + 12],
			yy: String(y).slice(2),
			yyyy: y,
			h: H % 12 || 12,
			hh: pad(H % 12 || 12),
			H: H,
			HH: pad(H),
			M: M,
			MM: pad(M),
			s: s,
			ss: pad(s),
			l: pad(L, 3),
			L: pad(Math.round(L / 10)),
			t: H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
			tt: H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
			T: H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
			TT: H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
			Z: gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [ "" ]).pop().replace(timezoneClip, ""),
			o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			S: [ "th", "st", "nd", "rd" ][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
			W: W,
			N: N
		  };
		  return mask.replace(token, function(match) {
			if (match in flags) {
			  return flags[match];
			}
			return match.slice(1, match.length - 1);
		  });
		};
	  }();
	  dateFormat.masks = {
		default: "ddd mmm dd yyyy HH:MM:ss",
		shortDate: "m/d/yy",
		mediumDate: "mmm d, yyyy",
		longDate: "mmmm d, yyyy",
		fullDate: "dddd, mmmm d, yyyy",
		shortTime: "h:MM TT",
		mediumTime: "h:MM:ss TT",
		longTime: "h:MM:ss TT Z",
		isoDate: "yyyy-mm-dd",
		isoTime: "HH:MM:ss",
		isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
		expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
	  };
	  dateFormat.i18n = {
		dayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
		monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
		timeNames: [ "a", "p", "am", "pm", "A", "P", "AM", "PM" ]
	  };
	  function pad(val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len) {
		  val = "0" + val;
		}
		return val;
	  }
	  function getWeek(date) {
		var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
		var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
		firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
		var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
		targetThursday.setHours(targetThursday.getHours() - ds);
		var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
		return 1 + Math.floor(weekDiff);
	  }
	  function getDayOfWeek(date) {
		var dow = date.getDay();
		if (dow === 0) {
		  dow = 7;
		}
		return dow;
	  }
	  function kindOf(val) {
		if (val === null) {
		  return "null";
		}
		if (val === undefined) {
		  return "undefined";
		}
		if (typeof val !== "object") {
		  return typeof val;
		}
		if (Array.isArray(val)) {
		  return "array";
		}
		return {}.toString.call(val).slice(8, -1).toLowerCase();
	  }
	  if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		  return dateFormat;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {}
	})(this);
  }, function(module, exports, __webpack_require__) {
	"use strict";
	var __importDefault = this && this.__importDefault || function(mod) {
	  return mod && mod.__esModule ? mod : {
		default: mod
	  };
	};
	const insert_text_textarea_1 = __importDefault(__webpack_require__(12));
	function indentTextarea(el) {
	  const {selectionStart: selectionStart, selectionEnd: selectionEnd, value: value} = el;
	  const linesCount = value.slice(selectionStart, selectionEnd).match(/^|\n/g).length;
	  if (linesCount > 1) {
		const firstLineStart = value.lastIndexOf("\n", selectionStart) + 1;
		el.setSelectionRange(firstLineStart, selectionEnd);
		const newSelection = el.value.slice(firstLineStart, selectionEnd);
		const indentedText = newSelection.replace(/^|\n/g, "$&\t");
		insert_text_textarea_1.default(el, indentedText);
		el.setSelectionRange(selectionStart + 1, selectionEnd + linesCount);
	  } else {
		insert_text_textarea_1.default(el, "\t");
	  }
	}
	function watchListener(event) {
	  const tsEvent = event;
	  if (tsEvent.key === "Tab" && !tsEvent.shiftKey) {
		indentTextarea(tsEvent.target);
		tsEvent.preventDefault();
	  }
	}
	function watchAndIndent(elements) {
	  if (typeof elements === "string") {
		elements = document.querySelectorAll(elements);
	  } else if (elements instanceof HTMLTextAreaElement) {
		elements = [ elements ];
	  }
	  for (const element of elements) {
		element.addEventListener("keydown", watchListener);
	  }
	}
	indentTextarea.watch = watchAndIndent;
	module.exports = indentTextarea;
  }, function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "format", {
	  enumerable: true,
	  get: function get() {
		return _format.format;
	  }
	});
	Object.defineProperty(exports, "render", {
	  enumerable: true,
	  get: function get() {
		return _realtime.render;
	  }
	});
	Object.defineProperty(exports, "cancel", {
	  enumerable: true,
	  get: function get() {
		return _realtime.cancel;
	  }
	});
	Object.defineProperty(exports, "register", {
	  enumerable: true,
	  get: function get() {
		return _locales.register;
	  }
	});
	exports.version = void 0;
	var _format = __webpack_require__(13);
	var _realtime = __webpack_require__(14);
	var _locales = __webpack_require__(0);
	var version = "4.0.0-beta.2";
	exports.version = version;
  }, function(module, __webpack_exports__, __webpack_require__) {
	"use strict";
	__webpack_require__.r(__webpack_exports__);
	var _styl_index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
	var _styl_index_styl__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_styl_index_styl__WEBPACK_IMPORTED_MODULE_0__);
	var showdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
	var showdown__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_1__);
	var dateformat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
	var dateformat__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_2__);
	var indent_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
	var indent_textarea__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(indent_textarea__WEBPACK_IMPORTED_MODULE_3__);
	var timeago_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
	var timeago_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(timeago_js__WEBPACK_IMPORTED_MODULE_4__);
	indent_textarea__WEBPACK_IMPORTED_MODULE_3___default.a.watch(".customCss textarea");
	const getHtmlElement = el => {
	  return document.querySelector(el);
	};
	const addClass = (el, className) => {
	  el.classList.add(className);
	};
	const removeClass = (el, className) => {
	  el.classList.remove(className);
	};
	const syncStorageSet = (name, value) => {
	  localStorage.setItem(name, value);
	  const item = {};
	  item[name] = value;
	  browser.storage.sync.set(item);
	};
	const renderBox = getHtmlElement(".markdown-body");
	const textarea = getHtmlElement("textarea");
	const mainSection = getHtmlElement("section.main");
	const historySection = getHtmlElement("section.history");
	const settingsSection = getHtmlElement("section.settings");
	let rawText;
	let isPowerModeEventListenerSet = false;
	const activeModals = [];
	let saveHistory;
	let cursorLastPosition;
	let returnKeyToggle;
	let sectionMainEventListener;
	let converter;
	const toggleDisplay = n => {
	  if (n) {
		removeClass(textarea, "nodisplay");
		addClass(renderBox, "nodisplay");
	  } else {
		addClass(textarea, "nodisplay");
		removeClass(renderBox, "nodisplay");
	  }
	};
	const moveCaretToStart = () => {
	  if (typeof textarea.selectionStart === "number") {
		textarea.selectionStart = 0;
		textarea.selectionEnd = 0;
	  } else if (typeof textarea.createTextRange !== "undefined") {
		textarea.focus();
		const range = textarea.createTextRange();
		range.collapse(true);
		range.select();
	  }
	};
	const edit = () => {
	  toggleDisplay(1);
	  textarea.focus();
	  if (cursorLastPosition) {
		textarea.selectionStart = Number(localStorage.getItem("cursorLastPosition"));
	  } else {
		moveCaretToStart();
		textarea.scrollTop = 0;
	  }
	  removeClass(getHtmlElement("#save"), "nodisplay");
	  addClass(getHtmlElement("#edit"), "nodisplay");
	};
	const save = (saveRevHist = 1) => {
	  syncStorageSet("cursorLastPosition", textarea.selectionStart);
	  toggleDisplay(0);
	  const text = textarea.value;
	  const html = converter.makeHtml(text);
	  renderBox.innerHTML = html;
	  if (html !== converter.makeHtml(rawText)) {
		syncStorageSet("rawText", text);
		rawText = text;
		if (saveHistory && saveRevHist) {
		  syncStorageSet("lastEdited", new Date().toString());
		  setHistory();
		}
	  }
	  removeClass(getHtmlElement("#edit"), "nodisplay");
	  addClass(getHtmlElement("#save"), "nodisplay");
	};
	const getHistory = () => {
	  const rawHistory = localStorage.getItem("history");
	  const history = rawHistory === null ? [] : JSON.parse(rawHistory);
	  return history;
	};
	const setHistory = () => {
	  const history = getHistory();
	  const historyItem = {
		date: new Date(),
		text: rawText
	  };
	  history.unshift(historyItem);
	  if (history.length > 10) {
		history.pop();
	  }
	  syncStorageSet("history", JSON.stringify(history));
	};
	const displayMarkdown = item => {
	  const text = decodeURIComponent(escape(atob(item.getAttribute("data-text"))));
	  const mdBody = item.children[1];
	  const textarea = item.children[2];
	  mdBody.innerHTML = converter.makeHtml(text);
	  removeClass(mdBody, "nodisplay");
	  addClass(textarea, "nodisplay");
	};
	const displayTextarea = item => {
	  const text = decodeURIComponent(escape(atob(item.getAttribute("data-text"))));
	  const mdBody = item.children[1];
	  const textarea = item.children[2];
	  addClass(mdBody, "nodisplay");
	  removeClass(textarea, "nodisplay");
	  textarea.innerHTML = text;
	};
	const populateHistoryHtml = () => {
	  let listElements = "";
	  const history = getHistory();
	  const {length: length} = history;
	  history.forEach((item, id) => {
		const parsedDate = new Date(Date.parse(item.date));
		const textBase64 = btoa(unescape(encodeURIComponent(item.text)));
		listElements += `<div class='item' data-text='${textBase64}'>\n\t\t\t\t<div class='label flex'>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p class='id'>#${length - id}</p>\n\t\t\t\t\t\t<p class='date'>${parsedDate.toLocaleString()}</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class='noselect flex'>\n\t\t\t\t\t\t<div class='button'>\n\t\t\t\t\t\t\t<img class='nodrag' src='/static/svg/bin.svg'/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='button'>\n\t\t\t\t\t\t\t<img class='nodrag' src='/static/svg/view.svg'/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class='markdown-body'></div>\n\t\t\t\t<textarea class='nodisplay' readonly></textarea>\n\t\t\t</div>`;
	  });
	  getHtmlElement("section.history .list").innerHTML = listElements;
	  [ ...document.querySelectorAll("section.history .item") ].reverse().forEach((item, index) => {
		displayMarkdown(item);
		const [deleteButton, viewButton] = item.children[0].children[1].children;
		deleteButton.addEventListener("click", () => {
		  history.splice(length - index - 1, 1);
		  syncStorageSet("history", JSON.stringify(history));
		  populateHistoryHtml();
		});
		viewButton.addEventListener("click", () => {
		  if (item.children[2].classList.contains("nodisplay")) {
			displayTextarea(item);
		  } else {
			displayMarkdown(item);
		  }
		});
	  });
	};
	const getSettings = () => {
	  const rawSettings = localStorage.getItem("settings");
	  const settings = typeof rawSettings === "string" ? JSON.parse(rawSettings) : null;
	  return settings;
	};
	const setSettings = (key, value) => {
	  let settings = getSettings();
	  if (settings === null || Object.keys(settings).length !== 6) {
		settings = {
		  saveHistory: true,
		  cursorLastPosition: true,
		  returnKeyToggle: false,
		  enablePowerMode: false,
		  PowerModeColor: false,
		  PowerModeShake: false
		};
	  }
	  settings[key] = value;
	  syncStorageSet("settings", JSON.stringify(settings));
	};
	const setEventListenersToSettings = async () => {
	  const settingsItems = document.querySelectorAll("section.settings .item:not(.dateFormat)");
	  for (const item of settingsItems) {
		item.addEventListener("click", () => {
		  settingsControl(item.dataset.setting);
		});
	  }
	  const dateFormatForm = document.querySelector("section.settings .dateFormat form");
	  const dateFormatInput = dateFormatForm.querySelector('input[name="dateFormat"]');
	  const dateFormatSubmit = dateFormatForm.querySelector('input[type="submit"]');
	  dateFormatInput.value = (await browser.storage.sync.get()).dateFormat || "dd/mm/yyyy - HH:MM:ss";
	  dateFormatForm.addEventListener("submit", async event => {
		event.preventDefault();
		const {value: value} = dateFormatInput;
		await browser.storage.sync.set({
		  dateFormat: value.trim()
		});
		dateFormatSubmit.classList.add("saved");
		setTimeout(() => {
		  dateFormatSubmit.classList.remove("saved");
		}, 500);
	  });
	  const customCssForm = document.querySelector("section.settings .customCss form");
	  const customCssTextarea = customCssForm.querySelector("textarea");
	  const customCssSubmit = customCssForm.querySelector("input");
	  customCssTextarea.value = (await browser.storage.sync.get()).customCss || "";
	  customCssForm.addEventListener("submit", async event => {
		event.preventDefault();
		const {value: value} = customCssTextarea;
		await browser.storage.sync.set({
		  customCss: value.trim()
		});
		customCssSubmit.classList.add("saved");
		setTimeout(() => {
		  customCssSubmit.classList.remove("saved");
		}, 500);
	  });
	};
	const settingsControl = (keyName = undefined) => {
	  const settings = getSettings();
	  const settingsItems = document.querySelectorAll("section.settings .item:not(.dateFormat)");
	  for (const item of settingsItems) {
		const key = item.dataset.setting;
		const value = settings[key];
		removeClass(item, value ? "off" : "on");
		addClass(item, value ? "on" : "off");
		if (key === keyName) {
		  setSettings(key, !value);
		  settingsControl();
		}
	  }
	  applySettings();
	};
	const applySettings = () => {
	  const settings = getSettings();
	  saveHistory = settings.saveHistory;
	  cursorLastPosition = settings.cursorLastPosition;
	  returnKeyToggle = settings.returnKeyToggle;
	  if (settings.enablePowerMode && !isPowerModeEventListenerSet) {
		textarea.addEventListener("input", POWERMODE);
		isPowerModeEventListenerSet = true;
	  }
	  if (!settings.enablePowerMode && isPowerModeEventListenerSet) {
		textarea.removeEventListener("input", POWERMODE);
		isPowerModeEventListenerSet = false;
	  }
	};
	const openModal = (section, func) => {
	  if (func) {
		func();
	  }
	  if (activeModals.indexOf(section) === -1) {
		activeModals.push(section);
	  }
	  if (activeModals.length === 1) {
		removeClass(section, "z-index-3");
		addClass(section, "z-index-2");
	  } else if (activeModals.length === 2) {
		removeClass(section, "z-index-2");
		addClass(section, "z-index-3");
	  }
	  removeClass(section, "nodisplay");
	  removeClass(mainSection, "noblur");
	  addClass(mainSection, "blur");
	  if (!sectionMainEventListener) {
		sectionMainEventListener = true;
		mainSection.addEventListener("click", () => {
		  return closeModal(activeModals);
		}, false);
	  }
	};
	const closeModal = section => {
	  if (section.constructor === Array) {
		section.map(el => closeModal(el));
	  } else {
		if (activeModals.indexOf(section) !== -1) {
		  activeModals.splice(activeModals.indexOf(section), 1);
		}
		addClass(section, "nodisplay");
	  }
	  if (activeModals.length === 0) {
		removeClass(mainSection, "blur");
		addClass(mainSection, "noblur");
	  }
	};
	const dragModal = name => {
	  const el = getHtmlElement(`section.${name}`);
	  let pos1 = 0;
	  let pos2 = 0;
	  let pos3 = 0;
	  let pos4 = 0;
	  const elementDrag = e => {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		el.style.top = el.offsetTop - pos2 + "px";
		el.style.left = el.offsetLeft - pos1 + "px";
	  };
	  const closeDragElement = () => {
		document.removeEventListener("mouseup", closeDragElement, false);
		document.removeEventListener("mousemove", elementDrag, false);
	  };
	  const dragMouseDown = e => {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.addEventListener("mouseup", closeDragElement, false);
		document.addEventListener("mousemove", elementDrag, false);
	  };
	  getHtmlElement(`section.${name} .header`).addEventListener("mousedown", dragMouseDown, false);
	};
	const timeDisplay = async () => {
	  const timeEl = getHtmlElement("#time");
	  let dateFormatText = (await browser.storage.sync.get()).dateFormat;
	  if (!dateFormatText || dateFormatText === "") {
		dateFormatText = "dd/mm/yyyy - HH:MM:ss";
	  }
	  setInterval(() => {
		const now = new Date();
		const output = dateformat__WEBPACK_IMPORTED_MODULE_2___default()(now, dateFormatText);
		timeEl.innerHTML = output;
	  }, 1e3);
	};
	const initiate = async () => {
	  const {customCss: customCss = ""} = await browser.storage.sync.get();
	  if (customCss.trim().length > 0) {
		const style = document.createElement("style");
		style.innerHTML = customCss;
		document.head.append(style);
	  }
	  rawText = localStorage.getItem("rawText");
	  await setEventListenersToSettings();
	  setSettings();
	  settingsControl();
	  converter = new showdown__WEBPACK_IMPORTED_MODULE_1___default.a.Converter({
		simplifiedAutoLink: true,
		excludeTrailingPunctuationFromURLs: true,
		strikethrough: true,
		tables: true,
		tasklist: true,
		ghCodeBlocks: true,
		smoothLivePreview: true,
		smartIndentationFix: true,
		simpleLineBreaks: true,
		openLinksInNewWindow: false,
		emoji: true
	  });
	  converter.setFlavor("github");
	  textarea.value = rawText === null ? `# Hello, world!\n\nStart editing right now by clicking the *edit* button or pressing <kbd>${navigator.platform.match("Mac") ? "Cmd" : "Ctrl"}</kbd> + <kbd>X</kbd>.\n\nTo save the file click the *save* button or press <kbd>${navigator.platform.match("Mac") ? "Cmd" : "Ctrl"}</kbd> + <kbd>S</kbd>.\n\nCheers!` : rawText;
	  save();
	  dragModal("history");
	  dragModal("settings");
	  await timeDisplay();
	  const lastEdited = localStorage.getItem("lastEdited");
	  if (lastEdited === "[object Object]") {
		const history = getHistory();
		const actualLastEdited = history.length > 0 ? history[0].date : 0;
		syncStorageSet("lastEdited", actualLastEdited);
	  }
	  setInterval(async () => {
		let lastEdited = localStorage.getItem("lastEdited");
		lastEdited = Number(lastEdited) === 0 ? undefined : lastEdited;
		getHtmlElement("#lastEdited").innerHTML = lastEdited ? `Last edited: ${Object(timeago_js__WEBPACK_IMPORTED_MODULE_4__["format"])(new Date(lastEdited))}` : "Last edited: Never";
	  }, 1e3);
	  getHtmlElement("#edit").addEventListener("click", () => {
		edit();
	  }, false);
	  getHtmlElement("#save").addEventListener("click", () => {
		save();
	  }, false);
	  getHtmlElement("#lastEdited").addEventListener("click", () => {
		openModal(historySection, populateHistoryHtml);
	  }, false);
	  getHtmlElement("#closeHistory").addEventListener("click", () => {
		closeModal(historySection);
	  }, false);
	  getHtmlElement("#settings").addEventListener("click", () => {
		openModal(settingsSection);
	  }, false);
	  getHtmlElement("#closeSettings").addEventListener("click", () => {
		closeModal(settingsSection);
	  }, false);
	  document.addEventListener("keydown", e => {
		if (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) {
		  if (returnKeyToggle) {
			if (e.keyCode === 13) {
			  if (renderBox.classList.contains("nodisplay")) {
				e.preventDefault();
				save();
			  } else {
				e.preventDefault();
				edit();
			  }
			}
		  } else if (e.keyCode === 83) {
			if (renderBox.classList.contains("nodisplay")) {
			  e.preventDefault();
			  save();
			}
		  } else if (e.keyCode === 88) {
			if (textarea.classList.contains("nodisplay")) {
			  e.preventDefault();
			  edit();
			}
		  }
		} else if (e.keyCode === 27) {
		  if (activeModals.length > 0) {
			closeModal([ ...activeModals ].pop());
		  }
		}
	  }, false);
	  document.addEventListener("visibilitychange", () => {
		if (document.hidden && renderBox.classList.contains("nodisplay")) {
		  save(0);
		  edit();
		  textarea.selectionStart = Number(localStorage.getItem("cursorLastPosition"));
		}
	  });
	};
	(() => {
	  browser.storage.sync.get().then(async items => {
		if (!browser.runtime.error) {
		  for (const [key, value] of Object.entries(items)) {
			localStorage.setItem(key, value);
		  }
		  await initiate();
		}
	  });
	})();
  }, function(module, exports, __webpack_require__) {
	var content = __webpack_require__(8);
	if (typeof content === "string") content = [ [ module.i, content, "" ] ];
	var transform;
	var insertInto;
	var options = {
	  hmr: true
	};
	options.transform = transform;
	options.insertInto = undefined;
	var update = __webpack_require__(10)(content, options);
	if (content.locals) module.exports = content.locals;
	if (false) {}
  }, function(module, exports, __webpack_require__) {
	exports = module.exports = __webpack_require__(9)(false);
	exports.push([ module.i, "@charset \"utf-8\";\n@font-face {\n  font-family: 'Fira Mono';\n  src: url(\"/static/fonts/fira-mono.woff2\") format('woff2'), url(\"/static/fonts/fira-mono.woff\") format('woff');\n}\n::selection {\n  background: rgba(255,255,255,0.996);\n  color: #000;\n}\nhtml,\nbody,\n:root {\n  width: 100%;\n  height: 100%;\n  background: #000;\n  font-family: 'Fira Mono';\n}\n* {\n  padding: 0;\n  margin: 0;\n  position: relative;\n  box-sizing: border-box;\n  text-rendering: optimizeLegibility;\n}\n*.flex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n*.noselect {\n  user-select: none;\n}\n*.nodisplay {\n  display: none;\n}\n*.nodrag {\n  user-drag: none;\n  -webkit-user-drag: none;\n}\n*.container {\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n}\n.container {\n  flex-direction: column;\n  overflow: hidden;\n}\nsection.bar {\n  height: 40px;\n  width: 100%;\n  background: #000;\n  color: #fff;\n  position: fixed;\n  bottom: 0;\n  font-size: 16px;\n  border-top: 1px solid #fff;\n  z-index: 4;\n}\nsection.bar #lastEdited {\n  position: absolute;\n  right: 0;\n  border-left: 1px solid #fff;\n  line-height: 40px;\n  padding: 0 10px;\n  cursor: pointer;\n}\nsection.bar #lastEdited:hover::after {\n  content: 'CLICK TO VIEW REVISION HISTORY';\n  position: absolute;\n  font-size: 12px;\n  color: #ccc;\n  top: -100%;\n  left: -1px;\n  text-align: center;\n  width: 100%;\n  border-top: 1px solid #fff;\n  border-left: 1px solid #fff;\n  white-space: nowrap;\n}\nsection.bar .button {\n  padding: 0;\n  height: 100%;\n  width: 40px;\n  position: absolute;\n  left: 0;\n}\nsection.main {\n  height: 100%;\n  width: 100%;\n  align-items: flex-start;\n  margin-bottom: 40px;\n  font-size: 20px;\n  transition: 0.1s all linear;\n}\nsection.main textarea,\nsection.main .markdown-body {\n  background: inherit;\n  border: none;\n  height: 100%;\n  max-width: 1000px;\n  width: 95%;\n  padding: 5vh;\n  color: #fff;\n  line-height: 1.4em;\n  outline: none;\n  resize: none;\n  overflow-y: auto;\n}\nsection.main textarea::-webkit-scrollbar,\nsection.main .markdown-body::-webkit-scrollbar {\n  width: 15px;\n  background: #000;\n}\nsection.main textarea::-webkit-scrollbar-thumb,\nsection.main .markdown-body::-webkit-scrollbar-thumb {\n  background: #000;\n  border: 1px solid #fff;\n}\nsection.main textarea {\n  font-size: 18px;\n  font-family: 'Fira Mono';\n  letter-spacing: 0.5px;\n}\nsection.main.blur {\n  filter: blur(3px);\n  user-select: none;\n}\nsection.main.noblur {\n  filter: blur(0px);\n  user-select: default;\n}\n.buttons {\n  flex-direction: column;\n  margin: 5vh 0 0 2vh;\n}\n.button {\n  cursor: pointer;\n  padding: 10px;\n  font-family: monospace;\n}\n.button img {\n  cursor: pointer;\n  height: 20px;\n  width: auto;\n}\n.button:hover {\n  outline: 1px solid #fff;\n}\nsection.history,\nsection.settings {\n  height: 80vh;\n  max-width: 1200px;\n  width: 95%;\n  border: 1px solid #fff;\n  position: absolute;\n  background: rgba(0,0,0,0.8);\n  top: 5vh;\n  color: #fff;\n  flex-direction: column;\n  justify-content: flex-start;\n}\nsection.history .header,\nsection.settings .header {\n  width: 100%;\n  padding: 20px;\n  cursor: move;\n  cursor: -webkit-grab;\n  border-bottom: 1px solid #333;\n}\nsection.history .header h1,\nsection.settings .header h1 {\n  font-size: 35px;\n  text-align: center;\n  font-weight: 100;\n  flex: 1;\n}\nsection.history .header .close,\nsection.settings .header .close {\n  cursor: pointer;\n  padding: 10px;\n  font-family: monospace;\n}\nsection.history .header .close img,\nsection.settings .header .close img {\n  cursor: pointer;\n  height: 20px;\n  width: auto;\n}\nsection.history .header .close:hover,\nsection.settings .header .close:hover {\n  outline: 1px solid #fff;\n}\nsection.history.z-index-2,\nsection.settings.z-index-2 {\n  z-index: 2;\n}\nsection.history.z-index-3,\nsection.settings.z-index-3 {\n  z-index: 3;\n}\nsection.history .list {\n  width: 100%;\n  height: 100%;\n  padding: 30px;\n  overflow-y: scroll;\n}\nsection.history .list::-webkit-scrollbar {\n  width: 15px;\n  background: #000;\n}\nsection.history .list::-webkit-scrollbar-thumb {\n  background: #000;\n  border: 1px solid #fff;\n  border-right: none;\n}\nsection.history .item {\n  width: 100%;\n  margin: 40px 0 0 0;\n}\nsection.history .item textarea {\n  width: 100%;\n  height: 50vh;\n  background: rgba(17,17,17,0.6);\n  border-radius: 7px;\n  overflow-y: scroll;\n  padding: 20px;\n  resize: none;\n  outline: none;\n  color: #fff;\n  font-family: 'Fira Mono';\n  font-size: 16px;\n  border: none;\n  margin: 0;\n}\nsection.history .item textarea::-webkit-scrollbar {\n  width: 10px;\n  background: #000;\n}\nsection.history .item textarea::-webkit-scrollbar-thumb {\n  background: #000;\n  border: 1px solid #fff;\n}\nsection.history .item .markdown-body {\n  padding: 20px;\n  background: rgba(17,17,17,0.6);\n  border-radius: 7px;\n  max-height: 50vh;\n  overflow-y: scroll;\n}\nsection.history .item .markdown-body::-webkit-scrollbar {\n  width: 10px;\n  background: #000;\n}\nsection.history .item .markdown-body::-webkit-scrollbar-thumb {\n  background: #000;\n  border: 1px solid #fff;\n}\nsection.history .item p {\n  font-size: 16px;\n}\nsection.history .item p.id {\n  color: #bbb;\n  display: inline;\n  font-size: 20px;\n  font-weight: bold;\n}\nsection.history .item p.date {\n  display: inline;\n  padding-left: 20px;\n  font-weight: bold;\n  font-size: 23px;\n}\nsection.history .item .label {\n  padding-bottom: 20px;\n  justify-content: space-between;\n}\nsection.settings .body {\n  height: 100%;\n  width: 100%;\n  overflow-y: auto;\n}\nsection.settings .body::-webkit-scrollbar {\n  width: 15px;\n  background: #000;\n}\nsection.settings .body::-webkit-scrollbar-thumb {\n  background: #000;\n  border: 1px solid #fff;\n  border-right: none;\n}\nsection.settings .item {\n  padding: 25px 40px;\n  border-bottom: 1px solid #333;\n  cursor: pointer;\n}\nsection.settings .item .main {\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-direction: column;\n  flex: 1;\n}\nsection.settings .item .main label {\n  font-size: 24px;\n  line-height: 1;\n}\nsection.settings .item .main p {\n  font-size: 16px;\n  color: #bbb;\n  margin-top: 10px;\n  margin-right: 20px;\n}\nsection.settings .item.dateFormat,\nsection.settings .item.customCss {\n  cursor: default;\n}\nsection.settings .item.dateFormat a,\nsection.settings .item.customCss a {\n  color: #fff;\n  font-weight: bold;\n  text-decoration: none;\n}\nsection.settings .item.dateFormat a:hover,\nsection.settings .item.customCss a:hover {\n  text-decoration: underline;\n}\nsection.settings .item.dateFormat form,\nsection.settings .item.customCss form {\n  margin: 5px -10px;\n  width: 100%;\n}\nsection.settings .item.dateFormat input,\nsection.settings .item.customCss input {\n  margin: 10px;\n  background: none;\n  border: 1px solid #fff;\n  padding: 5px 10px;\n  font-size: 16px;\n  font-family: 'Fira Mono';\n  color: #fff;\n  outline: none;\n}\nsection.settings .item.dateFormat input[type='text'],\nsection.settings .item.customCss input[type='text'] {\n  width: 300px;\n}\nsection.settings .item.dateFormat input[type='submit'],\nsection.settings .item.customCss input[type='submit'] {\n  cursor: pointer;\n}\nsection.settings .item.dateFormat input[type='submit'].saved,\nsection.settings .item.customCss input[type='submit'].saved {\n  border-color: #008000;\n}\nsection.settings .item.dateFormat input:hover,\nsection.settings .item.customCss input:hover,\nsection.settings .item.dateFormat input:active,\nsection.settings .item.customCss input:active,\nsection.settings .item.dateFormat input:focus,\nsection.settings .item.customCss input:focus {\n  outline: none;\n}\nsection.settings .item.dateFormat textarea,\nsection.settings .item.customCss textarea {\n  display: block;\n  width: 100%;\n  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;\n  line-height: 1.5;\n  resize: vertical;\n  -moz-tab-size: 4 !important;\n  tab-size: 4 !important;\n  box-sizing: border-box;\n  margin-top: 5px;\n  margin-left: 10px;\n  background: #000;\n  border: 1px solid #fff;\n  box-shadow: none;\n  color: #fff;\n  padding: 5px;\n  font-size: 16px;\n  margin-bottom: 5px;\n}\nsection.settings .item .switch {\n  height: 30px;\n  width: 30px;\n  border: 2px solid #fff;\n  align-items: center;\n}\nsection.settings .item .switch .box {\n  height: 20px;\n  width: 20px;\n  transition: 0.2s all linear;\n}\nsection.settings .item.on .box {\n  background: #fff;\n}\nsection.settings .item.off .box {\n  background: none;\n}\n", "" ]);
  }, function(module, exports, __webpack_require__) {
	"use strict";
	module.exports = function(useSourceMap) {
	  var list = [];
	  list.toString = function toString() {
		return this.map(function(item) {
		  var content = cssWithMappingToString(item, useSourceMap);
		  if (item[2]) {
			return "@media ".concat(item[2], "{").concat(content, "}");
		  }
		  return content;
		}).join("");
	  };
	  list.i = function(modules, mediaQuery) {
		if (typeof modules === "string") {
		  modules = [ [ null, modules, "" ] ];
		}
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
		  var id = this[i][0];
		  if (id != null) {
			alreadyImportedModules[id] = true;
		  }
		}
		for (var _i = 0; _i < modules.length; _i++) {
		  var item = modules[_i];
		  if (item[0] == null || !alreadyImportedModules[item[0]]) {
			if (mediaQuery && !item[2]) {
			  item[2] = mediaQuery;
			} else if (mediaQuery) {
			  item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
			}
			list.push(item);
		  }
		}
	  };
	  return list;
	};
	function cssWithMappingToString(item, useSourceMap) {
	  var content = item[1] || "";
	  var cssMapping = item[3];
	  if (!cssMapping) {
		return content;
	  }
	  if (useSourceMap && typeof btoa === "function") {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function(source) {
		  return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
		});
		return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
	  }
	  return [ content ].join("\n");
	}
	function toComment(sourceMap) {
	  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
	  return "/*# ".concat(data, " */");
	}
  }, function(module, exports, __webpack_require__) {
	var stylesInDom = {};
	var memoize = function(fn) {
	  var memo;
	  return function() {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	  };
	};
	var isOldIE = memoize(function() {
	  return window && document && document.all && !window.atob;
	});
	var getTarget = function(target, parent) {
	  if (parent) {
		return parent.querySelector(target);
	  }
	  return document.querySelector(target);
	};
	var getElement = function(fn) {
	  var memo = {};
	  return function(target, parent) {
		if (typeof target === "function") {
		  return target();
		}
		if (typeof memo[target] === "undefined") {
		  var styleTarget = getTarget.call(this, target, parent);
		  if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
			try {
			  styleTarget = styleTarget.contentDocument.head;
			} catch (e) {
			  styleTarget = null;
			}
		  }
		  memo[target] = styleTarget;
		}
		return memo[target];
	  };
	}();
	var singleton = null;
	var singletonCounter = 0;
	var stylesInsertedAtTop = [];
	var fixUrls = __webpack_require__(11);
	module.exports = function(list, options) {
	  if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	  }
	  options = options || {};
	  options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	  if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();
	  if (!options.insertInto) options.insertInto = "head";
	  if (!options.insertAt) options.insertAt = "bottom";
	  var styles = listToStyles(list, options);
	  addStylesToDom(styles, options);
	  return function update(newList) {
		var mayRemove = [];
		for (var i = 0; i < styles.length; i++) {
		  var item = styles[i];
		  var domStyle = stylesInDom[item.id];
		  domStyle.refs--;
		  mayRemove.push(domStyle);
		}
		if (newList) {
		  var newStyles = listToStyles(newList, options);
		  addStylesToDom(newStyles, options);
		}
		for (var i = 0; i < mayRemove.length; i++) {
		  var domStyle = mayRemove[i];
		  if (domStyle.refs === 0) {
			for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
			delete stylesInDom[domStyle.id];
		  }
		}
	  };
	};
	function addStylesToDom(styles, options) {
	  for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if (domStyle) {
		  domStyle.refs++;
		  for (var j = 0; j < domStyle.parts.length; j++) {
			domStyle.parts[j](item.parts[j]);
		  }
		  for (;j < item.parts.length; j++) {
			domStyle.parts.push(addStyle(item.parts[j], options));
		  }
		} else {
		  var parts = [];
		  for (var j = 0; j < item.parts.length; j++) {
			parts.push(addStyle(item.parts[j], options));
		  }
		  stylesInDom[item.id] = {
			id: item.id,
			refs: 1,
			parts: parts
		  };
		}
	  }
	}
	function listToStyles(list, options) {
	  var styles = [];
	  var newStyles = {};
	  for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {
		  css: css,
		  media: media,
		  sourceMap: sourceMap
		};
		if (!newStyles[id]) styles.push(newStyles[id] = {
		  id: id,
		  parts: [ part ]
		}); else newStyles[id].parts.push(part);
	  }
	  return styles;
	}
	function insertStyleElement(options, style) {
	  var target = getElement(options.insertInto);
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
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	  } else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	  }
	}
	function removeStyleElement(style) {
	  if (style.parentNode === null) return false;
	  style.parentNode.removeChild(style);
	  var idx = stylesInsertedAtTop.indexOf(style);
	  if (idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	  }
	}
	function createStyleElement(options) {
	  var style = document.createElement("style");
	  if (options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	  }
	  if (options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
		  options.attrs.nonce = nonce;
		}
	  }
	  addAttrs(style, options.attrs);
	  insertStyleElement(options, style);
	  return style;
	}
	function createLinkElement(options) {
	  var link = document.createElement("link");
	  if (options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	  }
	  options.attrs.rel = "stylesheet";
	  addAttrs(link, options.attrs);
	  insertStyleElement(options, link);
	  return link;
	}
	function addAttrs(el, attrs) {
	  Object.keys(attrs).forEach(function(key) {
		el.setAttribute(key, attrs[key]);
	  });
	}
	function getNonce() {
	  if (false) {}
	  return __webpack_require__.nc;
	}
	function addStyle(obj, options) {
	  var style, update, remove, result;
	  if (options.transform && obj.css) {
		result = typeof options.transform === "function" ? options.transform(obj.css) : options.transform.default(obj.css);
		if (result) {
		  obj.css = result;
		} else {
		  return function() {};
		}
	  }
	  if (options.singleton) {
		var styleIndex = singletonCounter++;
		style = singleton || (singleton = createStyleElement(options));
		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);
	  } else if (obj.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function() {
		  removeStyleElement(style);
		  if (style.href) URL.revokeObjectURL(style.href);
		};
	  } else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function() {
		  removeStyleElement(style);
		};
	  }
	  update(obj);
	  return function updateStyle(newObj) {
		if (newObj) {
		  if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
			return;
		  }
		  update(obj = newObj);
		} else {
		  remove();
		}
	  };
	}
	var replaceText = function() {
	  var textStore = [];
	  return function(index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join("\n");
	  };
	}();
	function applyToSingletonTag(style, index, remove, obj) {
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
	function applyToTag(style, obj) {
	  var css = obj.css;
	  var media = obj.media;
	  if (media) {
		style.setAttribute("media", media);
	  }
	  if (style.styleSheet) {
		style.styleSheet.cssText = css;
	  } else {
		while (style.firstChild) {
		  style.removeChild(style.firstChild);
		}
		style.appendChild(document.createTextNode(css));
	  }
	}
	function updateLink(link, options, obj) {
	  var css = obj.css;
	  var sourceMap = obj.sourceMap;
	  var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	  if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	  }
	  if (sourceMap) {
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	  }
	  var blob = new Blob([ css ], {
		type: "text/css"
	  });
	  var oldSrc = link.href;
	  link.href = URL.createObjectURL(blob);
	  if (oldSrc) URL.revokeObjectURL(oldSrc);
	}
  }, function(module, exports) {
	module.exports = function(css) {
	  var location = typeof window !== "undefined" && window.location;
	  if (!location) {
		throw new Error("fixUrls requires window.location");
	  }
	  if (!css || typeof css !== "string") {
		return css;
	  }
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function(o, $1) {
		  return $1;
		}).replace(/^'(.*)'$/, function(o, $1) {
		  return $1;
		});
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}
		var newUrl;
		if (unquotedOrigUrl.indexOf("//") === 0) {
		  newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
		  newUrl = baseUrl + unquotedOrigUrl;
		} else {
		  newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, "");
		}
		return "url(" + JSON.stringify(newUrl) + ")";
	  });
	  return fixedCss;
	};
  }, function(module, exports, __webpack_require__) {
	"use strict";
	function insertText(textarea, text) {
	  const document = textarea.ownerDocument;
	  const window = document.defaultView;
	  textarea.focus();
	  if (document.execCommand("insertText", false, text)) {
		return;
	  }
	  textarea.setRangeText(text, textarea.selectionStart, textarea.selectionEnd, "end");
	  textarea.dispatchEvent(new window.InputEvent("input", {
		data: text,
		inputType: "insertText",
		isComposing: false
	  }));
	}
	module.exports = insertText;
  }, function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.format = void 0;
	var _date = __webpack_require__(1);
	var _locales = __webpack_require__(0);
	var format = function format(date, locale, nowDate) {
	  var sec = (0, _date.diffSec)(date, nowDate);
	  return (0, _date.formatDiff)(sec, (0, _locales.getLocale)(locale));
	};
	exports.format = format;
  }, function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = exports.cancel = void 0;
	var _dom = __webpack_require__(15);
	var _date = __webpack_require__(1);
	var _locales = __webpack_require__(0);
	var TimerPool = {};
	var clear = function clear(tid) {
	  clearTimeout(tid);
	  delete TimerPool[tid];
	};
	var run = function run(node, date, localeFunc, nowDate) {
	  clear((0, _dom.getTimerId)(node));
	  var diff = (0, _date.diffSec)(date, nowDate);
	  node.innerHTML = (0, _date.formatDiff)(diff, localeFunc);
	  var tid = setTimeout(function() {
		run(node, date, localeFunc, nowDate);
	  }, (0, _date.nextInterval)(diff) * 1e3, 2147483647);
	  TimerPool[tid] = 0;
	  (0, _dom.saveTimerId)(node, tid);
	};
	var cancel = function cancel(node) {
	  if (node) clear((0, _dom.getTimerId)(node)); else for (var tid in TimerPool) {
		clear(tid);
	  }
	};
	exports.cancel = cancel;
	var render = function render(nodes, locale, nowDate) {
	  if (nodes.length === undefined) nodes = [ nodes ];
	  var node;
	  for (var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		var date = (0, _dom.getDateAttribute)(node);
		var localeFunc = (0, _locales.getLocale)(locale);
		run(node, date, localeFunc, nowDate);
	  }
	  return nodes;
	};
	exports.render = render;
  }, function(module, exports, __webpack_require__) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTimerId = exports.saveTimerId = exports.getDateAttribute = void 0;
	var ATTR_TIMEAGO_TID = "timeago-tid";
	var ATTR_DATETIME = "datetime";
	var getAttribute = function getAttribute(node, name) {
	  if (node.getAttribute) return node.getAttribute(name);
	  if (node.attr) return node.attr(name);
	};
	var getDateAttribute = function getDateAttribute(node) {
	  return getAttribute(node, ATTR_DATETIME);
	};
	exports.getDateAttribute = getDateAttribute;
	var saveTimerId = function saveTimerId(node, timerId) {
	  if (node.setAttribute) return node.setAttribute(ATTR_TIMEAGO_TID, timerId);
	  if (node.attr) return node.attr(ATTR_TIMEAGO_TID, timerId);
	};
	exports.saveTimerId = saveTimerId;
	var getTimerId = function getTimerId(node) {
	  return getAttribute(node, ATTR_TIMEAGO_TID);
	};
	exports.getTimerId = getTimerId;
  } ]);