def normalize(name):
    return name.title()
L1 = ['adam','LISA']
L2 = list(map(normalize,L1))
print(L2)