#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Dec  3 14:56:31 2017

@author: daniel
"""

import numpy as np
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

rainfall[rainfall<0]=np.nan
rainfalltotal=np.sum(rainfall,axis=0)
plt.imshow(rainfalltotal)