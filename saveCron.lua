-- @Author: krash
-- @Date:   2018-08-06 19:39:13
-- @Last Modified by:   krash
-- @Last Modified time: 2018-08-06 19:52:29
if file.exists("settings.json") then
	cron.reset()
	file.open("settings.json", "r")
	local settings = sjson.decode(file.read())
	file.close()
	file.remove("cron.lua")
	if file.open("cron.lua", "w") then
		if settings['Luprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 1', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Maprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 2', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Meprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 3', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Giprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 4', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Veprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 5', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Saprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 6', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Doprato'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mprato'].." "..settings['Hprato'].." * * 0', function(e) openGate(" .. settings['Qprato'] .. ", zoneLawn) end)")
		end
		if settings['Lupiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 1', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Mapiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 2', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Mepiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 3', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Gipiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 4', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Vepiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 5', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Sapiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 6', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
		if settings['Dopiante'] ~= nil then
			file.writeline("cron.schedule('" .. settings['Mpiante'].." "..settings['Hpiante'].." * * 0', function(e) openGate(" .. settings['Qpiante'] .. ", zonePlants) end)")
		end
	end
	settings = nil
	file.close()
	collectgarbage()
	dofile("cron.lua")
end