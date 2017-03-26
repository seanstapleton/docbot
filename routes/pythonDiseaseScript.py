
# coding: utf-8

import operator
import urllib.request
import sys, json, numpy as np
text = urllib.request.urlopen('http://www.nature.com/article-assets/npg/ncomms/2014/140626/ncomms5212/extref/ncomms5212-s4.txt').read().decode()

# In[6]:

list1 = text.split('\n')


# In[7]:

newarray = []
for l in list1:
    arr = l.split('\t')
    newarray.append(arr)


# In[50]:

set(list(x[0] for x in newarray))


dic = {}

for row in newarray[1:]:
    if len(row) >= 4:
        sym = row[0]
        disease = row[1]
        weight = row[3]
        if sym in dic:
            dic[sym].append([disease,float(weight)])
        else:
            dic[sym] = []
            dic[sym].append([disease,float(weight)])


# sorted(dic['Pain'], key=lambda x: x[1], reverse=True)

# In[76]:

def diseaseFinder(symptoms):
    diseases = {}
    for symptom in symptoms:
        l = dic[symptom]
        for item,weight in l:
            if item in diseases:
                diseases[item] += weight
            else:
                diseases[item] = weight
    return diseases

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


# In[77]:
lines = read_in()
np_lines = np.array(lines)

d = diseaseFinder(np_lines)


# In[78]:

sorted_d = sorted(d.items(), key=operator.itemgetter(1),reverse=True)


# In[85]:

print [x[0] for x in sorted_d[:10]]







