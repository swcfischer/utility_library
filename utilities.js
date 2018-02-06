(function() {
  var _ = function(elements) {
    
    var findObjs = function(elements, props, multiple) {
      var match = multiple ? [] : undefined;

          elements.some(function(obj) {
            var all_match = true;

            for (var prop in props) {
              if (obj[prop] !== props[prop]) {
                  all_match = false;
              }
            }

            if (all_match) {
              if (multiple) {
                match.push(obj)
              } else {
                match = obj;
                return true;
              }
            }
          });
          return match;
    };

    var u = {
      first: function() {
        return elements[0];
      },

      last: function() {
        return elements[elements.length - 1];
      },

      without: function(value) {
       var newArray = [],
           args = Array.prototype.slice.call(arguments);
       elements.forEach(function(el) {
        if (args.indexOf(el) === -1) {
          newArray.push(el);
        }
       });
       return newArray;
      },

      lastIndexOf: function(value) {
        var i = elements.length - 1,
            idx = -1;

        for (; i > -1; i--) {
          if (elements[i] === value) {
             idx = i;
             break;
          }
        }
        return idx;
      },

      sample: function(qty) {
        var sampled = [],
            copy = elements.slice(),
            get = function() {
              var idx =  Math.floor(Math.random() * copy.length),
                  el = copy[idx];
              copy.splice(idx, 1);
              return el;
            };

          if (!qty) { return  get(); }

          while (qty) {
            sampled.push(get());
            qty--
          }

          return sampled;

        },

        findWhere: function(props) {
          return findObjs(elements, props, false);
        },

        where: function(props) {
          return findObjs(elements, props, true);
        },

        pluck: function(key) {
          var result = [];
          elements.forEach(function(el) {
            if (el[key]) {
              result.push(el[key]);
            }
          });
          return result;
        }, // end of pluck

        keys: function() {

          return Object.keys(elements);
        },

        values: function() {
          var keys = Object.keys(elements),
              result = [];

          keys.forEach(function(key) {
            result.push(elements[key]);
          });

          return result;
        },

        pick: function(picked) {
          var newObj = {},
              args = Array.prototype.slice.call(arguments);
          

          args.forEach(function(key) {
            if (elements[key]) {
              newObj[key] = elements[key];
            }
          });


          return newObj
        },

        omit: function() {
          var newObj = {},
              args = Array.prototype.slice.call(arguments);
          

          args.forEach(function(key) {
            Object.keys(elements).forEach(function(prop) {
              if (prop === key) {
                return;
              } else {
                newObj[prop] = elements[prop];
              }
            });
          });


          return newObj
        },

        has: function(value) {
          if (elements[value]) {
            return true;
          }

          return false;
        },

      };


      (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
        u[method] = function() { _[method].call(u, element)}
      })

    return u;

  };

  _.range = function(start, stop) {
    var newArray = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    for (i = start; i < stop; i++) {
      newArray.push(i);
    }

    return newArray;
  };



  _.extend = function() {
    var args = Array.prototype.slice.call(arguments),
        i = 1,
        obj = args[0];
    
    for (; i < args.length; i++) {
      var props = args[i],
          prop;

      for (prop in props) {
        obj[prop] = props[prop];
      }
    }
    return obj;
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };

  _.isArray = Array.isArray || function(obj) {
      return toString.call(obj) === "[object Array]";
  };

  _.isObject = function(obj) {
    var type = typeof obj;

    return type === "function" || type === "object" && !!obj;
  };

  _.isFunction = function(obj) {
    var type = typeof obj;

    return type === "function";
  };

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]"; 
    }
  });

  window._ = _;
})();


