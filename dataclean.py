
from netCDF4 import Dataset
path = "C:/Users/M543015/Desktop/GitHub/coralbleaching/"
#file = "sst.mon.mean.nc"
#file = "sst.mnmean.nc"
file = "cortadv5_TSA.nc" #1982-2013
infile = Dataset(path+file,'r')
import numpy as np
sst = np.array(infile.variables['sst'][:])
#lat goes from -89.5 to 89.5
#lon goes from 0.5 to 359.5
#time is days since 1891-1-1 (0-46294, 1522 obs)
#that's wrong, I think...days since 1800, and the lowest is 54?
#sst is from -5 to 40 (1522, 180, 360)
#1e20 is missing
#18° S, 148° E


# Galapagos	Bassa Point E		-0.8167	-89.5333	1983
# Galapagos	Bassa Point W		-0.8167	-89.5333
# Galapagos	Onslow				-1.2333	-90.4333
# Galapagos	Punta Pitt			-0.7167	-89.2333
# Jamaica	Discovery bay		18.4794	-77.3287	1987
# French Polynesia	Faaa		-17.5413	-149.6193	1994
# Mexico	San Miguel de Ruiz, Pez Maya, Reserva de la Biosfera de Sian Ka'an		19.9683	-87.4517	2005
# Australia	Keppel Islands		-23.188	150.91	2006


coords = [
	(-0.8167, -89.5333),
	(18.4794, -77.3287),
	(-17.5413, -149.6193),
	(19.9683, -87.4517),
	(-23.188, 150.91)
]

lat = infile.variables["lat"][:].tolist()[::-1]
lon = infile.variables["lon"][:].tolist()

extracts = []

for a in range(len(lat)-1):
	for o in range(len(lon)-1):
		for coord in coords:
			if lat[a] < coord[0] < lat[a+1] and lon[o] < coord[1] < lon[o+1]:
				extracts.append((a,o))

outfile = "series"

for i in range(len(extracts)):
	dhw = infile.variables["TSA_DHW"][:,extracts[i][0],extracts[i][1]]
	dhw = [str(s)+"\n" for s in dhw]
	with open(path+outfile+str(i)+".txt",'w') as f:
		f.writelines(dhw)

time = infile.variables["time"][:]
time = [str(s)+"\n" for s in time]

outfile = "time.txt"
with open(path+outfile,'w') as f:
	f.writelines(time)



# LEVEL	SEVERITY
# -1	% unknown
# 0	No bleaching
# 1	Mild (1-10% bleaching)
# 2	Moderate (11-50% bleached)
# 3	Severe (>50% bleached)
