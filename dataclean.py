
from netCDF4 import Dataset
path = "C:/Users/M543015/Desktop/GitHub/coralbleaching/"
#file = "sst.mon.mean.nc"
file = "sst.mnmean.nc"
infile = Dataset(path+file,'r')
import numpy as np
sst = np.array(infile.variables['sst'][:])
#lat goes from -89.5 to 89.5
#lon goes from 0.5 to 359.5
#time is days since 1891-1-1 (0-46294, 1522 obs)
#sst is from -5 to 40 (1522, 180, 360)
#1e20 is missing
#18° S, 148° E

infile.variables["sst"][:,27:28, 147:148]



from netCDF4 import Dataset, num2date, date2num
import matplotlib
import matplotlib.pyplot as plt

def readnetcdf(rfile,inbounds=False):
    infile=Dataset(rfile,'r')
    if np.any(inbounds!=False):
        outrain=np.array(infile.variables['rainrate'][:,inbounds[3]:inbounds[2]+1,inbounds[0]:inbounds[1]+1])
        outlatitude=np.array(infile.variables['latitude'][inbounds[3]:inbounds[2]+1])
        outlongitude=np.array(infile.variables['longitude'][inbounds[0]:inbounds[1]+1])         
    else:
        outrain=np.array(infile.variables['rainrate'][:])
        outlatitude=np.array(infile.variables['latitude'][:])
        outlongitude=np.array(infile.variables['longitude'][:])
    outtime=np.array(infile.variables['time'][:],dtype='datetime64[m]')
    infile.close()
    return outrain,outtime,outlatitude,outlongitude
    



rainfall,time,lat,lon=readnetcdf('ST4.20170828.newregridded.nc')