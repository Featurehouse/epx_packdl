#!/usr/bin/env python3
import json
import base64
import sys

def readasb64(s):
	with open(s, 'rb') as f:
		b = f.read()
		return base64.b64encode(b).decode('ascii')


def readfile(s):	# -> json
	with open(s, encoding='utf-8') as f:
		return json.load(f)
		
def replacefile(d, e):
	o = d[e]
	if isinstance(o, str):
		d[e] = {'base64': readasb64(o)}
	elif o.get('file'):	# assume o is a dict
		d[e] = {'base64': readasb64(o['file'])}


def main(meta, dump, prefix, suffix):
	m = readfile(meta)
	z = readfile(m['zipfile'])
	#w = {}
	y = {}
	q = m['with']	# arguments
	for k in z:
		if not k.endswith('/'):
			replacefile(z, k)
	
	for k in q:
		c = readfile(q[k])	# each replacement meta
		# v = z[k]
		if c.get('translations'):
			c = c['translations']
			for t in c:
				if t.get('raw'):
					replacefile(t, 'raw')
				if t.get('demo'):
					replacefile(t, 'demo')
			y[k] = c
	j = {'files': z, 'choices': y}
	with open(dump, 'w', encoding='utf-8') as f:
		if prefix:
			f.write(prefix)
		json.dump(j, f)
		if suffix:
			f.write(suffix)

if __name__ == '__main__':
	l = len(sys.argv)
	if l < 3:
		print('python3 gendist.py <meta_json> <dump_to> [prefix] [suffix]')
	else:
		arg0 = sys.argv[1]
		arg1 = sys.argv[2]
		arg2 = 'var sample_gd8b20nyv8vw='
		if l >= 4:
			arg2 = sys.argv[3]
		arg3 = ';'
		if l >= 5:
			arg3 = sys.argv[4]
		main(arg0, arg1, arg2, arg3)
			
