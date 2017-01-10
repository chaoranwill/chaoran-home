print(1/2*(3+4)*5)

def function():
    return 'something'
print(function())

def getweight(g):
    weight = g/1000
    return  weight
print(str(getweight(1000))+'kg')


def text_create(fname,fmes):
    fpath = 'E://python/projects/static/'
    fulpath = fpath + fname + '.txt'
    file = open(fulpath,'w')
    file.write(fmes)
    file.close()
    print('done')
# text_create('txt01','hello')
def text_filter(word,a='lame',b='awesome'):
    return word.replace(a,b)
# text = text_filter('python is lame!')
# print(text)

num = [1,2,3,'dad']
num.append('mom')
# print(num[0],num[-1],sep='\n')
# print('mom' in num)

def accout_login():
    password = input('password:')
    pwd = password == '111'
    if pwd:
        print('login success!')
    else:
        print('wrong!')
        accout_login()
# accout_login()

# password reset
pwdlist = ['reset','111']
def account_logins():
    pwd = input('password:')
    pwdlogin = pwd == pwdlist[-1]
    pwdreset = pwd == pwdlist[0]
    if pwdlogin:
        print('login success!')
    elif pwdreset:
        newpwd = input('please enter your new password:')
        pwdlist.append(newpwd)
        print('change successfully')
        account_logins()
    else:
        print('wrong!')
        account_logins()
# account_logins()

# for everyletter in 'hello world':
#     print(everyletter)

# for num in range(1,11):
#     print(str(num)+'+1=',num+1)

def creatfile (num):
    for number in num:
        filepath = 'E://python/projects/static/'
        filename = filepath + str(number) + '.txt'
        file = open(filename,'w')
        file.write(str(number))
# creatfile(range(1,3))
n = 123
f = 456.789
s1 = 'Hello,world'
s2 = 'hello,\'admin\''
s3 = r'hello,"bart"'
s4 = r'''hello,
liss!'''

# print('hello,%s' % 'world')
# print('hi,%s,you have $%d' % ('Micheal',10000))
# 小明的成绩从去年的72分提升到了今年的85分，请计算小明成绩提升的百分点，并用字符串格式化显示出'xx.x%'，只保留小数点后1位
cj = 72
ncj = 85
r = ncj % cj
# print('r=%.1d%%' % r)
classmate = ['Michael','bob','Tracy']
# print(classmate)
# print(len(classmate))
# 请用索引取出下面list的指定元素：
L = [
    ['apple','google','microsoft'],
    ['java','python','ruby','php'],
    ['admin','bart','lisa']
]
# print(L[0][0]+','+L[1][1]+','+L[2][2])
# 条件判断
height = float(input('your height:'))
weight = float(input('your weight:'))
check = weight/(height*height)
print(check)
if check < 18.5:
    print('体重过轻！')
elif check > 18.5 and check < 25:
    print('正常！')
else:
    print('该减肥了！！！')

# dictionary
d={'chaoran':95,'kangzi':98}
print(d['chaoran'])
