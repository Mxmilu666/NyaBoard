//加载动画
window.addEventListener('load', function() {
  setTimeout(function() {
    // 让页面内容开始淡入
    var pageContent = document.getElementById('cards');
    pageContent.style.opacity = '1';

    // 隐藏加载指示器
    var spinnerContainer = document.getElementById('spinner-container');
    spinnerContainer.style.display = 'none';
  }, 1000); // 等待1500毫秒后执行这两个操作
});

var lightTheme = 'westeros';
var darkTheme = 'westerosdark';

var hoursrequests, hoursflows, monthsrequests, monthsflows;
var hroptions = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var param = params[0];
      return `<div style="color:${param.color};"><b>${param.name}</b></div>` + '小时请求数: ' + param.value + ' 次';
    }
  },
  xAxis: {
    type: 'category',
    data: ['12时', '13时', '14时', '15时', '16时', '17时', '18时']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

var hfoptions = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var param = params[0];
      return `<div style="color:${param.color};"><b>${param.name}</b></div>` + '小时流量: ' + param.value + ' MB';
    }
  },
  xAxis: {
    type: 'category',
    data: ['12时', '13时', '14时', '15时', '16时', '17时', '18时']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [150, 230, 224, 218, 135, 147, 260],
    type: 'line'
  }]
};

var mroptions = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var param = params[0];
      return `<div style="color:${param.color};"><b>${param.name}</b></div>` + '小时流量: ' + param.value + ' MB';
    }
  },
  xAxis: {
    type: 'category',
    data: ['12时', '13时', '14时', '15时', '16时', '17时', '18时']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

var mfoptions = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var param = params[0];
      return `<div style="color:${param.color};"><b>${param.name}</b></div>` + '小时流量: ' + param.value + ' MB';
    }
  },
  xAxis: {
    type: 'category',
    data: ['12时', '13时', '14时', '15时', '16时', '17时', '18时']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [150, 230, 224, 218, 135, 147, 260],
    type: 'line'
  }]
};

function initCharts(theme) {
  if (hoursrequests) {
    hoursrequests.dispose();
  }
  if (hoursflows) {
    hoursflows.dispose();
  }
  if (monthsrequests) {
    monthsrequests.dispose();
  }
  if (monthsflows) {
    monthsflows.dispose();
  }
  hoursrequests = echarts.init(document.getElementById('hoursrequests'), theme);
  hoursflows = echarts.init(document.getElementById('hoursflows'), theme);
  monthsrequests = echarts.init(document.getElementById('monthsrequests'), theme);
  monthsflows = echarts.init(document.getElementById('monthsflows'), theme);

  hoursrequests.setOption(hroptions);
  hoursflows.setOption(hfoptions);
  monthsrequests.setOption(mroptions);
  monthsflows.setOption(mfoptions);
}

if (localStorage.darkTheme === undefined) {
  localStorage.darkTheme = 'false';
}

// 检测浏览器颜色方案
var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// 设置初始主题
if (localStorage.darkTheme === undefined) {
  localStorage.darkTheme = prefersDarkScheme.matches ? 'true' : 'false';
}

// 初始化折线图
initCharts(localStorage.darkTheme === 'true' ? darkTheme : lightTheme);

// 如果存在localStorage.darkTheme并且为true，则在所有希望保留深色主题的页面中保持深色主题
if (localStorage.darkTheme === 'true') {
  document.body.classList.add("mdui-theme-layout-dark");
}

// 切换主题按钮的点击事件处理器
document.getElementById("switch-theme").addEventListener("click", () => {
  document.body.classList.toggle("mdui-theme-layout-dark");
  var isDark = document.body.classList.contains("mdui-theme-layout-dark");

  if (isDark) {
    localStorage.darkTheme = 'true';
    initCharts(darkTheme);
  } else {
    localStorage.darkTheme = 'false';
    initCharts(lightTheme);
  }
});

// 监听颜色方案的变化
prefersDarkScheme.addEventListener("change", (e) => {
  if (e.matches) {
    // 切换到深色模式
    document.body.classList.add("mdui-theme-layout-dark");
    localStorage.darkTheme = 'true';
    initCharts(darkTheme);
  } else {
    // 切换到浅色模式
    document.body.classList.remove("mdui-theme-layout-dark");
    localStorage.darkTheme = 'false';
    initCharts(lightTheme);
  }
});


document.addEventListener('DOMContentLoaded', function() {
 equalizeRowCardHeights();
  updatetype()
  updatestatus()
  updateinfo()
  setInterval(updatestatus, 1000);
  setInterval(updateinfo, 2000);
  window.addEventListener('resize', equalizeRowCardHeights); // 窗口大小变化时重新调整
});

