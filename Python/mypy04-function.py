# print(abs(-100))
# print(max(1,100))
#
# print(hex(10))
import math
def move(x,y,step,angle=0):
    nx = x + step * math.cos(angle)
    ny = y + step * math.sin(angle)
    return nx,ny
x,y = move(100,100,60,math.pi/6)
s = move(100,100,60,math.pi/6)
# print(x,y,s)
def quadratic(a,b,c):
    if not isinstance(a,(int,float)):
        raise TypeError('bad operate type!')
    if not isinstance(b,(int,float)):
        raise TypeError('bad operate type!')
    if not isinstance(c,(int,float)):
        raise TypeError('bad operate type!')
    data = b*b - 4*a*c
    if data < 0:
        raise TypeError('无解！')
    elif data == 0:
        x = (-b+data)/(2*a)
        return x
    else:
        x1 = (-b+data)/(2*a)
        x2 = (-b-data)/(2*a)
        return (x1,x2)

# print(quadratic(1,4,4))
def power(x,n=2):
    s = 1
    while n>0:
        n=n-1
        s=s*x
    return s
# print(power(4))
# 可变参数
def calc(number):
    sum = 0
    for n in number:
        sum = sum + n*n;
    return  sum
# print(calc([1,2,3]))
def calcs(*numbers):
    sums = 0
    for m in numbers:
        sums = sums + m*m
    return  sums
# print(calcs(1,2,3))
# 关键字参数
def person(name,age,**kw):
    print('name:',name,'  age:',age,'  kw:',kw)
person('chaoran',21,role='student',address='henan')
L=[]
for x in range(1,11):
    L.append(x*x)
# print(L)
# print([y*y for y in range(1,11)])
# print([y*y for y in range(1,11) if y%2==0])
# print([m+n for m in 'abc' for n in 'xyz'])
d={'x':'a','y':'b','z':'c'}
# for k,v in d.items():
#     print(k,'=',v)
# print([j+'='+v for j,v in d.items()])
e=['hello','']
# print([s.upper() for s in e])
generat=(s.upper() for s in d.keys())
# print(next(generat))
# for n in generat:
    # print(n)
# 杨辉三角
def triangles():
    L=[1]
    while True:
        yield L
        L.append(0)
        L=[L[i-1]+L[i] for i in range(len(L))]
n=int(input('Please enter a number:'))
m=0
for t in triangles():
    print(t)
    m=m+1
    if m==n:
        break