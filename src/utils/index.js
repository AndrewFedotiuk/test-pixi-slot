export function backout(amount) {
	return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}

export function lerp(a1, a2, t) {
	return a1 * (1 - t) + a2 * t;
}

export function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
	return {
		object,
		property,
		propertyBeginValue: object[property],
		target,
		easing,
		time,
		change: onchange,
		complete: oncomplete,
		start: Date.now(),
	};
}