function resizecharts() {
    hoursrequests.resize();
    hoursflows.resize();
    monthsrequests.resize();
    monthsflows.resize();
}


function equalizeRowCardHeights() {
  // 选择所有的卡片元素
  var cards = document.querySelectorAll('.mdui-card');
  // 遍历卡片元素，移除内联的高度样式
  cards.forEach(function(card) {
    card.style.height = ''; // 清除内联高度样式
  });


  const rows = document.querySelectorAll('.mdui-row.mdui-row-flex');
  rows.forEach(row => {
    let maxHeightInRow = 0;
    // 获取当前行内的所有卡片高度
    const cardsInRow = row.querySelectorAll('.mdui-card');
    cardsInRow.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeightInRow) {
        maxHeightInRow = cardHeight;
      }
    });

    // 设置当前行内所有卡片的高度为最大高度
    cardsInRow.forEach(card => {
      card.style.height = `${maxHeightInRow}px`;
    });
  });

  resizecharts();
}

var drawer = new mdui.Drawer('#drawer');
drawer.$element.on('opened.mdui.drawer closed.mdui.drawer', function() {
  resizecharts();
});


function startTime(timestamp) {
        //window.setTimeout(function() { startTime(timestamp); }, 1000);
        var currentTime = Date.now(); // 获取当前时间的毫秒数
        var diff = currentTime - timestamp; // 计算时间差（毫秒）
        var days = Math.floor(diff / (1000 * 60 * 60 * 24)); // 转换为天数
        diff -= days * 1000 * 60 * 60 * 24;
        var hours = Math.floor(diff / (1000 * 60 * 60)); // 剩余转为小时
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / (1000 * 60)); // 剩余转为分钟
        diff -= minutes * 1000 * 60;
        var seconds = Math.floor(diff / 1000); // 剩余转为秒
        document.getElementById("time").innerHTML = `${String(days).padStart(2, '0')} 天 ${String(hours).padStart(2, '0')} 小时 ${String(minutes).padStart(2, '0')} 分钟 ${String(seconds).padStart(2, '0')} 秒`;
}

function updatetype() {
  // 使用fetch从/api/cluster/type获取数据
  fetch('/api/cluster/type')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // 解析JSON响应
      })
      .then(data => {
          // 更新版本信息的逻辑
          document.getElementById("version").innerHTML = `${data.type} ${data.version}-${data.openbmclapiVersion}`;
      })
      .catch(error => {
          console.error('Error fetching or updating version info:', error);
      });
  equalizeRowCardHeights();
}

function updatestatus() {
  fetch('/api/cluster/status')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // 解析JSON响应
      })
      .then(data => {
          startTime(data.clusterStatus.uptime * 1000);
          if (data.clusterStatus.isSynchronized) {
            document.getElementById("info").innerHTML = `正在同步文件`;
          } else if (!data.clusterStatus.isEnabled) {
            document.getElementById("info").innerHTML = `正在启用节点`;
          } else {
            document.getElementById("info").innerHTML = `正常运行`;
          }
          //document.getElementById("version").innerHTML = `${data.type} ${data.version}-${data.openbmclapiVersion}`;
      })
      .catch(error => {
          console.error('Error fetching or updating version info:', error);
      });
  equalizeRowCardHeights();
}

function updateinfo() {
  fetch('/api/cluster/info')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // 解析JSON响应
    })
    .then(data => {
      // 更新小时请求和流量数据
      const hoursflowsData = data.data.hours.map(item => ({
        name: new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: false }), // 转换时间戳为小时格式
        value: item.bytes // 请求次数
      }));

      const hoursrequestData = data.data.hours.map(item => ({
        name: new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: false }), // 转换时间戳为小时格式
        value: item.hits // 请求次数
      }));

      // 仅更新小时请求图表的数据部分
      hoursrequests.setOption({
        series: [{ // 假设只有一个系列需要更新，如果有多个，需相应调整
          data: hoursrequestData.map(item => item.value)
        }],
        xAxis: {
          data: hoursrequestData.map(item => item.name)
        }
      }); // 第二个参数为true表示不合并图形配置

      hoursflows.setOption({
        series: [{ // 假设只有一个系列需要更新，如果有多个，需相应调整
          data: hoursflowsData.map(item => item.value)
        }],
        xAxis: {
          data: hoursflowsData.map(item => item.name)
        }
      }); // 第二个参数为true表示不合并图形配置

    })
    .catch(error => {
      console.error('Error fetching or updating info:', error);
    });
  equalizeRowCardHeights();
}