url = 'http://ww1.site.cn/14d2e8ejw1exjogbxdxhj20ci0kuwex.jpg'
file_name = url[-10:]
print(file_name)

phone_number = '1557-322-5733'
hiding_number = phone_number.replace(phone_number[:9],'*'*9)
print(hiding_number)

search = '216'
num_a = '1682-222-3333'
num_b = '2222-216-8999'
print(search + 'is at ' + str(num_a.find(search)) + ' to ' + str(num_a.find(search) +  len(search)) +' of num_a')
print(search + ' is at '+ str(num_b.find(search)) + ' to ' +str(num_b.find(search)+len(search))+' of num_b')

# 批处理
print('{} a word she can get what she {} for.'.format('with','came'))
print('{a} a word she can get what she {b} for.'.format(a='with',b='came'))
print('{0} a word she can get what she {1} for.'.format('with','came'))



