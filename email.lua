-- @Author: krash
-- @Date:   2018-08-06 10:32:38
-- @Last Modified by:   krash
-- @Last Modified time: 2018-08-06 11:13:57

email_subject = ""
email_body = ""
count = 0

smtp_socket = nil

function display(sck,response)
  print(response)
end

function do_next()
  if(count == 0)then
    count = count+1
    local IP_ADDRESS = wifi.sta.getip()
    smtp_socket:send("HELO "..IP_ADDRESS.."\r\n")
  elseif(count==1) then
    count = count+1
    smtp_socket:send("AUTH LOGIN\r\n")
  elseif(count == 2) then
    count = count + 1
    smtp_socket:send(MY_EMAIL_B64.."\r\n")
  elseif(count == 3) then
    count = count + 1
    smtp_socket:send(EMAIL_PASSWORD_B64.."\r\n")
  elseif(count==4) then
    count = count+1
    smtp_socket:send("MAIL FROM:<" .. MY_EMAIL .. ">\r\n")
  elseif(count==5) then
    count = count+1
    smtp_socket:send("RCPT TO:<" .. MAIL_TO ..">\r\n")
  elseif(count==6) then
    count = count+1
    smtp_socket:send("DATA\r\n")
  elseif(count==7) then
    count = count+1
    local message = string.gsub(
      "From: \"".. MY_EMAIL .."\"<"..MY_EMAIL..">\r\n" ..
              "To: \"".. MAIL_TO .. "\"<".. MAIL_TO..">\r\n"..
              "Subject: ".. email_subject .. "\r\n\r\n"  ..
              email_body,"\r\n.\r\n","")

    smtp_socket:send(message.."\r\n.\r\n")
  elseif(count==8) then
    count = count+1
    tmr.stop(0)
    smtp_socket:send("QUIT\r\n")
  else
    smtp_socket:close()
  end
end

function connected(sck)
  tmr.alarm(0,3000,1,do_next)
end

function send_email(subject,body)
  count = 0
  email_subject = subject
  email_body = body
  smtp_socket = net.createConnection(net.TCP,0)
  smtp_socket:on("connection",connected)
  smtp_socket:on("receive",display)
  smtp_socket:connect(SMTP_PORT,SMTP_SERVER)
end