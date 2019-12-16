export function getValueForKey(props, key) {
	var searchStr = props.location.search
	searchStr = searchStr.substr(1)
	var paramSets = searchStr.split("&")
	var params = {}
	for (var i=0;i<paramSets.length;i++) {
		var a = paramSets[i].split("=")[0]
		var b = paramSets[i].split("=")[1]
		params[a] = b
	}
	return params[key]
}