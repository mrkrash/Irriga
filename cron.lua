cron.schedule('30 5 * * 1', function(e) openGate(15, zoneLawn) end)
cron.schedule('30 5 * * 4', function(e) openGate(15, zoneLawn) end)
cron.schedule('0 14 * * 0', function(e) openGate(10, zonePlants) end)
