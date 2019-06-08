-- @Author: krash
-- @Date:   2018-04-28 15:49:40
-- @Last Modified by:   krash
-- @Last Modified time: 2018-08-06 19:47:01

HTTP_HEADERS = "Server: Irriga Webserver\r\n"..
"Connection: close\r\n"..
"Access-Control-Allow-Origin: *\r\n"
chunkIndex = 0
tgtfile = nil

srv=net.createServer(net.TCP)
print("Running HTTP Server")

local function uri_decode(input)
  return input:gsub("%+", " "):gsub("%%(%x%x)", hex_to_char)
end

srv:listen(80,function(sock)
	sock:on("receive", function(conn,request)
		local buf = ""
		local _, _, method, path, vars = string.find(request, "([A-Z]+) (.+)%?(.-) HTTP")

		if(method == nil)then _, _, method, path = string.find(request, "([A-Z]+) (.+) HTTP") end
		if (method == 'POST') then
			local bodyStart = request:find("\r\n\r\n", 1, true)
	        local body = request:sub(bodyStart, #request)
	        request = nil
			collectgarbage()
		    local post = {}
		    --print("Parsing Form Data")
		    for kv in body.gmatch(body, "%s*&?([^=]+=[^&]+)") do
				local key, value = string.match(kv, "(.*)=(.*)")
				print("Parsed: " .. key .. " => " .. value)
				post[key] = value
		    end
			print(sjson.encode(post))
			file.remove("settings.json")
			if file.open("settings.json", "w") then
				file.writeline(sjson.encode(post))
				file.close()
				dofile("saveCron.lua")
			end
		end
		if (path == '/') then
			tgtfile = "index.html"
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: text/html\r\n\r\n")
		elseif (path == "/favicon.png") then
			tgtfile = "favicon.png"
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: image/png\r\n\r\n")
		elseif (path == "/script.js") then
			tgtfile = "script.js"
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: text/javascript\r\n\r\n")
		elseif (path == "/settings.json") then
			tgtfile = "settings.json"
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: application/json\r\n\r\n")
		elseif (path == "/status") then
			tgtfile = "noFile"
			local status = {}
			status['prato'] = gpio.read(6)
			status['piante'] = gpio.read(7)
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: application/json\r\n\r\n" .. sjson.encode(status))
		elseif (path == "/tgprato") then
			tgtfile = "noFile"
			if (gpio.read(zoneLawn) == 1) then
				gpio.write(zoneLawn, gpio.LOW)
			else
				gpio.write(zoneLawn, gpio.HIGH)
			end
			local status = {}
			status['prato'] = gpio.read(zoneLawn)
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: application/json\r\n\r\n" .. sjson.encode(status))
		elseif (path == "/tgpiante") then
			tgtfile = "noFile"
			if (gpio.read(zonePlants) == 1) then
				gpio.write(zonePlants, gpio.LOW)
			else
				gpio.write(zonePlants, gpio.HIGH)
			end
			local status = {}
			status['piante'] = gpio.read(zonePlants)
			conn:send("HTTP/1.1 200 OK\r\n"..HTTP_HEADERS.."Content-Type: application/json\r\n\r\n" .. sjson.encode(status))
		end
		collectgarbage()
	end)

	sock:on("sent", function(conn)
		if file.exists(tgtfile) then 
			file.open(tgtfile, "r")
			file.seek("set", chunkIndex)
			local chunk = file.read(CHUNK_SIZE)
			file.close()
			if chunk then
				chunkIndex = chunkIndex + string.len(chunk)
				conn:send(chunk)
			else
				chunkIndex = 0
				conn:close()
			end
		else
			conn:close()
		end
		collectgarbage()
	end)
end)