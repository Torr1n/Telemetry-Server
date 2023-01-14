let clickedImpositions = [];

let getQueryParams = () => {
  return new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
}

let getInitialData = async (runId) => {
  let response = await fetch(`/api/v1/download?runId=${runId}`);
  return await response.json();
}

let rawData = "";

let headers = [];

let data = {};

let addData = (dataRows) => {
  for (let i = 0; i < dataRows.length; i++) {
    let currentRow = dataRows[i];
    for (let j = 0; j < currentRow.split(",").length; j++) {
      data[headers[j]].push(parseFloat(currentRow.split(",")[j]));
    }
  }
}

let run = async () => {
  let runId = getQueryParams().runId;

  let initialData = await getInitialData(runId);
  rawData += initialData.data.data.join("");
  rawData = rawData.trim();
  let splitData = rawData.split("\n");
  headers = splitData[0].split(",");

  for (let i = 0; i < headers.length; i++) {
    data[headers[i]] = [];
  }

  splitData.shift();

  addData(splitData);

  const socket = io("localhost:3000");
  socket.on(runId, function(data) {
    rawData += data;
    data = data.trim();
    addData(data.split("\n"));
  });

  setInterval(() => {
    clearGraphs();
    requestDataAndUpdateGraphs();
  }, 100);
}

run();

let clearGraphs = () => {
  let charts = document.getElementById("charts");
  charts.innerHTML = "";
}

let requestDataAndUpdateGraphs = () => {
  
  Object.keys(data).forEach(key => {
    if (key != "time") {
      makeChart(key, data["time"], data[key]);
    }
  })
}


let apply = () => {
  let filters = document.getElementById("filters");
  let alarms = document.getElementById("alarms");
  let impositions = document.getElementById("impositions");
  
  let params = {
    filters: filters.value,
    alarms: alarms.value,
    impositions: impositions.value,
    range: "relative"
  }
  
  let queryString = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');

  console.log(queryString);
}

let makeChart = (metric, xAxis, yAxis) => {
  let canvasWrapper = document.createElement("div");
  canvasWrapper.addEventListener("contextmenu", (e) => {
    showContextMenu(metric, e.clientX, e.clientY);
    e.preventDefault();
  });

  canvasWrapper.addEventListener("click", (e) => {
    clickedImpositions.push(metric);
    clickedImpositions = [...new Set(clickedImpositions)];
  });

  let canvas = document.createElement("canvas");
  let charts = document.getElementById("charts");

  canvasWrapper.appendChild(canvas);
  charts.appendChild(canvasWrapper);

  let combinedData = [];
  for (let i = 0; i < yAxis.length; i++) {
    combinedData.push({x: xAxis[i], y: yAxis[i]})
  }

  new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [{
          label: metric,
          data: combinedData
        }]
      },
      options: {
        showLine: true,
        animation: false,
        elements: {
          line: {
            width: 1
          },
          point:{
              radius: 0
          }
        }
      }
    });    
}


let showContextMenu = (metric, x, y) => {

  let contextMenu = document.createElement("div");

  let filter = document.createElement("div");
  let alarm = document.createElement("div");
  let impose = document.createElement("div");

  filter.innerHTML = "Filter";
  alarm.innerHTML = "Alarm";
  impose.innerHTML = "Impose";

  filter.addEventListener("click", (e) => {
    addFilter(metric);
  });
  alarm.addEventListener("click", (e) => {
    addAlarm(metric);
  })
  impose.addEventListener("click", (e) => {
    addImpose(metric);
  })

  contextMenu.id = "context-menu";

  contextMenu.appendChild(filter);
  contextMenu.appendChild(alarm);
  contextMenu.appendChild(impose);

  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;

  document.body.appendChild(contextMenu);

  document.body.addEventListener("click", (e) => {
    document.body.removeChild(contextMenu);
  }, {once: true});
}


let addFilter = (metric) => {
  let filters = document.getElementById("filters");
  let currentVal = filters.value;
  let jsonVal;
  try {
    jsonVal = JSON.parse(currentVal);
    jsonVal.push(metric);
  } catch {
    // string is empty
    jsonVal = [metric];
  }
  // removes duplicates
  jsonVal = [...new Set(jsonVal)];
  filters.value = JSON.stringify(jsonVal);
}


let addAlarm = (metric) => {

  let backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  document.body.appendChild(backdrop);

  let alarm = document.createElement("div");
  alarm.id = "add-alarm";

  let metricBox = document.createElement("input");
  let threshholdBox = document.createElement("input");
  let create = document.createElement("div");
  create.innerHTML = "CREATE";

  alarm.appendChild(metricBox);
  alarm.appendChild(threshholdBox);
  alarm.appendChild(create);

  document.body.appendChild(alarm);

  metricBox.value = metric;
  metricBox.placeholder = "Metric to monitor and alarm on";
  threshholdBox.placeholder = "Metric alarm threshold (pure number)";

  threshholdBox.select();

  threshholdBox.addEventListener("keypress", (e) => {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter') {
      createAlarm(metricBox.value, threshholdBox.value);
      document.body.removeChild(backdrop);
      document.body.removeChild(alarm);
      return false;
    }
  });

  create.addEventListener("click", (e) => {
    createAlarm(metricBox.value, threshholdBox.value);
    document.body.removeChild(backdrop);
    document.body.removeChild(alarm);
  }, {once: true});

  backdrop.addEventListener("click", (e) => {
    document.body.removeChild(backdrop);
    document.body.removeChild(alarm);
  }, {once: true});
}


let createAlarm = (metric, threshold) => {
  let alarms = document.getElementById("alarms");
  let currentVal = alarms.value;
  let jsonVal;
  try {
    jsonVal = JSON.parse(currentVal);
    jsonVal.push({metric, threshold});
  } catch {
    // string is empty
    jsonVal = [{metric, threshold}];
  }
  alarms.value = JSON.stringify(jsonVal);
}


let addImpose = (metric) => {
  clickedImpositions = [];

  clickedImpositions.push(metric);

  let done = document.createElement("div");
  done.innerHTML = "DONE";
  done.className = "done-impose";
  document.body.appendChild(done);

  done.addEventListener("click", (e) => {
    if (clickedImpositions.length == 0 || clickedImpositions.length == 1) {
      // do nothing
    } else {
      console.log(clickedImpositions);
      let impositions = document.getElementById("impositions");
      let currentVal = impositions.value;
      let jsonVal;
      try {
        jsonVal = JSON.parse(currentVal);
        jsonVal.push(clickedImpositions);
      } catch {
        // string is empty
        jsonVal = [clickedImpositions];
      }
      impositions.value = JSON.stringify(jsonVal);
    }
    document.body.removeChild(done);
  });
}
