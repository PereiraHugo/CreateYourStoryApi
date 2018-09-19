import json

category = ['Aventure','Animals','Love','Sci-Fi','Nature','Pirate','Emotions']
myWordsDict = {}

with open('resources/english-words.txt', 'r') as fileToRead :
    data = fileToRead.readlines()
    categoryFlag = -1
    categoryIndex = -1
    for line in data:
        words = line[:-1].split(',')
        for word in words :
            word = word.lstrip()
            if word[0]=="A" and categoryFlag==-1:
                categoryFlag = 0
                categoryIndex +=1
            elif word[0]=="Z" and categoryFlag==0:
                categoryFlag = -1
            if word in myWordsDict :
                myWordsDict[word].update({category[categoryIndex]: True})
            else :
                myWordsDict[word] = {category[categoryIndex]: True}

print(len(myWordsDict.keys()))

with open('resources/en-words.json', 'w') as fileToWrite :
    fileToWrite.write('[')
    for key in myWordsDict.keys() :
        itemDict = {"word":"", "category": {'Aventure': False,'Animals': False,'Love': False,'Sci-Fi': False,'Nature': False,'Pirate': False,'Emotions': False}}
        itemDict["word"]=key
        itemDict["category"].update(myWordsDict[key])
        json.dump(itemDict, fileToWrite, sort_keys=True, indent=4)
        fileToWrite.write(',\n')
    fileToWrite.write(']')