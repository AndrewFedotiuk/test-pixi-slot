export function backout(amount) {
	return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}

export function lerp(a1, a2, t) {
	return a1 * (1 - t) + a2 * t;
}
