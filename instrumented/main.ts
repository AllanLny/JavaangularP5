function cov_1suizrvo8y() {
  var path = "C:\\Users\\allan\\Documents\\1_OpenClassrooms\\JavaAngular\\P5\\Testez-une-application-full-stack-master\\front\\src\\main.ts";
  var hash = "fe99af0e4061576910495187bcce984184a6745a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\allan\\Documents\\1_OpenClassrooms\\JavaAngular\\P5\\Testez-une-application-full-stack-master\\front\\src\\main.ts",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 9,
          column: 1
        }
      },
      "1": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 8,
          column: 19
        }
      },
      "2": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 12,
          column: 36
        }
      },
      "3": {
        start: {
          line: 12,
          column: 16
        },
        end: {
          line: 12,
          column: 34
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 12,
            column: 9
          },
          end: {
            line: 12,
            column: 10
          }
        },
        loc: {
          start: {
            line: 12,
            column: 16
          },
          end: {
            line: 12,
            column: 34
          }
        },
        line: 12
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        }, {
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        }],
        line: 7
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "fe99af0e4061576910495187bcce984184a6745a"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1suizrvo8y = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1suizrvo8y();
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
cov_1suizrvo8y().s[0]++;

if (environment.production) {
  cov_1suizrvo8y().b[0][0]++;
  cov_1suizrvo8y().s[1]++;
  enableProdMode();
} else {
  cov_1suizrvo8y().b[0][1]++;
}

cov_1suizrvo8y().s[2]++;
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  cov_1suizrvo8y().f[0]++;
  cov_1suizrvo8y().s[3]++;
  return console.error(err);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJlbmFibGVQcm9kTW9kZSIsInBsYXRmb3JtQnJvd3NlckR5bmFtaWMiLCJBcHBNb2R1bGUiLCJlbnZpcm9ubWVudCIsInByb2R1Y3Rpb24iLCJib290c3RyYXBNb2R1bGUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW5hYmxlUHJvZE1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG5pZiAoZW52aXJvbm1lbnQucHJvZHVjdGlvbikge1xuICBlbmFibGVQcm9kTW9kZSgpO1xufVxuXG5wbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSlcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLGNBQVQsUUFBK0IsZUFBL0I7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxtQ0FBdkM7QUFFQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLFNBQVNDLFdBQVQsUUFBNEIsNEJBQTVCOzs7QUFFQSxJQUFJQSxXQUFXLENBQUNDLFVBQWhCLEVBQTRCO0VBQUE7RUFBQTtFQUMxQkosY0FBYztBQUNmLENBRkQ7RUFBQTtBQUFBOzs7QUFJQUMsc0JBQXNCLEdBQUdJLGVBQXpCLENBQXlDSCxTQUF6QyxFQUNHSSxLQURILENBQ1NDLEdBQUcsSUFBSTtFQUFBO0VBQUE7RUFBQSxPQUFBQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZDtBQUFrQixDQURsQyJ9