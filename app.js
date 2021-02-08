function coverter(logdata_line) {
  let result = "";
  for (const line of logdata_line) {
    let result_line = format;
    const items = line.split("	");
    for (const item of items) {
      let key_value = item.replace(/\:/, "&").split("&");
      switch (key_value[0]) {
        case "remote_addr":
          result_line = result_line.replace("%h", key_value[1]);
          break;
        case "time":
          let date = new Date(key_value[1]);
          result_line = result_line.replace("%t", dateFormatApache(date));
          break;
        case "request":
          result_line = result_line.replace("%r", key_value[1]);
          break;
        case "status":
          result_line = result_line.replace("%>s", key_value[1]);
          break;
        case "body_bytes_sent":
          result_line = result_line.replace("%b", key_value[1]);
          break;
        case "referer":
          result_line = result_line.replace("%{Referer}i", key_value[1]);
          break;
        case "useragent":
          result_line = result_line.replace("%{User-Agent}i", key_value[1]);
          break;
      }
    }
    result_line = result_line.replace("%l", "-");
    result_line = result_line.replace("%u", "-");
    result += result_line + "\n";
  }
  return result;
}

function dateFormatApache(d) {
  var y = d.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var dd = ("00" + d.getDate()).slice(-2);
  var hh = ("00" + d.getHours()).slice(-2);
  var mm = ("00" + d.getMinutes()).slice(-2);
  var ss = ("00" + d.getSeconds()).slice(-2);
  return (
    "[" +
    dd +
    "/" +
    monthNames[d.getMonth()] +
    "/" +
    y +
    ":" +
    hh +
    ":" +
    mm +
    ":" +
    ss +
    "]"
  );
}
var file_selector = document.getElementById("logfile");
const format = '%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"';
file_selector.addEventListener(
  "change",
  function (evt) {
    var file = evt.target.files;
    var num = file.length;
    for (var i = 0; i < num; i++) {
      const reader = new FileReader();
      reader.name = file[i].name;
      reader.onload = () => {
        let logdata = reader.result;
        console.log(logdata);
        const logdata_line = logdata.split("\n");
        let result = coverter(logdata_line);
        const blob = new Blob([result], { type: "text/plain" });
        const a = document.createElement("a");
        a.download = "ltsv2apache_" + reader.name;
        a.href = window.URL.createObjectURL(blob);
        a.click();
        a.remove();
      };

      reader.readAsText(file[i]);
    }
  },
  false
);
