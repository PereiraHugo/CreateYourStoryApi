import json

category = ['Aventure','Animals','Love','Sci-Fi','Nature','Pirate','Emotions']
myWordsDict = {}
itemDict = {"word":"", "category": {}}

with open('English-Words.txt', 'r') as fileToRead :
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
                myWordsDict[word].update({max(myWordsDict[word], key=int)+1 :category[categoryIndex]})
                print(max(myWordsDict[word], key=int))
            else :
                myWordsDict[word] = {0:category[categoryIndex]}

print(len(myWordsDict.keys()))

with open('Words.json', 'w') as fileToWrite :
    fileToWrite.write('[')
    for key in myWordsDict.keys() :
        itemDict["word"]=key
        itemDict["category"]=myWordsDict[key]
        json.dump(itemDict, fileToWrite, sort_keys=True, indent=4)
        fileToWrite.write(',\n')
    fileToWrite.write(']')