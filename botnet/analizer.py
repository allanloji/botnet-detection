import pandas as pd
import requests
import json
import pyrebase
import datetime

config = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "storageBucket": "",
}

def detectBadIp(rec):
    ips = pd.read_csv('ip_database.csv')
    coincide = ips['ip'].isin(rec['destination_IP'])
    nuevoDF = coincide.to_frame()
    nuevoDF['index1'] = nuevoDF.index
    nuevoDF = nuevoDF[nuevoDF['ip'] == True]
    nuevoDF = ips.ix[nuevoDF['index1']]['ip']
    return rec.loc[rec['destination_IP'].isin(nuevoDF)]['destination_IP'].value_counts()

def detectBadPorts(rec):
    coincide = rec['destination_Port'].isin(["6667", "25", "1080", "21801","21802","21803", "21804", "21805", "21805", "139", "12474", "123", "137", "138", "1034", "1035", "7871", "8705", "19013", "40519" ,"445", "135","903","1025","1433","2745","3127","3306","3410","5000","6129"])
    nuevoDF = coincide.to_frame()
    nuevoDF['index1'] = nuevoDF.index
    nuevoDF = nuevoDF[nuevoDF['destination_Port'] == True]
    dataframe = rec.ix[nuevoDF['index1']]
    counted_dataframe = {}
    indices=[]
    for index, values in dataframe.iterrows():
        if values['destination_IP'] in counted_dataframe:
            counted_dataframe[values['destination_IP']] += 1
            if counted_dataframe[values['destination_IP']]>1:
                indices.append(index)
        else:
            counted_dataframe[values['destination_IP']] = 1
            
    posBots = []
    for key, values in counted_dataframe.items():
        if values > 1 :
            posBots.append(str(key))
    return rec.loc[rec['destination_IP'].isin(posBots)]['destination_IP'].value_counts()

def detectErrors(rec):
    coincide = rec['destination_MAC'].isin(['000000000000'])
    nuevoDF = coincide.to_frame()
    nuevoDF['index1']= nuevoDF.index
    nuevoDF = nuevoDF[nuevoDF['destination_MAC'] == True]
    dataframe = rec.ix[nuevoDF['index1']]
    counted_dataframe={}
    indices=[]
    for index, values in dataframe.iterrows():
        if values['destination_IP'] in counted_dataframe:
            counted_dataframe[values['destination_IP']] += 1
            if counted_dataframe[values['destination_IP']]>1:
                indices.append(index)
        else:
            counted_dataframe[values['destination_IP']] = 1
    posBots = []        
    for key, values in counted_dataframe.items():
        #Change value to number of desire repeats for botnet
        if values >= 1 :
            posBots.append(str(key))
    return rec.loc[rec['destination_IP'].isin(posBots)]['destination_IP'].value_counts()

def detectMultipleCon(rec):
    count =rec['destination_IP'].value_counts()
    return count[count>100]

def getIpInfo(ip):
    ip_requests = 'http://ip-api.com/json/' + str(ip) 
    response = ''
    try:
        r = requests.get(ip_requests)
        if r.status_code == 200:
            response = r.json()
    except requests.exceptions as e:
        return None
        print(e)
    if response['status'] == 'fail':
        return None
    return response
    
def anlyzeLog(df, db, user):
    bad_ip = detectBadIp(df)
    bad_port = detectBadPorts(df)
    err = detectErrors(df)
    mul_con = detectMultipleCon(df)
    posBots = {}

    for ip, count in bad_ip.iteritems():
        if ip in posBots:
            posBots[ip]['reasons'].append({'reason':'BAD_IP', 'count':int(count)})
        else:
            posBots[ip] = {
                'ip': ip,
                'reasons': [{'reason':'BAD_IP', 'count':int(count)}]
            }
    for ip, count in bad_port.iteritems():
        if ip in posBots:
            posBots[ip]['reasons'].append({'reason':'BAD_PORT', 'count':int(count)})
        else:
            posBots[ip] = {
                'ip': ip,
                'reasons': [{'reason':'BAD_PORT', 'count':int(count)}]
            }
    for ip, count in err.iteritems():
        if ip in posBots:
            posBots[ip]['reasons'].append({'reason':'ERR', 'count':int(count)})
        else:
            posBots[ip] = {
                'ip': ip,
                'reasons': [{'reason':'ERR', 'count':int(count)}]
            }
    for ip, count in mul_con.iteritems():
        if ip in posBots:
            posBots[ip]['reasons'].append({'reason':'MUL_CON', 'count':int(count)})
        else:
            posBots[ip] = {
                'ip': ip,
                'reasons': [{'reason':'MUL_CON', 'count':int(count)}]
            }
    for ip in posBots:
        ip_info = getIpInfo(ip)
        if ip_info is None:
            posBots[ip]['infoIp'] = "NO_INFO"
        else:
            posBots[ip]['infoIp'] = {
            'organization': ip_info['org'], 
            'country':ip_info['country'],
            'city':ip_info['city'],
            'regionName':ip_info['regionName'],
            'lat':ip_info['lat'],
            'lon':ip_info['lon'],
            'timestamp': str(datetime.datetime.now())
            }
        #Push to firebase
        db.child("test_data").push(posBots[ip], user['idToken'])
    return posBots
