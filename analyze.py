#path = "C:/Users/M543015/Desktop/GitHub/coralbleaching/"
path = "C:/Users/Glenn Wright/Documents/GitHub/coralbleaching/"
file = "series.txt"
with open(path+file) as f:
	lines = [float(line.strip()) for line in f]

consec = [lines[0]]
i = 0
#calculate the maximum temperature of the past two consecutive months
for line in lines[1:]:
	i+=1
	if (line>lines[i-1]):
		consec.append(lines[i-1])
	else:
		consec.append(line)


months = [[] for i in range(12)]
m = 0
for line in lines:
	months[m].append(line)
	m = (m+1)%12

averages = [sum(month)/len(month) for month in months]


years = []
year = []
m=0
for line in consec:
	year.append(line)
	if m==11:
		years.append(max(year))
		year = []
	m = (m+1)%12

