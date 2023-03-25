var args = (function(s) {
	let e = {}
	if (s.length > 0) {
		s = s.substring(1).split('&');
		for (let B in s) {
			let b = s[B];
			let i = b.indexOf('=');
			if (i < 0) e[b] = '';
			else e[b.substring(0, i)] = b.substring(i + 1);
		}
	}
	return e;
})(window.location.search);
console.log(args);

function p_mdecode(i) {
	let a = Base64.toUint8Array(i);
	a = pako.inflate(a);
	let dec = new TextDecoder('utf-8');
	return JSON.parse(dec.decode(a));
}

function p_download(m, prefix) {
	if (!prefix) prefix = '';
	else if (!prefix.endsWith('-')) prefix += '-';
	let zip = new JSZip();
	for (let k in m.files) {
		if (k.endsWith('/')) zip.folder(k);
		else {
			var f_one = function(v, ce) {
				if (!v) return;
				if (v.choice && ce) {
					f_one((function(A) {
						if (!A) return;
						return A.raw;
					})((function(q,s,n) {
						if (!q[n] || !s[n]) return;
						if ((function(p) {
							for (let i in p) {
								let C = p.charAt(i);
								if (C < '0' || C > '9') return false;
							}
							return true;
						})(q[n])) return s[n][Number(q[n])];
						if (q[n] == 'random') return s[n][Math.floor(Math.random() * s[n].length)];
					})(args, m.choices, v.choice)), false);
				} else if (v.base64)
					zip.file(k, v.base64, {'base64': true});
				else if (v.raw)
					zip.file(k, v.raw);
				else zip.file(k, '');
			}
			f_one(m.files[k], true);
		}
	}
	zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:5}}).then(function(c) {
		saveAs(c, prefix + (function(length, chars) {
			var result = '';
			for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			return result;
		})(6, '0123456789abcdef'));
	});
}
