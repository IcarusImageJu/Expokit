function decodeCMSEncoding(rawStr) {
	let str = rawStr;
	str = str.replace(/\\xE0/g, '\xE0');
	str = str.replace(/\\xE2/g, '\xE2');
	str = str.replace(/\\xE3/g, '\xE3');
	str = str.replace(/\\xE4/g, '\xE4');
	str = str.replace(/\\xE5/g, '\xE5');
	str = str.replace(/\\xE7/g, '\xE7');
	str = str.replace(/\\xE9/g, '\xE9');
	str = str.replace(/\\xE8/g, '\xE8');
	str = str.replace(/\\xEA/g, '\xEA');
	str = str.replace(/\\xEB/g, '\xEB');
	str = str.replace(/\\xEE/g, '\xEE');
	str = str.replace(/\\xEF/g, '\xEF');
	str = str.replace(/\\xF1/g, '\xF1');
	str = str.replace(/\\xF2/g, '\xF2');
	str = str.replace(/\\xF3/g, '\xF3');
	str = str.replace(/\\xF4/g, '\xF4');
	str = str.replace(/\\xF6/g, '\xF6');
	str = str.replace(/\\xF9/g, '\xF9');
	str = str.replace(/\\xFB/g, '\xFB');
	str = str.replace(/\\xC0/g, '\xC0');
	str = str.replace(/\\xC2/g, '\xC2');
	str = str.replace(/\\xC7/g, '\xC7');
	str = str.replace(/\\xC8/g, '\xC8');
	str = str.replace(/\\xC9/g, '\xC9');
	str = str.replace(/\\xCA/g, '\xCA');
	str = str.replace(/\\xCB/g, '\xCB');
	str = str.replace(/\\xCE/g, '\xCE');
	str = str.replace(/\\xCF/g, '\xCF');
	str = str.replace(/\\xD1/g, '\xD1');
	str = str.replace(/\\xD4/g, '\xD4');
	str = str.replace(/\\xD9/g, '\xD9');
	str = str.replace(/\\xDB/g, '\xDB');
	return str;
}

export default decodeCMSEncoding;
