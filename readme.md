 # LTSV to Apache 
 Convert LTSV format access log to Apache log format.
 ## Format 
 Output:
 `%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i`

* Correspondence with LTSV labels

|  LTSV label  |  Apache Formart Param |
| ---- | ---- |
|  remote_addr |  %h |
|  time |  %t |
|request|%r|
|status|%>s|
|body_bytes_sent|%b|
|referer|%{Referer}i|
|useragent|%{User-Agent}i|
If you want to change the correspondence, you need to edit the `coverter function` in `app.js`

 ## Usage
1. Open `converter.html` in browser
1. Select a log file in ltsv format. Multiple selections are possible.
1. When the conversion is complete, the converted log file will be downloaded.