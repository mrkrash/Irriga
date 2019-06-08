-- @Author: Mario Ravalli
-- @Date:   2019-06-07 23:18:09
-- @Last Modified by:   Mario Ravalli
-- @Last Modified time: 2019-06-08 16:39:18

m = mqtt.Client("Irriga", 120, MQTT_USER, MQTT_PASS)
m:lwt("/lwt", "offline", 0, 0)

m:on("connect", function(client) print ("connected") end)
m:on("offline", function(client) print ("offline") end)

m:on("message", function(client, topic, data)
  print(topic .. ":" )
  if data ~= nil then
    print(data)
  end
end)

m:on("overflow", function(client, topic, data)
  print(topic .. " partial overflowed message: " .. data )
end)

m:connect(MQTT_SERVER, 1883, 0, function(client)
  print("connected")
  -- subscribe topic with qos = 0
  client:subscribe("/stat/prato/POWER", 0, function(client) print("subscribe success") end)
  client:subscribe("/stat/piante/POWER", 0, function(client) print("subscribe success") end)
  -- publish a message with data = hello, QoS = 0, retain = 0
  client:publish("/stat/prato/POWER", "hello", 0, 0, function(client) print("sent") end)
end,
function(client, reason)
  print("failed reason: " .. reason)
end)

m:close();
