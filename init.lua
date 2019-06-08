-- @Author: krash
-- @Date:   2018-04-28 12:26:40
-- @Last Modified by:   Mario Ravalli
-- @Last Modified time: 2019-06-08 16:37:56

-- load credentials, 'SSID' and 'PASSWORD' declared and initialize in there
dofile("credentials.lua")
dofile("email.lua")
multiplyer = 60000
zoneLawn = 6
zonePlants = 7

function openGate(amount, zone)
  tmr.stop(0)
  gpio.write(zone, gpio.HIGH)
  local duration = amount * multiplyer
  tmr.alarm(0, duration, 0, function() 
    gpio.write(zone, gpio.LOW)
    send_email('Irriga funge', 'Ho dato acqua al settore ' .. zone .. ' per ' .. amount .. ' minuti')
    end)
end

function startup()
    if file.open("init.lua") == nil then
        print("init.lua deleted or renamed")
    else
        print("Running")
        file.close("init.lua")
        send_email('Irriga Running', 'Irriga started with success')

        gpio.mode(zoneLawn, gpio.OUTPUT)
        gpio.write(zoneLawn, gpio.LOW)
        gpio.mode(zonePlants, gpio.OUTPUT)
        gpio.write(zonePlants, gpio.LOW)

        sntp.sync({"ntp1.inrim.it", "ntp2.inrim.it"}, function(sec, usec, server, info)
            print('sync', sec, usec, server)
          end,
          function()
           print('sync failed!')
          end,
          1
        )
        collectgarbage()

        tmr.register(6, 6870947, tmr.ALARM_AUTO, function() sntp.sync({"ntp1.inrim.it", "ntp2.inrim.it"}) end)
        mdns.register(MDNS, { description="Irriga System", service="http", port=80, location='Veranda' })

        if file.exists("cron.lua") then
          dofile("cron.lua")
        end
        collectgarbage()
        if file.exists("serverJson.lua") then
          dofile("serverJson.lua")
        end
        collectgarbage()
        if file.exists("mqtt.lua") then
          dofile("mqtt.lua")
        end
        collectgarbage()
    end
end

-- Define WiFi station event callbacks 
wifi_connect_event = function(T) 
  print("Connection to AP("..T.SSID..") established!")
  print("Waiting for IP address...")
  if disconnect_ct ~= nil then disconnect_ct = nil end  
end

wifi_got_ip_event = function(T) 
  -- Note: Having an IP address does not mean there is internet access!
  -- Internet connectivity can be determined with net.dns.resolve().    
  print("Wifi connection is ready! IP address is: "..T.IP)
  print("Startup will resume momentarily, you have 3 seconds to abort.")
  print("Waiting...") 
  tmr.create():alarm(3000, tmr.ALARM_SINGLE, startup)
end

wifi_disconnect_event = function(T)
  if T.reason == wifi.eventmon.reason.ASSOC_LEAVE then 
    --the station has disassociated from a previously connected AP
    return 
  end
  -- total_tries: how many times the station will attempt to connect to the AP. Should consider AP reboot duration.
  local total_tries = 75
  print("\nWiFi connection to AP("..T.SSID..") has failed!")

  --There are many possible disconnect reasons, the following iterates through 
  --the list and returns the string corresponding to the disconnect reason.
  for key,val in pairs(wifi.eventmon.reason) do
    if val == T.reason then
      print("Disconnect reason: "..val.."("..key..")")
      break
    end
  end

  if disconnect_ct == nil then 
    disconnect_ct = 1 
  else
    disconnect_ct = disconnect_ct + 1 
  end
  if disconnect_ct < total_tries then 
    print("Retrying connection...(attempt "..(disconnect_ct+1).." of "..total_tries..")")
  else
    wifi.sta.disconnect()
    print("Aborting connection to AP!")
    disconnect_ct = nil  
  end
end

-- Register WiFi Station event callbacks
wifi.eventmon.register(wifi.eventmon.STA_CONNECTED, wifi_connect_event)
wifi.eventmon.register(wifi.eventmon.STA_GOT_IP, wifi_got_ip_event)
wifi.eventmon.register(wifi.eventmon.STA_DISCONNECTED, wifi_disconnect_event)

print("Connecting to WiFi access point...")
wifi.setmode(wifi.STATION)
wifi.sta.config({ssid=SSID, pwd=PASSWORD})
-- wifi.sta.connect() not necessary because config() uses auto-connect=true by default